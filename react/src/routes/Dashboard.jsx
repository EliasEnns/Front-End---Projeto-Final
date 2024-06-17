import React, { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <div>
        <h1>Welcome! {auth.user?.username}</h1>
      </div>
    </div>
  );
};

export default Dashboard;