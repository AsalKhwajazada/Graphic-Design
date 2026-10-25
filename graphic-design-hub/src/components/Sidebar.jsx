import { Link, NavLink } from "react-router-dom";
import NavigationIcon from "./NavigationIcon";

const items = [
  { to: "/", icon: "dashboard", label: "Dashboard" },
  { to: "/classes", icon: "classes", label: "Design Classes" },
  { to: "/instructors", icon: "instructors", label: "Find Instructor" },
  { to: "/academies", icon: "academies", label: "Find Academy" },
  { to: "/chat", icon: "chat", label: "Student Chat" },
  { to: "/market", icon: "market", label: "Asset Marketplace" },
  { to: "/portfolio", icon: "portfolio", label: "Design Portfolio" },
  { to: "/assignments", icon: "assignments", label: "My Assignments" },
  { to: "/profile", icon: "profile", label: "My Profile" },
  { to: "/preferences", icon: "preferences", label: "Preferences" },
  { to: "/settings", icon: "settings", label: "Settings" },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className="logo-box" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="white"
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4M12,18c-2.21,0-4-1.79-4-4c0-1.31 0.63-2.47 1.61-3.2L12,13.6L14.39,10.8C15.37,11.53 16,12.69 16,14C16,16.21 14.21,18 12,18Z"
            />
          </svg>
        </div>
        <span>GraphicDesignHUB</span>
      </div>

      <nav className="sidebar-menu" id="primary-navigation" aria-label="Primary navigation">
        {items.map(({ to, icon, label }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/"}
            aria-label={label}
            title={label}
            className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          >
            <NavigationIcon name={icon} className="menu-icon" /> <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <section className="sidebar-app-promo" aria-label="GraphicDesignHUB mobile app">
        <Link className="app-promo-help" to="/chat" aria-label="Get help in Student Chat" title="Get help in Student Chat">
          <NavigationIcon name="help" size={22} />
        </Link>
        <div className="app-promo-copy">
          <h2>Download</h2>
          <p>GraphicDesignHUB Mobile App</p>
        </div>
        <div className="app-store-buttons">
          <button type="button" disabled aria-label="iOS app coming soon" title="iOS app coming soon">
            <NavigationIcon name="apple" size={18} />
          </button>
          <button type="button" disabled aria-label="Android app coming soon" title="Android app coming soon">
            <NavigationIcon name="android" size={18} />
          </button>
        </div>
      </section>

    </aside>
  );
}