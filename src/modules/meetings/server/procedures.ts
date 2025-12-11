import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agents, meetings } from "@/db/schema";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { meetingsGetManySchema, meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";
import { streamClient } from "@/lib/stream-video";
import { generateAvatarUri } from "@/lib/avatar";

export const meetingsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const [meeting] = await db.select({
            ...getTableColumns(meetings),
            agent: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration")
        }).from(meetings)
            .innerJoin(agents, eq(meetings.agentId, agents.id))
            .where(and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)));

        if (!meeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "meeting not found" })
        }

        return meeting;
    }),
    getMany: protectedProcedure.input(meetingsGetManySchema).query(async ({ ctx, input }) => {
        const meetingsData = await db.select({
            ...getTableColumns(meetings),
            agent: agents,
            duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration")
        }).from(meetings)
            .innerJoin(agents, eq(meetings.agentId, agents.id))
            .where(and(
                eq(meetings.userId, ctx.auth.user.id),
                input.search ? ilike(meetings.name, `%${input.search}%`) : undefined,
                input.status ? eq(meetings.status, input.status) : undefined,
                input.agentId ? eq(meetings.agentId, input.agentId) : undefined,
            ))
            .limit(input.pageSize)
            .offset((input.page - 1) * input.pageSize)
            .orderBy(desc(meetings.createdAt), desc(meetings.id));

        const [result] = await db.select({ count: count() }).from(meetings)
            .innerJoin(agents, eq(meetings.agentId, agents.id))
            .where(and(
                eq(meetings.userId, ctx.auth.user.id),
                ilike(meetings.name, `%${input.search}%`)
            ));

        const totalPages = Math.ceil(result.count / input.pageSize);


        return { items: meetingsData, count: result.count, totalPages };
    }),
    create: protectedProcedure.input(meetingsInsertSchema).mutation(async ({ ctx, input }) => {
        const [meeting] = await db.insert(meetings).values({
            ...input,
            userId: ctx.auth.user.id
        }).returning();

        const call = streamClient.video.call("default", meeting.id);
        await call.create({
            data: {
                created_by_id: ctx.auth.user.id,
                custom: {
                    meetingId: meeting.id,
                    meetingName: meeting.name
                },
                settings_override: {
                    transcription: {
                        language: "en",
                        mode: "auto-on",
                        closed_caption_mode: "auto-on"
                    },
                    recording: {
                        mode: "auto-on",
                        quality: "1080p"
                    }
                }
            }
        })

        const [existingAgent] = await db.select().from(agents).where(eq(agents.id, meeting.agentId)).limit(1);

        if (!existingAgent) {
            throw new TRPCError({ code: "NOT_FOUND", message: "agent not found" })
        }

        await streamClient.upsertUsers([
            {
                id: existingAgent.id,
                name: existingAgent.name,
                image: generateAvatarUri({ seed: existingAgent.name, collection: "botttsNeutral" }),
                role: "user"
            }
        ])

        return meeting;
    }),
    update: protectedProcedure.input(meetingsUpdateSchema).mutation(async ({ ctx, input }) => {
        const [meeting] = await db.update(meetings)
            .set(input)
            .where(and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)))
            .returning();

        if (!meeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "meeting not found" })
        }

        return meeting;
    }),
    remove: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const [meeting] = await db.delete(meetings)
            .where(and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id)))
            .returning();

        if (!meeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "meeting not found" })
        }

        return meeting;
    }),
    generateToken: protectedProcedure.mutation(async ({ ctx }) => {
        await streamClient.upsertUsers([
            {
                id: ctx.auth.user.id,
                name: ctx.auth.user.name,
                image: ctx.auth.user.image ?? generateAvatarUri({ seed: ctx.auth.user.name, collection: "initials" })
            }
        ])

        const TIME_DRIFT_OFFSET_IN_SEC = 60;
        const EXPIRES_IN_SEC = 60 * 60;

        const issuedAt = Math.floor(Date.now() / 1000) - TIME_DRIFT_OFFSET_IN_SEC;
        const expiresAt = Math.floor(Date.now() / 1000) + EXPIRES_IN_SEC + TIME_DRIFT_OFFSET_IN_SEC;

        const token = streamClient.generateUserToken({
            user_id: ctx.auth.user.id,
            issued_at: issuedAt,
            expires_at: expiresAt,
        });

        return token;
    })
})