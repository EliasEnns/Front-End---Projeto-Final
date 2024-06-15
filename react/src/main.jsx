
import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './components/ErrorPage.jsx'
import Home from './components/Home.jsx' // Import the Home component
import Products from './components/Products.jsx' // Import the Products component
import App from './App.jsx'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
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
    path: '/Home',
    element: <Home />,
  },
]
},
]

)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
