import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
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
          <Image
            src={"/error.webp"}
            alt="Page not found"
            title="Page not found"
            width={400}
            height={400}
          />
          <h1 className="text-8xl font-bold">404</h1>
          <Separator className="w-full" />
          <p>Oops! The page you&apos;re looking for was not found.</p>
          <Button variant="link" className="text-2xl">
            <Link href="/">Go back</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
