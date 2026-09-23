import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";
import AppNavbar from "@/_lib/navigation/AppNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jon Blog",
  description: "Editorial blog and admin workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppNavbar />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
