import React from "react";
import type { Metadata } from "next";
import { ProfileProvider } from "@/providers/profileContext";
import { CookiesProvider } from 'next-client-cookies/server';

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
        <CookiesProvider>
        <ProfileProvider profileData={{ email, isAdmin }}>
          {children}
        </ProfileProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
