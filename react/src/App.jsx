import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import React from 'react'
import 'reactjs-popup/dist/index.css';

import './App.css'
import NavBar from './components/NavBar'

import AuthProvider from "./hooks/AuthProvider";

function App() {

  return (
    <>
        <div className="App">

        <AuthProvider >
        <>
        <NavBar /> 
        <Outlet /> 
        </>
        </AuthProvider >
    </div>
     
    </>

    
  )
}

export default App