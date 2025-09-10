"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthListener } from "@/components";


export const metadata: Metadata = {
  title: "Car Rental",
  description: "Discover the best cars for rent in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Provider store={store}>
          <AuthListener />
          {children}
        </Provider>

      </body>
    </html>
  );
}
