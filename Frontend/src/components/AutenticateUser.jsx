// AuthenticateUser.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticateUser = ({ children, user }) => {
  // const isAdmin = user?.role === 'admin';

  // if (!isAdmin) {
  //   return <Navigate to='/' replace />; // Redirect to home if not an admin
  // }

  // return children; // Render children if admin
  return <h1>hello</h1>;
};

export default AuthenticateUser;
