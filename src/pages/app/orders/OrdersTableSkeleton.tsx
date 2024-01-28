import { Search } from "lucide-react";
import { Fragment } from "react";
import { Button } from "~/components/ui/Button";
import { Skeleton } from "~/components/ui/Skeleton";
import { TableCell, TableRow } from "~/components/ui/Table";

interface OrdersTableSkeletonProps {}

export function OrdersTableSkeleton({}: OrdersTableSkeletonProps): JSX.Element | null {
  return (
    <Fragment>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Button variant="outline" size="xs" disabled>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[172px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[148px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[110px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[64px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[92px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[92px]" />
          </TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
}
