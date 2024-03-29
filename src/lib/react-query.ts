import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export enum QueryKeys {
  Order = "order",
  Orders = "orders",
  Profile = "profile",
  Metrics = "metrics",
  MonthRevenue = "month-revenue",
  PopularProducts = "popular-products",
  DayOrdersAmount = "day-orders-amount",
  ManagedRestaurant = "managed-restaurant",
  MonthOrdersAmount = "month-orders-amount",
  DailyRevenueInPeriod = "daily-revenue-in-period",
  MonthCanceledOrdersAmount = "month-canceled-orders-amount",
}
