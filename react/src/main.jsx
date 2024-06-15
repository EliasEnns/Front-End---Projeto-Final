
import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './components/ErrorPage.jsx'
import App from './App.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx' // Import the Home component
import Products from './components/Products.jsx' // Import the Products component


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/Home',
    element: <Home />
  },
  {
    path: '/Products',
    element: <Products />
  },


]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
