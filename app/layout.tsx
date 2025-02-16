import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import { Providers } from "./GlobalStates/provider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NewTube app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  description: "A video sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" flex flex-col h-screen overflow-hidden w-full ">
        <Providers>
          <Navbar />
          <div className="flex  pt-20  w-full overflow-hidden">
          
            <Sidebar />
            <div className="h-[90dvh]  flex-grow overflow-y-scroll">
              <div>
                {children}
                <Footer />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
