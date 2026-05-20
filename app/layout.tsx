import AppProvider from "@/providers/app-provider";
import type { Metadata } from "next";
import { Baloo_2, Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-geist-baloo",
  weight: ['400', '500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-geist-montserrat",
});

export const metadata: Metadata = {
  title: "AwoofHub",
  description: "AwoofHub is a centralized marketplace for discovering verified deals, discounts, promos, and freebies from businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baloo.variable} ${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
            {children}
        </AppProvider>
      </body>
    </html>
  );
}
