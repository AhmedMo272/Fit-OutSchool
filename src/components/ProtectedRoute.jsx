import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("admin") === "true";

  if (!isAuth) return <Navigate to="/login" />;

  return children;
}
