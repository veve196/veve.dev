import Background from "@/components/background";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import "../styles/globals.css";
import BongoVeve from "@/components/bongo-veve";

const pixelFont = localFont({ src: "../../public/pixelFont.woff2" });
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
    siteName: "veve.dev",
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
            <BongoVeve className="fixed z-10 bottom-[-8px] right-4" />
          </main>
          <Toaster />
          <Background />
        </ThemeProvider>
      </body>
    </html>
  );
}
