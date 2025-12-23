import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { initStorage } from "./utils/initStorage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen max-h-screen lg:overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />

      <Sidebar />

      <main className="flex-1 bg-gray-100 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
