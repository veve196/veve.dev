import ColorButton from "@/components/colorButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";
export default async function Home() {
  return (
    <div className="w-[800px] mx-auto my-2 pt-4">
      <Link href="/">
        <Button>Go Back</Button>
      </Link>
      <Image
        width={800}
        height={800}
        src="/ref.png"
        alt="Refsheet"
        title="Refsheet"
        className="mx-auto mb-2 mt-2"
      />
      <div className="flex justify-between">
        <span>
          <ColorButton copyColor="#2b3855" />
          <ColorButton copyColor="#47aafe" />
          <ColorButton copyColor="#80c3ff" />
          <ColorButton copyColor="#ffffff" textColor="#000" />
          <ColorButton copyColor="#75a6bd" />
          <ColorButton copyColor="#7bbbb0" />
          <ColorButton copyColor="#800000" />
        </span>
        <a href="/ref.png" download>
          <Button className="justify-end">Download</Button>
        </a>
      </div>

      <div className="text-center mt-4"></div>
    </div>
  );
}
