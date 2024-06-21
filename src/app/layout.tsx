import clsx from "clsx";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const inter = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Elevator Generator",
  description: "Elevator-Generator",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="">
      <body className={clsx(inter.className, "h-screen")}>{children}</body>
    </html>
  );
}
