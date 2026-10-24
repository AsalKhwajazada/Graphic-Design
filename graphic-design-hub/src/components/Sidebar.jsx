import { NavLink } from "react-router-dom";

const items = [
  { to: "/", icon: "chart-pie", label: "Dashboard" },
  { to: "/classes", icon: "palette", label: "Design Classes" },
  { to: "/instructors", icon: "user-tie", label: "Find Instructor" },
  { to: "/academies", icon: "graduation-cap", label: "Find Academy" },
  { to: "/chat", icon: "comments", label: "Student Chat" },
  { to: "/market", icon: "store", label: "Asset Marketplace" },
  { to: "/portfolio", icon: "images", label: "Design Portfolio" },
  { to: "/assignments", icon: "folder-open", label: "My Assignments" },
  { to: "/profile", icon: "id-card", label: "My Profile" },
  { to: "/preferences", icon: "sliders", label: "Preferences" },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className="logo-box">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="white"
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4M12,18c-2.21,0-4-1.79-4-4c0-1.31 0.63-2.47 1.61-3.2L12,13.6L14.39,10.8C15.37,11.53 16,12.69 16,14C16,16.21 14.21,18 12,18Z"
            />
          </svg>
        </div>
        <span>GraphicDesignHUB</span>
      </div>

      <nav className="sidebar-menu">
        {items.map(({ to, icon, label }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/"}
            className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          >
            <i className={`fa-solid fa-${icon}`} /> <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-help-box">
        <button className="help-large-btn">?</button>
      </div>
    </aside>
  );
}