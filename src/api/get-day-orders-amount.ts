import { api } from "~/lib/axios";

export interface GetDayOrdersAmountParams {
  signal?: AbortSignal;
}

export interface GetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrdersAmount({
  signal,
}: GetDayOrdersAmountParams = {}) {
  const response = await api.get<GetDayOrdersAmountResponse>(
    "/metrics/day-orders-amount",
    { signal },
  );

  return response.data;
}
