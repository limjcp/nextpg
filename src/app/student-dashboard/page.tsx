"use client";

import { useState, useEffect } from "react";

interface ClearanceStatus {
  office: string;
  status: "cleared" | "pending" | "not cleared";
  signedDate: Date;
}

const ClearancePage = () => {
  const [clearanceStatuses, setClearanceStatuses] = useState<ClearanceStatus[]>(
    []
  );

  useEffect(() => {
    // Fetch clearance statuses from an API
    const fetchClearanceStatuses = async () => {
      // Replace this with actual API call
      const mockData: ClearanceStatus[] = [
        { office: "Registrar", status: "cleared", signedDate: new Date() },
        { office: "Library", status: "pending", signedDate: new Date() },
        { office: "Finance", status: "not cleared", signedDate: new Date() },
      ];
      setClearanceStatuses(mockData);
    };

    fetchClearanceStatuses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Clearance Tracking</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Office</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Signed Date</th>
          </tr>
        </thead>
        <tbody>
          {clearanceStatuses.map((status, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{status.office}</td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    status.status === "cleared"
                      ? "bg-green-200 text-green-800"
                      : status.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                  }`}
                >
                  {status.status}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                {status.signedDate.toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClearancePage;
