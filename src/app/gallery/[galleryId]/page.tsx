import { Metadata } from "next/types";
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
import getGalleryItem from "@/utils/server-api/getGalleryItem";
import { LinkIcon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Details",
};
export default async function Details({
  params: { galleryId },
}: {
  params: { galleryId: string };
}) {
  const gallery = await getGalleryItem(galleryId);

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
            <BreadcrumbLink asChild>
              <Link href={"/gallery"}>Gallery</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-4" />
      <div className="flex gap-4">
        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${gallery.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
            alt={gallery.displayName}
            title={gallery.displayName}
            className="rounded-md max-w-1/3"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-4xl">{gallery.displayName}</h1>
          <p className="mt-2 mb-4">
            {gallery.description ?? "No description..."}
          </p>
          {gallery.artist && (
            <Link
              href={gallery.artist}
              target="_blank"
              className="flex align-middle"
            >
              <LinkIcon className="pe-2" />
              {gallery.artist}
            </Link>
          )}{" "}
          <Button className="mt-4">
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${gallery.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
            >
              See full image
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
