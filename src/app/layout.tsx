import React from "react";
import type { Metadata } from "next";
import { CookiesProvider } from 'next-client-cookies/server';
import "./globals.css";

export const metadata: Metadata = {
  title: "RESPOCU",
  description: "Your easy to manage web application for event reservation",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </body>
    </html>
  );
}
