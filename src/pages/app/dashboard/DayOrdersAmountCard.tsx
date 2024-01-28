import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { Fragment } from "react";
import { getDayOrdersAmount } from "~/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { QueryKeys } from "~/lib/react-query";
import { MetricCardSkeleton } from "./MetricCardSkeleton";

interface DayOrdersAmountCardProps {}

export function DayOrdersAmountCard({}: DayOrdersAmountCardProps): JSX.Element | null {
  const { data } = useQuery({
    queryKey: [QueryKeys.Metrics, QueryKeys.DayOrdersAmount],
    queryFn: getDayOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {data ? (
          <Fragment>
            <span className="text-2xl font-bold tracking-tight">
              {data.amount.toLocaleString("pt-BR")}
            </span>

            <p className="text-xs text-muted-foreground">
              {data.diffFromYesterday === 0 ? (
                <span>{data.diffFromYesterday}%</span>
              ) : data.diffFromYesterday > 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{data.diffFromYesterday}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {data.diffFromYesterday}%
                </span>
              )}{" "}
              em relação a ontem
            </p>
          </Fragment>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
