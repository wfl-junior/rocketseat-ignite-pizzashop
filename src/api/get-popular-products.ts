import { api } from "~/lib/axios";

export interface GetPopularProductsParams {
  signal?: AbortSignal;
}

export type GetPopularProductsResponse = Array<{
  product: string;
  amount: number;
}>;

export async function getPopularProducts({
  signal,
}: GetPopularProductsParams = {}) {
  const response = await api.get<GetPopularProductsResponse>(
    "/metrics/popular-products",
    { signal },
  );

  return response.data;
}
