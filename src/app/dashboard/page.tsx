import React from "react";
import AuthButton from "../AuthButton.server";

const Dashboard = () => {
  return (
    <div className="flex flex-row bg-white shadow-md p-4 gap-4 rounded-lg justify-between">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div>
        <AuthButton />
      </div>
    </div>
  );
};

export default Dashboard;
