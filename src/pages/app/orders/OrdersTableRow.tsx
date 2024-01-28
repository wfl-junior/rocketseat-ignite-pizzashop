import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { toast } from "sonner";
import { cancelOrder } from "~/api/cancel-order";
import { GetOrdersResponse } from "~/api/get-orders";
import { OrderStatus } from "~/components/OrderStatus";
import { Button } from "~/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/Dialog";
import { TableCell, TableRow } from "~/components/ui/Table";
import { QueryKeys } from "~/lib/react-query";
import { formatCurrency } from "~/utils/formatCurrency";
import { OrderDetails } from "./OrderDetails";

interface OrdersTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrdersTableRow({
  order,
}: OrdersTableRowProps): JSX.Element | null {
  const queryClient = useQueryClient();
  const { mutateAsync: cancelOrderFn, isPending: isCanceling } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_data, { orderId }) {
      const ordersList = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: [QueryKeys.Orders],
      });

      ordersList.forEach(([queryKey, data]) => {
        if (!data) return;

        queryClient.setQueryData<GetOrdersResponse>(queryKey, {
          ...data,
          orders: data.orders.map(order => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: "canceled",
              };
            }

            return order;
          }),
        });
      });

      toast.success(`Pedido ${orderId} cancelado com sucesso!`);
    },
    onError(_error, { orderId }) {
      toast.success(`Falha ao cancelar o pedido ${orderId}, Tente novamente.`);
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <OrderDetails orderId={order.orderId} />
          </DialogContent>
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {formatCurrency(order.total / 100)}
      </TableCell>

      <TableCell>
        <Button size="xs" variant="outline" className="flex items-center gap-2">
          <ArrowRight className="h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button
          size="xs"
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            isCanceling || !["pending", "processing"].includes(order.status)
          }
        >
          <X className="h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
