import type { Metadata } from "next";
import localFont from "next/font/local";
import {routing} from '@/i18n/routing';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';

import Providers from "@/providers/providers";
import { Navbar, Footer } from "@/lib";

import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Crypto",
  description: "Next Crypto",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {

  unstable_setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
            <NextIntlClientProvider messages={messages}>
                <Navbar />
                {children}
                <Footer />
            </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}