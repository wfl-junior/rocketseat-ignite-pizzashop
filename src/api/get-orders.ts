import { api } from "~/lib/axios";

export interface GetOrdersParams {
  pageIndex?: number;
  signal: AbortSignal;
}

export interface GetOrdersResponse {
  orders: Array<{
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }>;
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({ signal, pageIndex = 0 }: GetOrdersParams) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    signal,
    params: {
      pageIndex,
    },
  });

  return response.data;
}
