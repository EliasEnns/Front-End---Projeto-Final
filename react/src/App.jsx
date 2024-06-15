import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import 'reactjs-popup/dist/index.css';

import './App.css'
import NavBar from './components/NavBar'


function App() {



  return (
    <>

      <NavBar />
  <Outlet />


    </>
  )
}

export default App
