import { createBrowserRouter } from "react-router";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import Transactions from "../pages/Transactions";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
]);

export default appRoutes;
