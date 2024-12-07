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
  title: "About",
};
export default async function Discord() {
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
            <BreadcrumbPage>Discord</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      <div className="text-center">
        <img
          src="/discord.webp"
          alt="discord"
          title="discord"
          width={400}
          className="mx-auto p-4"
        />
        <div>
          <p>discord has no profile link but my username there is veve :3</p>
        </div>
      </div>
    </>
  );
}
