import React from 'react';
import { useState, useEffect } from 'react';
import App from './pages/App';
import WelcomePage from './pages/Welcome';
import ProtectedRoute from './auth/ProtectedRoute';
import Header from './components/Header.jsx';
import { SignupForm } from './pages/SignUpPage';
import { LoginForm } from './pages/LoginPage';
import { Meteor } from 'meteor/meteor';
import TaskDetail from './pages/TaskDetail';
import { useTracker } from 'meteor/react-meteor-data';
import {AccountStatus, getAccountStatus} from './utils/accountStatus'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



const Home = () => {

  const user = useTracker(() => Meteor.user());
  const [accountStatus, setAccountStatus] = useState(AccountStatus.LOGGED_OUT);

  useEffect(() => {
    const fetchAccountStatus = async () => {
        if (user) {
            const status = await getAccountStatus(user);
            setAccountStatus(status);
        }
    };

    fetchAccountStatus();
}, [user]);



  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/login" element={<LoginForm user={user}  />} />
        <Route path="/signup" element={<SignupForm user={user} accountStatus={accountStatus}  />} />
        <Route
          path="*"
          element={
            <ProtectedRoute user={user} accStatus={accountStatus} >
              <Routes>
                <Route path="/app" element={<App />} />
                <Route path="/" element={<WelcomePage  />} />  
                <Route path="/app/:taskId" element={<TaskDetail/>} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default Home;
