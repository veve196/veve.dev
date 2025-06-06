import Image from "next/image";
import { Metadata } from "next/types";
import "@/styles/about.css";

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
  return (
    <>
      <div className="flex gap-4">
        <Image
          src="/about/wave.webp"
          alt="wave"
          title="Hewwo!"
          width={200}
          height={250}
          priority
        />
        <div>
          <p className="text-2xl mb-3">Hello, I&apos;m veve!</p>
          <p>Hey guys did you know that</p>
          <p>...</p>
          <p>Uhm hey guys</p>
        </div>
      </div>
    </>
  );
}
