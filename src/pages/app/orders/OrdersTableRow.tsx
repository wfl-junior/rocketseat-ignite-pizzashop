import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderStatus } from "~/components/OrderStatus";
import { Button } from "~/components/ui/Button";
import { Dialog, DialogTrigger } from "~/components/ui/Dialog";
import { TableCell, TableRow } from "~/components/ui/Table";
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

          <OrderDetails />
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
        {formatCurrency(order.total)}
      </TableCell>

      <TableCell>
        <Button size="xs" variant="outline" className="flex items-center gap-2">
          <ArrowRight className="h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button size="xs" variant="ghost" className="flex items-center gap-2">
          <X className="h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
