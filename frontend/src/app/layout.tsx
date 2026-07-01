import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Syne } from "next/font/google";

import { getServerHasAccessToken } from "@/lib/auth/server-token";
import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Coach Flow",
  description: "Plataforma de coaching fitness",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialIsAuthenticated = await getServerHasAccessToken();

  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="font-sans antialiased">
        <AppProviders initialIsAuthenticated={initialIsAuthenticated}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
