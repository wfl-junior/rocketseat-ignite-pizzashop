import { cn } from "~/lib/utils";

type OrderStatusType =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatusType;
}

const orderStatusMap: Record<OrderStatusType, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};

export function OrderStatus({ status }: OrderStatusProps): JSX.Element | null {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden
        className={cn(
          "aspect-square w-2 rounded-full",
          status === "pending" && "bg-slate-400",
          status === "canceled" && "bg-rose-500",
          status === "delivered" && "bg-emerald-500",
          (status === "processing" || status === "delivering") &&
            "bg-amber-500",
        )}
      />

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
