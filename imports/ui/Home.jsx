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
import CenteredLoading from './components/loading/CenteredLoading';

import ProtectedRoute from './routes/ProtectedRoute';

import theme from './styles/createTheme';
import { AccountStatus, getAccountStatus } from './utils/accountStatus';


const Home = () => {

  //preciso desse hook para aguardar o retorno do meteor.user(), que inicialmente é null
  const loggingIn = useTracker(() => Meteor.loggingIn());
  const user = useTracker(() => Meteor.user());
  const [accountStatus, setAccountStatus] = useState(AccountStatus.LOGGED_OUT);

  useEffect(() => {
    if (!loggingIn) { 
      const fetchAccountStatus = async () => {
        if (user) {
          const status = await getAccountStatus(user);
          setAccountStatus(status);
        } else {
          setAccountStatus(AccountStatus.LOGGED_OUT);
        }
      };

      fetchAccountStatus();
    }
  }, [user, loggingIn]); 

  if (loggingIn) return <CenteredLoading />;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/login" element={<LoginPage user={user} />} />
          <Route path="/signup" element={<SignupPage user={user} accountStatus={accountStatus} />} />
          <Route element={ <ProtectedRoute user={user} accStatus={accountStatus}/>} >
            <Route index element={<WelcomePage />} />
            <Route path="app" element={<TodoList />} />
            <Route path="app/:taskId" element={<TaskDetail />} />
            <Route path="account" element={<AccountEdit user={user} />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Home;
