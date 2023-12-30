import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/AppLayout";
import { AuthLayout } from "./pages/_layouts/AuthLayout";
import { Dashboard } from "./pages/app/Dashboard";
import { SignIn } from "./pages/auth/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
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
    ],
  },
]);
