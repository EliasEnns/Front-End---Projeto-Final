
import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './components/ErrorPage.jsx'
import Home from './routes/Home.jsx' // Import the Home component
import Products from './routes/Products.jsx' // Import the Products component
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
    path: '/',
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
