"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import React, { useEffect, useState } from "react";
import StaffSidebar from "@/components/sidebarstaff";
import SignatorySidebar from "@/components/sidebarsignatory";
import StudentSidebar from "@/components/sidebarstudent";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const showSidebar =
    pathname !== "/" &&
    pathname !== "/test-route" &&
    pathname !== "/signin" &&
    pathname !== "/register"; // Adjust this condition as needed

  const showStaffSidebar =
    pathname === "/staff-dashboard" ||
    pathname === "/staff-requirements" ||
    pathname === "/staff-approve"; // Add condition for StaffSidebar

  const showSignatorySidebar =
    pathname === "/signatory-dashboard" || pathname === "/signatory-sign"; // Add condition for SignatorySidebar

  const showStudentSidebar =
    pathname === "/student-dashboard" ||
    pathname === "/student-requirements" ||
    pathname === "/student-clearance" ||
    pathname === "/student-clearance/track-clearance"; // Add condition for StudentSidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Call handleResize to set the initial state
    handleResize();

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-200 overflow-hidden">
      {showSidebar &&
        !showStaffSidebar &&
        !showSignatorySidebar &&
        !showStudentSidebar && (
          <div
            className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-10"} transition-all duration-300`}
          >
            <Sidebar />
          </div>
        )}
      {showStaffSidebar && (
        <div
          className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-10"} transition-all duration-300`}
        >
          <StaffSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      )}
      {showSignatorySidebar && (
        <div
          className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-10"} transition-all duration-300`}
        >
          <SignatorySidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}
      {showStudentSidebar && (
        <div
          className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-10"} transition-all duration-300`}
        >
          <StudentSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}
      <div
        className={`flex flex-col w-full h-full ml-${isSidebarOpen ? "64" : "10"} p-4 overflow-auto transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
}
