"use client";

import {
  BadgeDollarSign,
  CircleUserRound,
  ClipboardCheck,
  HelpingHand,
  LayoutDashboard,
  LucideIcon,
  NotepadText,
  Settings,
  WalletCards,
} from "lucide-react";
import React from "react";
import SidebarItem from "./item";
import { Button } from "../ui/button";
import { FaBars } from "react-icons/fa";

interface ISidebarItem {
  name: string;
  icon: LucideIcon;
  path: string;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/staff-dashboard",
  },

  {
    name: "Requirements",
    icon: ClipboardCheck,
    path: "/staff-requirements",
  },

  {
    name: "Approve",
    icon: HelpingHand,
    path: "/staff-approve",
  },
];

interface StaffSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const StaffSidebar: React.FC<StaffSidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  return (
    <div>
      {/* Toggle button for mobile view */}
      <button
        className="md:hidden p-4 bg-inherit text-black fixed top-1 left-0 z-20"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-green-800 shadow-lg z-10 p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col space-y-5 h-full">
          <div className="flex flex-col space-y-10">
            <div className="flex justify-center">
              <img className="h-20 w-fit" src="/htc-new-seal.png" alt="Logo" />
            </div>
            <div className="flex flex-col space-y-1 text-white">
              {items.map((item) => (
                <SidebarItem key={item.path} item={item} />
              ))}
            </div>
          </div>
          <div className="w-full">
            <Button
              onClick={() => {
                window.location.href = "/api/auth/signout";
              }}
              className="flex w-full bg-white text-black hover:text-white hover:bg-red-900"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay to close sidebar on mobile view
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )} */}
    </div>
  );
};

export default StaffSidebar;
