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
    path: "/dashboard",
  },
  {
    name: "Clearance",
    icon: NotepadText,
    path: "/clearance",
  },
  {
    name: "Requirements",
    icon: ClipboardCheck,
    path: "/requirements",
  },
  {
    name: "Transaction",
    icon: BadgeDollarSign,
    path: "/transaction",
  },
  {
    name: "Payment",
    icon: WalletCards,
    path: "/payment",
  },
  {
    name: "Accounts",
    icon: CircleUserRound,
    path: "/accounts",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
    items: [
      {
        name: "General",
        path: "/settings",
      },
      {
        name: "Security",
        path: "/settings/security",
      },
      {
        name: "Notifications",
        path: "/settings/notifications",
      },
    ],
  },
  {
    name: "Help",
    icon: HelpingHand,
    path: "/help",
    items: [
      {
        name: "FAQs",
        path: "/help/faqs",
      },
      {
        name: "Support",
        path: "/help/support",
      },
      {
        name: "Contact Us",
        path: "/help/contact-us",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-green-800 shadow-lg z-10 p-4">
      <div className="flex flex-col space-y-10 w-full">
        <div className="flex justify-center">
          <img className="h-20 w-fit" src="/htc-new-seal.png" alt="Logo" />
        </div>
        <div className="flex flex-col space-y-1 text-white">
          {items.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
