import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import Services from './routes/Services.jsx';
import App from './App.jsx';
import Users from './routes/Users.jsx';
import './index.css';
import AuthProvider from './hooks/AuthProvider';
import Login from './routes/Login.jsx';
import PrivateRoute from './router/PrivateRoute';
import AdminPrivateRoute from './router/AdminPrivateRoute.jsx';
import Layout from './components/Layout'; // Import the Layout component
import Profile from './routes/Profile'; // Import the Layout component

const Main = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route 
            path="/login"
            element={<Login />} />
              <Route 
                path="/" 
                element={<PrivateRoute />}
                errorElement={<ErrorPage />}
                >
                  <Route element={<Layout />}>
                    <Route
                      index 
                      element={<App />}/>
                    <Route 
                      path="services" 
                      element={<Services />} />
                    <Route path="Users" element={<AdminPrivateRoute />}>
                      <Route index element={<Users />} />
                    </Route>
                    <Route 
                      path="profile" 
                      element={<Profile />} />
                  </Route>
              </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);