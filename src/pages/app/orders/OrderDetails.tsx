import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Fragment } from "react";
import { getOrderDetails } from "~/api/get-order-details";
import { OrderStatus } from "~/components/OrderStatus";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";
import { QueryKeys } from "~/lib/react-query";
import { formatCurrency } from "~/utils/formatCurrency";
import { OrderDetailsSkeleton } from "./OrderDetailsSkeleton";

interface OrderDetailsProps {
  orderId: string;
}

export function OrderDetails({
  orderId,
}: OrderDetailsProps): JSX.Element | null {
  const { data: order } = useQuery({
    queryKey: [QueryKeys.Order, orderId],
    queryFn: ({ signal }) => getOrderDetails({ signal, orderId }),
  });

  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      {order ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>

                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>

                <TableCell className="flex justify-end">
                  {order.customer.name}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>

                <TableCell className="flex justify-end">
                  {order.customer.phone}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>

                <TableCell className="flex justify-end">
                  {order.customer.email}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>

                <TableCell className="flex justify-end">
                  {formatDistanceToNow(order.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.orderItems.map(orderItem => {
                const price = orderItem.priceInCents / 100;

                return (
                  <TableRow key={orderItem.id}>
                    <TableCell>{orderItem.product.name}</TableCell>

                    <TableCell className="text-right">
                      {orderItem.quantity}
                    </TableCell>

                    <TableCell className="text-right">
                      {formatCurrency(price)}
                    </TableCell>

                    <TableCell className="text-right">
                      {formatCurrency(price * orderItem.quantity)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>

                <TableCell className="whitespace-nowrap text-right font-medium">
                  {formatCurrency(
                    order.orderItems.reduce((total, orderItem) => {
                      return (
                        total +
                        (orderItem.priceInCents / 100) * orderItem.quantity
                      );
                    }, 0),
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </Fragment>
  );
}
