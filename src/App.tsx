import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";

interface AppProps {}

export function App({}: AppProps): JSX.Element | null {
  return (
    <HelmetProvider>
      <ThemeContextProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors position="bottom-right" />

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeContextProvider>
    </HelmetProvider>
  );
}
