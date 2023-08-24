import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';


import { ThemeProvider } from '@mui/material/styles';


import TodoList from './pages/TodoList';
import WelcomePage from './pages/Welcome';
import TaskDetail from './pages/TaskView';
import AccountEdit from './pages/AccountView';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';

import Header from './components/Header.jsx';
import Footer from './components/Footer';

import ProtectedRoute from './routes/ProtectedRoute';

import theme from './styles/createTheme';
import { AccountStatus, getAccountStatus } from './utils/accountStatus';


const Home = () => {

  const user = useTracker(() => Meteor.user());
  const [accountStatus, setAccountStatus] = useState(AccountStatus.LOGGED_OUT);

  useEffect(() => {
    const fetchAccountStatus = async () => {
      if (user) {
        const status = await getAccountStatus(user);
        setAccountStatus(status);
      }
      else {
        setAccountStatus(AccountStatus.LOGGED_OUT);
      }
    };

    fetchAccountStatus();
  }, [user]);


  return (
    <ThemeProvider theme={theme}>


      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/login" element={<LoginPage user={user} />} />
          <Route path="/signup" element={<SignupPage user={user} accountStatus={accountStatus} />} />
          <Route
            path="*"
            element={
              <ProtectedRoute user={user} accStatus={accountStatus} >
                <Routes>
                  <Route path="/app" element={<TodoList />} />
                  <Route path="/" element={<WelcomePage />} />
                  <Route path="/app/:taskId" element={<TaskDetail />} />
                  <Route path="/account" element={<AccountEdit user={user} />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Home;
