import ColorButton from "@/components/colorButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next/types";
import "@/styles/ref.css";
import Link from "next/link";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Refsheet",
  description: "here u go :3",
  openGraph: {
    title: "veve's ref",
    description: "here u go :3",
    type: "website",
    siteName: "veve",
    images: [
      {
        url: "/ref/refsheet_preview.webp",
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
          Click here for BFs ref!
        </Link>
      </div>
    </>
  );
}
