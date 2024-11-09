import DrawingCanvas from "@/components/drawingCanvas";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Metadata } from "next/types";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Draw something!",
};
export default async function About() {
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
            <BreadcrumbPage>Draw</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      <h1 className="text-center">
        Draw something <b>anonymously</b> for me to see! :3
      </h1>
      <p className="text-center text-destructive my-2">kinda wip!</p>
      <DrawingCanvas />
    </>
  );
}
