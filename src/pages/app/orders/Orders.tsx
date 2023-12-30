import { ArrowRight, Search, X } from "lucide-react";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";

interface OrdersProps {}

export function Orders({}: OrdersProps): JSX.Element | null {
  return (
    <Fragment>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>

      <div className="space-y-2.5">
        <form
          onSubmit={event => event.preventDefault()}
          className="flex items-center gap-2"
        >
          <span className="text-sm font-semibold">Filtros:</span>
          <Input placeholder="Nome do cliente" className="h-8 w-80" />
        </form>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Button variant="outline" size="xs">
                      <Search className="h-3 w-3" />
                      <span className="sr-only">Detalhes do pedido</span>
                    </Button>
                  </TableCell>

                  <TableCell className="font-mono text-xs font-medium">
                    asuhaisgq1782y1
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    há 15 minutos
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="aspect-square w-2 rounded-full bg-slate-400"
                      />

                      <span className="font-medium text-muted-foreground">
                        Pendente
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">Wallace Júnior</TableCell>
                  <TableCell className="font-medium">R$ 149,90</TableCell>

                  <TableCell>
                    <Button
                      size="xs"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ArrowRight className="h-3 w-3" />
                      Aprovar
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <X className="h-3 w-3" />
                      Cancelar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
}
