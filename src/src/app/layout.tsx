import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import Providers from "@/app/ui/providers/Providers";
import {InitColorSchemeScript} from "@mui/material";
import "./globals.scss";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: "KI-Agenten Umfrage",
    description: "Umfrage zu KI-Agenten, die mit der Benutzeroberfläche interagieren können.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript />
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  );
}
