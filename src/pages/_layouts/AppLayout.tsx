import { Outlet } from "react-router-dom";

interface AppLayoutProps {}

export function AppLayout({}: AppLayoutProps): JSX.Element | null {
  return (
    <div>
      <h1>Cabeçalho</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
