import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import appRoutes from "./routes/appRoutes.tsx";
import { AppProvider } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <RouterProvider router={appRoutes}></RouterProvider>
  </AppProvider>
);
