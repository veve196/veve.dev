import { Metadata } from "next/types";
import getGallery from "@/utils/server-api/getGallery";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Gallery",
};
export default async function Gallery() {
  const gallery = await getGallery();

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
            <BreadcrumbPage>Gallery</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      <div className="flex gap-4 flex-wrap justify-center">
        {gallery.documents.map((document) => {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${document.fileId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&height=400`;
          return (
            <Link key={document.$id} href={`/gallery/${document.$id}`}>
              <div className="mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={document.displayName}
                  title={document.displayName}
                  className="rounded-md h-[200px]"
                />
                <p className="text-center">{document.displayName}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
