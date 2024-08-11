"use client";

import {
  Sidebar,
  useSidebar,
  Overlay,
  Button,
  SidebarState,
} from "@rewind-ui/core";
import {
  Briefcase,
  Users,
  Shield,
  Key,
  Sliders,
  Book,
  LayoutDashboard,
  Signature,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

// Dynamically import AuthButton to ensure it's only used on the client side
const AuthButton = dynamic(() => import("../app/AuthButton.client"), {
  ssr: false,
});

const SignatoryLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";

  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const sidebar = useSidebar();
  const pathname = usePathname(); // Use usePathname to get the current path

  useEffect(() => {
    if (typeof window !== "undefined" && pathname) {
      // Ensure that pathname is defined
      if (pathname.includes("signatory-dashboard")) {
        setSelectedItem("Dashboard");
      } else if (pathname.includes("signatory-sign")) {
        setSelectedItem("Sign");
      } else if (pathname.includes("settings")) {
        setSelectedItem("Settings");
      } else {
        setSelectedItem(""); // Default case if no match is found
      }
    }
  }, [pathname]); // Run the effect whenever the path changes

  return (
    <div className="relative flex flex-row w-full h-screen bg-black">
      <Sidebar
        onToggle={(state: SidebarState) => {
          setExpanded(state.expanded);
          setMobile(state.mobile);
        }}
        className="fixed h-full bg-green-900 text-white"
      >
        <Sidebar.Head>
          <Sidebar.Head.Logo>
            <Image src="/htc-new-seal.png" width={38} height={38} alt="HTC" />
          </Sidebar.Head.Logo>
          <Sidebar.Head.Title>HTC SPCS</Sidebar.Head.Title>
          <Sidebar.Head.Toggle />
        </Sidebar.Head>

        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Item
              icon={<LayoutDashboard />}
              label="Dashboard"
              href="/signatory-dashboard"
              className={`${
                selectedItem === "Dashboard"
                  ? "border-2 border-white rounded-md"
                  : ""
              } hover:border-2 hover:border-white hover:rounded-md`}
              onClick={() => setSelectedItem("Dashboard")}
            />
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Item
              icon={<Signature />}
              label="Sign"
              href="/signatory-sign"
              className={`${
                selectedItem === "Sign"
                  ? "border-2 border-white rounded-md"
                  : ""
              } hover:border-2 hover:border-white hover:rounded-md`}
              onClick={() => setSelectedItem("Clients")}
            />

            <Sidebar.Nav.Section.Item
              icon={<Sliders />}
              label="Settings"
              href="/settings"
              className={`${
                selectedItem === "Settings"
                  ? "border-2 border-white rounded-md"
                  : ""
              } hover:border-2 hover:border-white hover:rounded-md`}
              onClick={() => setSelectedItem("Settings")}
            />
          </Sidebar.Nav.Section>
        </Sidebar.Nav>

        <Sidebar.Footer>
          <div className=" flex items-center ">
            <AuthButton />
          </div>
        </Sidebar.Footer>
      </Sidebar>

      <main
        className={`transition-all transform duration-100 text-black flex w-full flex-col items-center ${
          expanded ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {mobile && (
          <Overlay
            blur="none"
            onClick={() => {
              sidebar.toggleMobile();
            }}
            className="md:hidden z-40"
          />
        )}
        <header className="flex flex-row sticky top-0 px-8 items-center bg-green-900 border-b border-b-gray-100 w-full shadow-sm min-h-[4rem]">
          <span className="text-xl text-white font-bold my-2">
            GoodHoly, {userName}!
          </span>

          <Button
            onClick={() => {
              sidebar.toggleMobile();
            }}
            size="sm"
            color="white"
            icon
            className="ml-auto flex md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
              <path
                className="opacity-50"
                d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32-14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
              />
            </svg>
          </Button>
        </header>

        <div className="w-full h-full p-8 bg-white">{children}</div>

        <div className="flex sticky bottom-0 items-center bg-white w-full min-h-[4rem] px-8">
          <span>Holy Trinity College of General Santos City</span>
        </div>
      </main>
    </div>
  );
};

export default SignatoryLayout;
