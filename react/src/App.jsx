import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import React from 'react'
import 'reactjs-popup/dist/index.css';

import './App.css'
import NavBar from './components/NavBar'


function App() {



  return (
    <>
      <NavBar />

      <div >

      <Outlet />
      </div>


      <p>Merda</p>


    </>
  )
}

export default App
