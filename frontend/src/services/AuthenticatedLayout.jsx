import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthenticatedLayout = () => {
  return (
      <div>
        <Outlet /> {/* This will render the child routes */}
      </div>
  );
};

export default AuthenticatedLayout;