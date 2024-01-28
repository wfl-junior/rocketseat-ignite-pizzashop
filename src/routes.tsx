import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404";
import { ErrorPage } from "./pages/Error";
import { AppLayout } from "./pages/_layouts/AppLayout";
import { AuthLayout } from "./pages/_layouts/AuthLayout";
import { Dashboard } from "./pages/app/dashboard/Dashboard";
import { Orders } from "./pages/app/orders/Orders";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
