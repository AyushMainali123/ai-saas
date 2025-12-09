import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type TRouterOutputs = inferRouterOutputs<AppRouter>;
export type TMeetingGetOne = TRouterOutputs['meetings']['getOne'];