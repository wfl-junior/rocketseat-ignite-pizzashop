import { Outlet } from "react-router-dom";

interface AuthLayoutProps {}

export function AuthLayout({}: AuthLayoutProps): JSX.Element | null {
  return (
    <div>
      <h1>Autenticação</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
