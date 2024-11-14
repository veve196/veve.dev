"use client";

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

export default function Custom404() {
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
            <BreadcrumbPage>Oopsie</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      <div className="text-2xl flex flex-col items-center justify-center w-full h-full fixed overflow-hidden top-0 left-0 p-8">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <Image
            src={"/404.webp"}
            alt="Page not found"
            title="Page not found"
            width={400}
            height={400}
          />
          <h1 className="text-8xl font-bold">500</h1>
          <Separator className="w-full" />
          <p>
            Something went wrong and it's definitely not my fault.
            <br />
            Please try again later!
          </p>
          <Button variant="link" className="text-2xl">
            <Link href="/">Try Again</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
