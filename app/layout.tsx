import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import NavbarCart from "@/components/NavbarCart";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Website",
  description: "By Akshith Anand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* Make sure to keep your font variables here if you have them */}
        <body className="antialiased">
          
          {/* ReduxProvider wraps the visible UI */}
          <ReduxProvider>
            
            {/* Navbar is visible to everyone */}
            <Navbar />
            
            <main>
              {children}
            </main>
            
          </ReduxProvider>
          
        </body>
      </html>
    </ClerkProvider>
  );
}
