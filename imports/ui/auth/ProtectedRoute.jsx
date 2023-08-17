import { Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {AccountStatus, getAccountStatus} from '../utils/accountStatus'

import React from 'react';

const ProtectedRoute = ({ children, user, accStatus }) => {
 
  if (!user) {
    return <Navigate to="/login" />;
  }
  else if (accStatus === AccountStatus.PARTIAL) {
    return <Navigate to="/signup" />;
  }

  return children;
};

export default ProtectedRoute;
