import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { Fragment } from "react";
import { getMonthRevenue } from "~/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { QueryKeys } from "~/lib/react-query";
import { formatCurrency } from "~/utils/formatCurrency";
import { MetricCardSkeleton } from "./MetricCardSkeleton";

interface MonthRevenueCardProps {}

export function MonthRevenueCard({}: MonthRevenueCardProps): JSX.Element | null {
  const { data } = useQuery({
    queryKey: [QueryKeys.Metrics, QueryKeys.MonthRevenue],
    queryFn: getMonthRevenue,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>

        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {data ? (
          <Fragment>
            <span className="text-2xl font-bold tracking-tight">
              {formatCurrency(data.receipt / 100)}
            </span>

            <p className="text-xs text-muted-foreground">
              {data.diffFromLastMonth === 0 ? (
                <span>{data.diffFromLastMonth}%</span>
              ) : data.diffFromLastMonth > 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{data.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {data.diffFromLastMonth}%
                </span>
              )}{" "}
              relação ao mês passado
            </p>
          </Fragment>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
