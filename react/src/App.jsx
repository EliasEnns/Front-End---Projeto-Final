import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import React from 'react'
import { useAuth } from "./hooks/AuthProvider";
import './App.css'
import NavBar from './components/NavBar'

function App() {
  const auth = useAuth();
  return (
    
    <>
    <div className="App">

        <>
        <h1>Home</h1>
        <h1>Bem Vindo! {auth.user?.username}</h1>
        <Outlet />
        </>
    </div>
    </>
  )
}

export default App