import ColorButton from "@/components/color-button";
import { Button } from "@/components/ui/button";
import "@/styles/ref.css";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Refsheet",
  description: "here u go dear artist 👉👈",
  openGraph: {
    title: "veve's ref",
    description: "here u go dear artist 👉👈",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/ref/refsheet_preview.webp`,
        width: 896,
        height: 686,
        alt: "Refsheet",
      },
    ],
  },
};

export default async function Home() {
  return (
    <>
      <Image
        src="/ref/refsheet_preview.webp"
        alt="Refsheet"
        title="Refsheet"
        width={896}
        height={686}
        priority
        className="mx-auto mb-2 rounded-md object-cover"
      />
      <div className="flex justify-between mt-4">
        <div>
          <ColorButton copyColor="#2b3855" />
          <ColorButton copyColor="#47aafe" />
          <ColorButton copyColor="#80c3ff" />
          <ColorButton copyColor="#ffffff" textColor="#000" />
          <ColorButton copyColor="#75a6bd" />
          <ColorButton copyColor="#7bbbb0" />
          <ColorButton copyColor="#800000" />
        </div>
        <a href="/ref/refsheet.png" download>
          <Button className="justify-end" title="full resolution">
            Download
          </Button>
        </a>
      </div>
      <div className="text-center mt-8">
        <Link href="/ref/fufu" className="rainbow-text text-4xl">
          Click here for Bfs ref!
        </Link>
      </div>
    </>
  );
}
