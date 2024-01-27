import { api } from "~/lib/axios";

interface GetManagedRestaurantResponse {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getManagedRestaurant({
  signal,
}: {
  signal: AbortSignal;
}) {
  const response = await api.get<GetManagedRestaurantResponse>(
    "/managed-restaurant",
    { signal },
  );

  return response.data;
}
