import Game from "@/components/game";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Oops! The page you're looking for was not found.",
  openGraph: {
    title: "404 - Page Not Found",
    description: "Oops! The page you're looking for was not found.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/ref/not-found.webp`,
        width: 720,
        height: 713,
        alt: "Not found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <div className="text-2xl flex flex-col items-center justify-center w-full h-full fixed overflow-hidden top-0 left-0 p-8">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-8xl font-bold">404</h1>
          <p className="mb-8">
            Oops! The page you&apos;re looking for was not found.
            <br />
            Anyway, help little veve to jump over the obstacles!
          </p>
          <Game />
          <p>Press SPACE to jump!</p>
          <Button className="text-2xl mt-4">
            <Link href="/">Homepage</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
