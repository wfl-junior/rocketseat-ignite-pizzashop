import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";

const ordersFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrdersFiltersFormInput = z.input<typeof ordersFiltersSchema>;

interface OrdersTableFiltersProps {}

export function OrdersTableFilters({}: OrdersTableFiltersProps): JSX.Element | null {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, control, handleSubmit, reset } =
    useForm<OrdersFiltersFormInput>({
      resolver: zodResolver(ordersFiltersSchema),
      defaultValues: {
        orderId: searchParams.get("orderId") ?? "",
        customerName: searchParams.get("customerName") ?? "",
        status: searchParams.get("status") ?? "all",
      },
    });

  const handleFilter = handleSubmit(values => {
    setSearchParams(currentSearchParams => {
      currentSearchParams.set("page", "1");

      if (values.orderId) {
        currentSearchParams.set("orderId", values.orderId);
      } else {
        currentSearchParams.delete("orderId");
      }

      if (values.customerName) {
        currentSearchParams.set("customerName", values.customerName);
      } else {
        currentSearchParams.delete("customerName");
      }

      if (values.status) {
        currentSearchParams.set("status", values.status);
      } else {
        currentSearchParams.delete("status");
      }

      return currentSearchParams;
    });
  });

  function handleClearFilters() {
    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });

    setSearchParams(currentSearchParams => {
      currentSearchParams.delete("page");
      currentSearchParams.delete("orderId");
      currentSearchParams.delete("customerName");
      currentSearchParams.delete("status");
      return currentSearchParams;
    });
  }

  return (
    <form onSubmit={handleFilter} className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register("orderId")}
      />

      <Input
        placeholder="Nome do cliente"
        className="h-8 w-80"
        {...register("customerName")}
      />

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Select
            value={field.value}
            disabled={field.disabled}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button
        size="xs"
        type="submit"
        variant="secondary"
        className="flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        size="xs"
        type="button"
        variant="outline"
        onClick={handleClearFilters}
        className="flex items-center gap-2"
      >
        <X className="h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
