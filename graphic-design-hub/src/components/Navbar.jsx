import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import NavigationIcon from "./NavigationIcon";

export default function Navbar({ onToggle, sidebarCollapsed }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const categoriesVisible = !sidebarCollapsed;

  const routeLabels = {
    "/": "Dashboard",
    "/classes": "Design Classes",
    "/instructors": "Find Instructor",
    "/academies": "Find Academy",
    "/chat": "Student Chat",
    "/market": "Asset Marketplace",
    "/portfolio": "Design Portfolio",
    "/assignments": "My Assignments",
    "/profile": "My Profile",
    "/preferences": "Preferences",
    "/settings": "Settings",
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;

    const normalizedQuery = query.toLowerCase();
    const target = normalizedQuery.match(/instructor|mentor/)
      ? "/instructors"
      : normalizedQuery.match(/academy|academies/)
        ? "/academies"
        : normalizedQuery.match(/chat|message|community/)
          ? "/chat"
          : normalizedQuery.match(/market|asset|software/)
            ? "/market"
            : normalizedQuery.match(/portfolio|project/)
              ? "/portfolio"
              : normalizedQuery.match(/assignment|homework/)
                ? "/assignments"
                : normalizedQuery.match(/profile/)
                  ? "/profile"
                  : normalizedQuery.match(/preference/)
                    ? "/preferences"
                    : normalizedQuery.match(/setting/)
                      ? "/settings"
                    : location.pathname === "/" ? "/classes" : location.pathname;

    navigate(`${target}?search=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <button
          className="toggle-btn"
          type="button"
          onClick={onToggle}
          aria-label={categoriesVisible ? "Hide categories" : "Show categories"}
          aria-controls="primary-navigation"
          aria-expanded={categoriesVisible}
          title={categoriesVisible ? "Hide categories" : "Show categories"}
        >
          <NavigationIcon name="menu" />
        </button>
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" aria-label="Dashboard"><NavigationIcon name="home" size={16} /></Link>
          <span aria-hidden="true">/</span>
          <span>{routeLabels[location.pathname] || "GraphicDesignHUB"}</span>
        </div>
      </div>
      <div className="nav-right">
        <form className="search-box" onSubmit={handleSearch} role="search">
          <label className="sr-only" htmlFor="global-search">Search GraphicDesignHUB</label>
          <NavigationIcon name="search" aria-hidden="true" />
          <input id="global-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the hub..." />
          <button className="global-search-submit" type="submit" aria-label="Submit search" title="Search">
            <NavigationIcon name="arrowRight" />
          </button>
        </form>
        <button className="logout-link" onClick={handleLogout} type="button">
          <NavigationIcon name="logout" /> Log out
        </button>
        <button className="navbar-icon-btn" type="button" aria-label="Settings" title="Settings" onClick={() => navigate("/settings")}>
          <NavigationIcon name="settings" />
        </button>
        <div className="notification-control">
          <button className="navbar-icon-btn" type="button" aria-label="Notifications" title="Notifications" aria-expanded={showNotifications} onClick={() => setShowNotifications((visible) => !visible)}>
            <NavigationIcon name="notifications" />
          </button>
          {showNotifications && (
            <div className="notification-popover" role="status">
              <strong>You’re all caught up</strong>
              <span>New class and community updates will appear here.</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}