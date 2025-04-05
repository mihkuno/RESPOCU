import React from "react";
import type { Metadata } from "next";
import { ProfileProvider } from "@/providers/profileContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "RESPOCU",
  description: "Your easy to manage web application for event reservation",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  // TODO: get the profile data from the header
  const email = 'caindayjoeninyo@gmail.com';
  const isAdmin = true;

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ProfileProvider profileData={{ email, isAdmin }}>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
