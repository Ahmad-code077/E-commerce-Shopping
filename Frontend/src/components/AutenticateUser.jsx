import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthenticateUser = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === 'admin';

  if (!isAdmin) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default AuthenticateUser;
