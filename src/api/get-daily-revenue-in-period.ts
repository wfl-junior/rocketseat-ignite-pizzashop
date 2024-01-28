import { api } from "~/lib/axios";

export interface GetDailyRevenueInPeriodParams {
  signal?: AbortSignal;
  from?: Date;
  to?: Date;
}

export type GetDailyRevenueInPeriodResponse = Array<{
  date: string;
  receipt: number;
}>;

export async function getDailyRevenueInPeriod({
  signal,
  from,
  to,
}: GetDailyRevenueInPeriodParams = {}) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      signal,
      params: {
        from,
        to,
      },
    },
  );

  return response.data;
}
