import { api } from "~/lib/axios";

export interface GetMonthCanceledOrdersAmountParams {
  signal?: AbortSignal;
}

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount({
  signal,
}: GetMonthCanceledOrdersAmountParams = {}) {
  const response = await api.get<GetMonthCanceledOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount",
    { signal },
  );

  return response.data;
}
