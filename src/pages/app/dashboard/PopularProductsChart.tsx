import { useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, PieLabel, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";
import { getPopularProducts } from "~/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { QueryKeys } from "~/lib/react-query";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

const renderCustomLabel: PieLabel<{
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  product: string;
}> = ({ cx, cy, midAngle, innerRadius, outerRadius, value, product }) => {
  const RADIAN = Math.PI / 180;
  const radius = 12 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      className="fill-muted-foreground text-xs"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {product.length > 12 ? product.substring(0, 12).concat("...") : product} (
      {value})
    </text>
  );
};

interface PopularProductsChartProps {}

export function PopularProductsChart({}: PopularProductsChartProps): JSX.Element | null {
  const { data } = useQuery({
    queryKey: [QueryKeys.Metrics, QueryKeys.PopularProducts],
    queryFn: getPopularProducts,
  });

  return (
    <Card className="md:col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>

          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        {data && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                cx="50%"
                cy="50%"
                data={data}
                strokeWidth={8}
                dataKey="amount"
                innerRadius={64}
                outerRadius={86}
                nameKey="product"
                labelLine={false}
                label={renderCustomLabel}
                fill={colors.emerald[500]}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background transition hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
