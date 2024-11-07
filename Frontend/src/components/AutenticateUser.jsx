import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthenticateUser = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === 'admin';

  if (!isAdmin) {
    return <Navigate to='/' replace />; // Redirect to home if not an admin
  }

  return children; // Render children if admin
};

export default AuthenticateUser;
