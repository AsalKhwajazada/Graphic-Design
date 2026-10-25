import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onToggle }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <button className="toggle-btn" onClick={onToggle}>
          <i className="fa-solid fa-bars" />
        </button>
        <div className="breadcrumbs">
          <i className="fa-solid fa-house" />
        </div>
      </div>
      <div className="nav-right">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="Type here..." />
        </div>
        <button className="logout-link" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket" /> Log out
        </button>
        <i className="fa-solid fa-gear" />
        <i className="fa-solid fa-bell" />
      </div>
    </header>
  );
}