import { Navigate } from "react-router-dom";

function RequireAuth({ loggedIn, children, redirectTo }) {
  return loggedIn ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;