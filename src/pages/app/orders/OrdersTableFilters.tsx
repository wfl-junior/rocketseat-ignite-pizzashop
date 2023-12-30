import { Search, X } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";

interface OrdersTableFiltersProps {}

export function OrdersTableFilters({}: OrdersTableFiltersProps): JSX.Element | null {
  return (
    <form
      onSubmit={event => event.preventDefault()}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID do pedido" className="h-8 w-auto" />
      <Input placeholder="Nome do cliente" className="h-8 w-80" />

      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Em entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button
        size="xs"
        type="submit"
        variant="secondary"
        className="flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        size="xs"
        type="button"
        variant="outline"
        className="flex items-center gap-2"
      >
        <X className="h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
