import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}
