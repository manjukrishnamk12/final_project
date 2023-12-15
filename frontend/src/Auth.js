import { Navigate, useLocation } from "react-router-dom";

export const Requireauth = ({ children }) => {
  const gettoken = sessionStorage.getItem('userToken');
  const location = useLocation();
  if (!gettoken) {
    return <Navigate to='/' state={{ from: location }} />
  }
  return children;
}