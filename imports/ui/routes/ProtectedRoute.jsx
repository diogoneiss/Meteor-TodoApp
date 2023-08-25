import { Outlet, Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {AccountStatus, getAccountStatus} from '../utils/accountStatus'

import React from 'react';

const ProtectedRoute = ({ user, accStatus }) => {
 
  if (!user) {
    console.log("redirecionando para login..")
    return <Navigate to="/login" />;
  }
  else if (accStatus === AccountStatus.PARTIAL) {
    console.log("Account is parcial, redirecting")
    return <Navigate to="/signup" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
