/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [, role, isLoading] = useRole(); //loading is for role, not the same as loading in useAuth which is for user

  if (isLoading) return <Loader />;
  if (role === "admin") return children;

  return <Navigate to="/dashboard" />;
};

export default AdminRoute;
