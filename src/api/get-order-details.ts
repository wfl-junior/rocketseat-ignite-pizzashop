import { api } from "~/lib/axios";

export interface GetOrderDetailsParams {
  signal?: AbortSignal;
  orderId: string;
}

export interface GetOrderDetailsResponse {
  id: string;
  createdAt: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: Array<{
    id: string;
    priceInCents: number;
    quantity: number;
  }>;
}

export async function getOrderDetails({
  signal,
  orderId,
}: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(
    `/orders/${orderId}`,
    { signal },
  );

  return response.data;
}
