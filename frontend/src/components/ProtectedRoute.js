import React from 'react';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ component: Component, ...props }) {
  return (
    props.isLogged ? < Component {...props} /> : < Navigate to='/sign-in' />
  );
};

export default ProtectedRoute;

