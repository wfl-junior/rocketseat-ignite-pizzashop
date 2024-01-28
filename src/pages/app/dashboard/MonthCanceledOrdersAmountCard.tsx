import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { Fragment } from "react";
import { getMonthCanceledOrdersAmount } from "~/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { QueryKeys } from "~/lib/react-query";
import { MetricCardSkeleton } from "./MetricCardSkeleton";

interface MonthCanceledOrdersAmountCardProps {}

export function MonthCanceledOrdersAmountCard({}: MonthCanceledOrdersAmountCardProps): JSX.Element | null {
  const { data } = useQuery({
    queryKey: [QueryKeys.Metrics, QueryKeys.MonthCanceledOrdersAmount],
    queryFn: getMonthCanceledOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>

        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {data ? (
          <Fragment>
            <span className="text-2xl font-bold tracking-tight">
              {data.amount.toLocaleString("pt-BR")}
            </span>

            <p className="text-xs text-muted-foreground">
              {data.diffFromLastMonth === 0 ? (
                <span>{data.diffFromLastMonth}%</span>
              ) : data.diffFromLastMonth < 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  {data.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  +{data.diffFromLastMonth}%
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
