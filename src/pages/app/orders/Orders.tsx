import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { getOrders } from "~/api/get-orders";
import { Pagination } from "~/components/Pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/Table";
import { QueryKeys } from "~/lib/react-query";
import { OrdersTableFilters } from "./OrdersTableFilters";
import { OrdersTableRow } from "./OrdersTableRow";

interface OrdersProps {}

export function Orders({}: OrdersProps): JSX.Element | null {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = z.coerce
    .number()
    .catch(1)
    .transform(page => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data } = useQuery({
    queryKey: [QueryKeys.Orders, pageIndex],
    queryFn: ({ signal }) => getOrders({ signal, pageIndex }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams(currentSearchParams => {
      currentSearchParams.set("page", String(pageIndex + 1));
      return currentSearchParams;
    });
  }

  return (
    <Fragment>
      <Helmet title="Pedidos" />

      <div className="flex flex-1 flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="flex flex-1 flex-col gap-2.5">
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
                {data?.orders.map(order => (
                  <OrdersTableRow key={order.orderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </div>

          {data && (
            <div className="mt-auto">
              <Pagination
                perPage={data.meta.perPage}
                onPageChange={handlePaginate}
                pageIndex={data.meta.pageIndex}
                totalCount={data.meta.totalCount}
              />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
