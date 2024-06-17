import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './components/ErrorPage.jsx'
import Home from './routes/Home.jsx' // Import the Home component
import Products from './routes/Products.jsx' // Import the Products component
import App from './App.jsx'
import Dashboard from './routes/Dashboard.jsx'
import './index.css';
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'

import AuthProvider from './hooks/AuthProvider'
import PrivateRoute from "./router/Route"
import LoginPrompt from './routes/LoginPrompt'

const router = createBrowserRouter([
  // {
    // element: <AuthProvider />,
    // children: [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/Products',
            element: <Products />
          },
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/login',
            element: <LoginPrompt />,
          },
          {
            element: <PrivateRoute />,
            children: [
              {
                path: '/dashboard',
                element: <Dashboard />,
              },
            ]
          }

        ]
      },
    // ]
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <BrowserRouter>
        {/* <AuthProvider> Make sure AuthProvider wraps around your App component */}
          <App />
        {/* </AuthProvider> */}
      </BrowserRouter>
    </RouterProvider>
  </React.StrictMode>
);
