import { RECENT_MEETINGS_LIMIT } from "@/modules/dashboard/constants";
import DashboardView, { DashboardViewErrorState, DashboardViewLoadingState } from "@/modules/dashboard/ui/views/dashboard-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { INITIAL_PAGE } from "../constants";

export default async function Home() {

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.premium.getProducts.queryOptions());
  await queryClient.prefetchQuery(trpc.premium.getCurrentSubscription.queryOptions());
  await queryClient.prefetchQuery(trpc.agents.getAgentsCount.queryOptions());
  await queryClient.prefetchQuery(trpc.meetings.getMeetingsCount.queryOptions());
  await queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
    pageSize: RECENT_MEETINGS_LIMIT,
    page: INITIAL_PAGE,
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<DashboardViewLoadingState />}>
        <ErrorBoundary FallbackComponent={DashboardViewErrorState}>
          <DashboardView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
