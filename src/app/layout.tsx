import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./redux/Provider";
import AuthInitializer from "./redux/AuthInitialize";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Semester Simplified",
  description: "Semester Simplified - Revamped | Next.JS",
  icons: {
    icon: "/favicon.ico", // Default favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <AuthInitializer />
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ReduxProvider>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </body>
    </html>
  );
}
