import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { DayOrdersAmountCard } from "./DayOrdersAmountCard";
import { MonthCanceledOrdersAmountCard } from "./MonthCanceledOrdersAmountCard";
import { MonthOrdersAmountCard } from "./MonthOrdersAmountCard";
import { MonthRevenueCard } from "./MonthRevenueCard";
import { PopularProductsChart } from "./PopularProductsChart";
import { RevenueChart } from "./RevenueChart";

interface DashboardProps {}

export function Dashboard({}: DashboardProps): JSX.Element | null {
  return (
    <Fragment>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-9">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </Fragment>
  );
}
