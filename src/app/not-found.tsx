import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Oops! The page you're looking for was not found.",
};

export default function NotFound() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="z-10">
            <BreadcrumbLink asChild>
              <Link href={"/"}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>???</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      <div className="text-2xl flex flex-col items-center justify-center w-full h-full fixed overflow-hidden top-0 left-0 p-8">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <Image
            src={"/not-found/not-found.webp"}
            alt="Page not found"
            title="Page not found"
            width={200}
            height={200}
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
