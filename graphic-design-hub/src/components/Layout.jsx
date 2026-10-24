import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="page active">
      <Sidebar collapsed={collapsed} />
      <div className="main-wrapper">
        <Navbar onToggle={() => setCollapsed((c) => !c)} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}