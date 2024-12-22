import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Background from "@/components/background";

const pixelFont = localFont({ src: "../../public/PixelMplus12-Regular.woff2" });
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
      <body
        className={`${pixelFont.className} antialiased tracking-widest text-[1.2rem]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
