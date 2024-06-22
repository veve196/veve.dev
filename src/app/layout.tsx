import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${inter.className} min-h-screen bg-background antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
