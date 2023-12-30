import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { AccountMenu } from "./AccountMenu";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { Separator } from "./ui/Separator";

interface HeaderProps {}

export function Header({}: HeaderProps): JSX.Element | null {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center gap-4 lg:gap-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>

          <NavLink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
