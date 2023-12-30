import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { TableCell, TableRow } from "~/components/ui/Table";

interface OrdersTableRowProps {}

export function OrdersTableRow({}: OrdersTableRowProps): JSX.Element | null {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        asuhaisgq1782y1
      </TableCell>

      <TableCell className="text-muted-foreground">há 15 minutos</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="aspect-square w-2 rounded-full bg-slate-400"
          />

          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>

      <TableCell className="font-medium">Wallace Júnior</TableCell>
      <TableCell className="font-medium">R$ 149,90</TableCell>

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
