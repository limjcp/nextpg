// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "@/auth";

// Import all layouts
import AdminLayout from "@/components/AdminLayout";
import StudentLayout from "@/components/StudentLayout";
import SignatoryLayout from "@/components/SignatoryLayout";
import StaffLayout from "@/components/StaffLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HTCGENSAN SPCS",
  description: "By: Jahn Claudio Lim",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // Function to choose layout based on role
  function getLayoutBasedOnRole(role: string) {
    switch (role) {
      case "admin":
        return <AdminLayout>{children}</AdminLayout>;
      case "student":
        return <StudentLayout>{children}</StudentLayout>;
      case "signatory":
        return <SignatoryLayout>{children}</SignatoryLayout>;
      case "staff":
        return <StaffLayout>{children}</StaffLayout>;
      default:
        return <div>Unauthorized</div>; // Fallback for unknown roles
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {session?.user ? (
            getLayoutBasedOnRole(session.user.role)
          ) : (
            <div>Loading...</div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
