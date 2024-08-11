import React from "react";

const StaffDashboard: React.FC = () => {
  // Add your dashboard logic here

  return (
    <div>
      <div className="bg-green-800 flex flex-auto rounded-lg">
        <div className="p-4">
          <h1 className="text-white text-2xl">Staff Dashboard</h1>
          <p className="text-white text-sm">Welcome to the staff dashboard</p>
        </div>
      </div>
      <div className="flex flex-auto">
        <div className="bg-gray-300 flex flex-auto rounded-lg">
          <div className="p-4">
            <h2>Staff Dashboard</h2>
            <p>Welcome to the staff dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
