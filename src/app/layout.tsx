import type { Metadata } from "next";
import localFont from "next/font/local";

import Providers from "@/providers/providers";
import { Navbar, Footer } from "@/lib";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Crypto",
  description: "Next Crypto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
            <Navbar />
            {children}
            <Footer />
        </Providers>
      </body>
    </html>
  );
}
