import React from 'react';
import App from './pages/App';
import WelcomePage from './pages/Welcome';
import ProtectedRoute from './auth/ProtectedRoute';
import Header from './Header';
import {SignupForm} from './pages/SignUpPage';
import { LoginForm } from './pages/LoginPage';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



const Home = () => {
  
  const user = useTracker(() => Meteor.user());

  return (
    <BrowserRouter>
 
      <Routes>
        <Route path="/login" element={<LoginForm user={user} />} />
        <Route path="/signup" element={<SignupForm user={user} />} />
        <Route
          path="*"
          element={
            <ProtectedRoute user={user}>
              <Routes>
                <Route path="/app" element={<App  />} />
                <Route path="/" element={<WelcomePage />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
   
  </BrowserRouter>
  );
  }

export default Home;
