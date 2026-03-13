import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/MerchantAuthContext";

function MerchantProtectedRoute({ children }) {

  const { merchant, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!merchant) {
    return <Navigate to="/merchant/login" />;
  }

  return children;
}

export default MerchantProtectedRoute;