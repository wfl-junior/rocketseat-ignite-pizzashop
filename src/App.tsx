import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Sonner } from "./components/Sonner";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";

interface AppProps {}

export function App({}: AppProps): JSX.Element | null {
  return (
    <HelmetProvider>
      <ThemeContextProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <Sonner />

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeContextProvider>
    </HelmetProvider>
  );
}
