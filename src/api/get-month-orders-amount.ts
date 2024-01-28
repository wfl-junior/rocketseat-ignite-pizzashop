import { api } from "~/lib/axios";

export interface GetMonthOrdersAmountParams {
  signal?: AbortSignal;
}

export interface GetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount({
  signal,
}: GetMonthOrdersAmountParams = {}) {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    "/metrics/month-orders-amount",
    { signal },
  );

  return response.data;
}
