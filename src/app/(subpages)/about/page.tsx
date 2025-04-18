import Image from "next/image";
import { Metadata } from "next/types";
import "@/styles/about.css";
import { Button } from "@/components/ui/button";
import AboutPage from "./page.client";

export const metadata: Metadata = {
  title: "About",
  description: "This is my about page!",
  openGraph: {
    title: "About",
    description: "This page is about stuff",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/about/downey.webp`,
        alt: "stuff",
      },
    ],
  },
};

export default async function About() {
  return <AboutPage />;
}
