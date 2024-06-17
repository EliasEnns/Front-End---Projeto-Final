import React, { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";



const Dashboard = () => {
  const auth = useAuth();

  return (
    <>
    <h1>Dashboard</h1>
    <h1>Welcome! {auth.user?.username}</h1>
</>
  );

};

export default Dashboard;