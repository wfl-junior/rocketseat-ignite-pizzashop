import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { formatCurrency } from "~/utils/formatCurrency";

const data = [
  {
    date: "10/12",
    revenue: 1200,
  },
  {
    date: "11/12",
    revenue: 800,
  },
  {
    date: "12/12",
    revenue: 900,
  },
  {
    date: "13/12",
    revenue: 400,
  },
  {
    date: "14/12",
    revenue: 2300,
  },
  {
    date: "15/12",
    revenue: 800,
  },
  {
    date: "16/12",
    revenue: 640,
  },
];

const lineChartStyle = {
  overflow: "visible",
  fontSize: 12,
};

interface RevenueChartProps {}

export function RevenueChart({}: RevenueChartProps): JSX.Element | null {
  return (
    <Card className="md:col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>

          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} {...lineChartStyle}>
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
      </CardContent>
    </Card>
  );
}
