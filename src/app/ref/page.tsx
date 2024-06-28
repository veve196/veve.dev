import ColorButton from "@/components/colorButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Metadata } from "next/types";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Refsheet",
};
export default async function Home() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/"}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Ref</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      <AspectRatio ratio={47 / 36}>
        <Image
          fill
          src="/ref.png"
          alt="Refsheet"
          title="Refsheet"
          priority
          className="mx-auto mb-2 rounded-md object-cover"
        />
      </AspectRatio>

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
        <a href="/ref.png" download>
          <Button className="justify-end">Download</Button>
        </a>
      </div>
    </>
  );
}
