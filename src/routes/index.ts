import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";

const appRouter = createBrowserRouter([
  { path: "/", Component: Login },
]);

export default appRouter;