import ColorButton from "@/components/colorButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next/types";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Refsheet",
  description: "here u go :3",
  openGraph: {
    title: "Fufu's ref",
    description: "here u go :3",
    type: "website",
    siteName: "veve",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/ref/fufu/refsheet_preview.webp`,
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
        src="/ref/fufu/refsheet_preview.webp"
        alt="Refsheet"
        title="Refsheet"
        width={896}
        height={686}
        priority
        className="mx-auto mb-2 rounded-md object-cover"
      />
      <div className="flex justify-between mt-4">
        <div>
          <ColorButton copyColor="#fe29b2" />
          <ColorButton copyColor="#e115ae" />
          <ColorButton copyColor="#ff1ca3" />
          <ColorButton copyColor="#90067e" />
          <ColorButton copyColor="#3a0d4c" />
          <ColorButton copyColor="#fffcfd" textColor="#000" />
        </div>
        <a href="/ref/fufu/refsheet.png" download>
          <Button className="justify-end" title="full resolution">
            Download
          </Button>
        </a>
      </div>
    </>
  );
}
