import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import useAuth from "./context/useAuth";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FindInstructor from "./pages/FindInstructor";
import FindAcademy from "./pages/FindAcademy";
import ModulePage from "./pages/ModulePage";
import PortfolioPage from "./pages/PortfolioPage";

function ProtectedRoute() {
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/instructors" element={<FindInstructor />} />
          <Route path="/academies" element={<FindAcademy />} />
          <Route path="/classes" element={<ModulePage moduleKey="classes" />} />
          <Route path="/chat" element={<ModulePage moduleKey="chat" />} />
          <Route path="/market" element={<ModulePage moduleKey="market" />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/assignments" element={<ModulePage moduleKey="assignments" />} />
          <Route path="/profile" element={<ModulePage moduleKey="profile" />} />
          <Route path="/preferences" element={<ModulePage moduleKey="preferences" />} />
          <Route path="/settings" element={<ModulePage moduleKey="settings" />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}