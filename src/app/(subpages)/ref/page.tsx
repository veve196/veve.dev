import ColorButton from "@/components/colorButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next/types";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Refsheet",
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
        <a href="/ref/refsheet_veve.png" download>
          <Button className="justify-end" title="full resolution">
            Download
          </Button>
        </a>
      </div>
    </>
  );
}
