import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

interface AppProps {}

export function App({}: AppProps): JSX.Element | null {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}
