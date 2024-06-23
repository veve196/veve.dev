import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "About",
};
export default async function About() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      <div className="flex gap-4">
        <Image
          src="/veve/wave.webp"
          alt="wave"
          title="Hewwo!"
          width={200}
          height={200}
          className=""
        />
        <div>
          <p className="text-2xl mb-3">Hello, I'm veve!</p>
          <p>Hey guys did you know that</p>
          <p>...</p>
          <p>Uhm hey guys</p>
        </div>
      </div>
    </>
  );
}
