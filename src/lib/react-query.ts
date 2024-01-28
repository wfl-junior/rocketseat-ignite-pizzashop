import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export enum QueryKeys {
  Order = "order",
  Orders = "orders",
  Profile = "profile",
  ManagedRestaurant = "managed-restaurant",
}
