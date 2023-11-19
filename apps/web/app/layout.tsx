"use client";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import AsyncLayoutDynamic from "@/containers/async-layout-dynamic";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "h-full bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <UserProvider>

        <AsyncLayoutDynamic>{children}</AsyncLayoutDynamic>
        </UserProvider>

      </body>
    </html>
  );
}
