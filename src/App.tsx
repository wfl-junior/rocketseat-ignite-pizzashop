import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./routes";

interface AppProps {}

export function App({}: AppProps): JSX.Element | null {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <Toaster richColors position="bottom-right" />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
