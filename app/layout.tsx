import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Jon's Blog",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Script id="theme" strategy="beforeInteractive">
        {`(() => {
          const theme = localStorage.getItem('theme');
          const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.classList.toggle('dark', dark);
          document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
        })()`}
      </Script>
      <body className="min-h-full flex flex-col">
        <AppNavbar />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-3 pt-3">
          {children}
        </main>
      </body>
    </html>
  );
}
