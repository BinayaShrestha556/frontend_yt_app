
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import { Providers } from "./GlobalStates/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewTube app",
  description: "A video sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className=" flex flex-col  w-full h-screen overflow-y-hidden">
      <Providers>
          <Navbar />
          <div className="flex mt-20 h-full w-full">
            <div className="h-full relative "></div>
            <Sidebar />
            <div className="h-full flex-grow overflow-y-scroll">{children}</div>
          </div>
      </Providers>
        </body>
    </html>
  );
}
