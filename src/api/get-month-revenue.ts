import { api } from "~/lib/axios";

export interface GetMonthRevenueParams {
  signal?: AbortSignal;
}

export interface GetMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue({ signal }: GetMonthRevenueParams = {}) {
  const response = await api.get<GetMonthRevenueResponse>(
    "/metrics/month-receipt",
    { signal },
  );

  return response.data;
}
