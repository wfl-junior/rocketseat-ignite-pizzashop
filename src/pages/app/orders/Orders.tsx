import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";
import { OrdersTableFilters } from "./OrdersTableFilters";
import { OrdersTableRow } from "./OrdersTableRow";

interface OrdersProps {}

export function Orders({}: OrdersProps): JSX.Element | null {
  return (
    <Fragment>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>

      <div className="space-y-2.5">
        <OrdersTableFilters />

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
                <OrdersTableRow key={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
}
