import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(() => window.matchMedia("(max-width: 768px)").matches);
  const toggleCategories = () => setCollapsed((current) => !current);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const handleBreakpointChange = (event) => setCollapsed(event.matches);
    mobileQuery.addEventListener("change", handleBreakpointChange);

    return () => mobileQuery.removeEventListener("change", handleBreakpointChange);
  }, []);

  return (
    <div className="page active">
      <Sidebar collapsed={collapsed} onToggle={toggleCategories} />
      <div className="main-wrapper">
        <Navbar
          sidebarCollapsed={collapsed}
          onToggle={toggleCategories}
        />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}