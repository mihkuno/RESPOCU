import React from "react";
import type { Metadata } from "next";
import { ProfileProvider } from "@/providers/profileContext";
import { CookiesProvider } from 'next-client-cookies/server';
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "RESPOCU",
  description: "Your easy to manage web application for event reservation",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const headersList = await headers();
    const email = headersList.get('email') as string;
    const type = headersList.get('type') as string;

    console.log(type);

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <CookiesProvider>
        <ProfileProvider profileData={{ email, isAdmin: type === "admin" }}>
          {children}
        </ProfileProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
