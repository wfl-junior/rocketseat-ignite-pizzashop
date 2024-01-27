import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export enum QueryKeys {
  Orders = "orders",
  Profile = "profile",
  ManagedRestaurant = "managed-restaurant",
}
