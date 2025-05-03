import { createBrowserRouter } from "react-router-dom";

import { LayoutWithSidebar } from "./layout-with-sidebar";
import { ProtectedRoutes } from "./protected-routes";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";

import { PCUsage } from "@/pages/pc-usage";
const appRouter = createBrowserRouter([
  { path: "/", Component: Login },
  {
    Component: ProtectedRoutes,
    children: [
      {
        Component: LayoutWithSidebar,
        children: [
          { path: "/dashboard", Component: Dashboard },
          { path: "/pc-usage", Component: PCUsage },
        ],
      },
    ],
  },
]);

export default appRouter;
