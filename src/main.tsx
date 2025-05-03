import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { AppProvider } from "./providers/app-provider.tsx";
import appRouter from "./routes/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={appRouter} />
    </AppProvider>
  </StrictMode>,
);
