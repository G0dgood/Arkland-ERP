import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isAllowed?: boolean;
  redirectPath?: string;
  children?: ReactElement;
}

const PrivateRoute = ({
  isAllowed,
  redirectPath = "/",
  children,
}: PrivateRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
