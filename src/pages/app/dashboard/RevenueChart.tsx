import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";
import { getDailyRevenueInPeriod } from "~/api/get-daily-revenue-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { DateRangePicker } from "~/components/ui/DateRangePicker";
import { Label } from "~/components/ui/Label";
import { QueryKeys } from "~/lib/react-query";
import { formatCurrency } from "~/utils/formatCurrency";

const lineChartStyle = {
  overflow: "visible",
  fontSize: 12,
};

interface RevenueChartProps {}

export function RevenueChart({}: RevenueChartProps): JSX.Element | null {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data } = useQuery({
    queryKey: [QueryKeys.Metrics, QueryKeys.DailyRevenueInPeriod, dateRange],
    queryFn: ({ signal }) => {
      return getDailyRevenueInPeriod({
        signal,
        from: dateRange?.from,
        to: dateRange?.to,
      });
    },
  });

  const chartData = useMemo(() => {
    return data?.map(item => ({
      date: item.date,
      revenue: item.receipt / 100,
    }));
  }, [data]);

  return (
    <Card className="md:col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>

          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>

          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>
      </CardHeader>

      <CardContent>
        {chartData && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} {...lineChartStyle}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCurrency}
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="revenue"
                stroke={colors.violet[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
