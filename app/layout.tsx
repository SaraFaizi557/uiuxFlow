import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import Provider from "./provider";
import { Artifika, DM_Sans } from "next/font/google";
import "./globals.css";

const artifika = Artifika({
  variable: "--font-artifika",
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "UI UX Flow",
  description: "Generate High quality UI/UX designs with AI. Perfect for web and mobile apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${artifika.variable} ${dmSans.variable} antialiased`}
        >
            <Provider>
              {children}
            </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
