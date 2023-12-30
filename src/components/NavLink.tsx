import { Link, LinkProps, useLocation } from "react-router-dom";
import { cn } from "~/lib/utils";

interface NavLinkProps extends LinkProps {}

export function NavLink({
  className,
  ...props
}: NavLinkProps): JSX.Element | null {
  const { pathname } = useLocation();

  return (
    <Link
      {...props}
      data-active={pathname === props.to}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground",
        className,
      )}
    />
  );
}
