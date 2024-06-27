import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import Background from "@/components/background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "veve",
    template: "%s - veve",
  },
  description:
    "i'm veve and i suck at everything :3 i like to make things, though.",
  keywords: ["veve", "portfolio", "web", "design", "development"],
  openGraph: {
    title: "veve",
    description:
      "i'm veve and i suck at everything :3 i like to make things, though.",
    type: "website",
    siteName: "veve",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="mx-auto max-w-4xl my-8 px-3 lg:px-0">
            {children}
          </main>
          <Toaster />
          <Background />
        </ThemeProvider>
      </body>
    </html>
  );
}
