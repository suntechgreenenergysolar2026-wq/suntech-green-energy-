import { Navigate, Outlet, useLocation } from "react-router-dom";
import { loadAdminSession } from "@/lib/admin-auth";

const RequireAdmin = () => {
  const location = useLocation();
  const session = loadAdminSession();

  if (!session?.token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default RequireAdmin;
