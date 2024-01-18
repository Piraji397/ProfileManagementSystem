import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex">
      <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
