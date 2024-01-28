import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { toast } from "sonner";
import { approveOrder } from "~/api/approve-order";
import { cancelOrder } from "~/api/cancel-order";
import { deliverOrder } from "~/api/deliver-order";
import { dispatchOrder } from "~/api/dispatch-order";
import { GetOrdersResponse } from "~/api/get-orders";
import { OrderStatus, OrderStatusType } from "~/components/OrderStatus";
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
    status: OrderStatusType;
    customerName: string;
    total: number;
  };
}

export function OrdersTableRow({
  order,
}: OrdersTableRowProps): JSX.Element | null {
  const queryClient = useQueryClient();

  function updateOrderStatusCache(orderId: string, status: OrderStatusType) {
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
              status,
            };
          }

          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCanceling } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_data, { orderId }) {
      updateOrderStatusCache(orderId, "canceled");
      toast.success(`Pedido ${orderId} cancelado com sucesso!`);
    },
    onError(_error, { orderId }) {
      toast.success(`Falha ao cancelar pedido ${orderId}, Tente novamente.`);
    },
  });

  const { mutateAsync: approveOrderFn, isPending: isApproving } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_data, { orderId }) {
      updateOrderStatusCache(orderId, "processing");
      toast.success(`Pedido ${orderId} aprovado com sucesso!`);
    },
    onError(_error, { orderId }) {
      toast.success(`Falha ao aprovar pedido ${orderId}, Tente novamente.`);
    },
  });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatching } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusCache(orderId, "delivering");
        toast.success(`Pedido ${orderId} despachado com sucesso!`);
      },
      onError(_error, { orderId }) {
        toast.success(`Falha ao despachar pedido ${orderId}, Tente novamente.`);
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDelivering } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_data, { orderId }) {
      updateOrderStatusCache(orderId, "delivered");
      toast.success(`Pedido ${orderId} marcado como entregue com sucesso!`);
    },
    onError(_error, { orderId }) {
      toast.success(
        `Falha ao marcar pedido ${orderId} como entregue, Tente novamente.`,
      );
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
        {order.status === "pending" && (
          <Button
            size="xs"
            variant="outline"
            disabled={isApproving}
            className="flex items-center gap-2"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            size="xs"
            variant="outline"
            disabled={isDispatching}
            className="flex items-center gap-2"
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="h-3 w-3" />
            Despachar
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            size="xs"
            variant="outline"
            disabled={isDelivering}
            className="flex items-center gap-2"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="h-3 w-3" />
            Entregue
          </Button>
        )}
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
