import type { Metadata } from "next";
import "./globals.css";


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
      <body>
        {children}
      </body>
    </html>
  );
}
