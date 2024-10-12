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
import getImage, { getAltImages } from "@/utils/server-api/getImage";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Details",
};
export default async function Details({
  params: { imageId },
}: {
  params: { imageId: string };
}) {
  const image = await getImage(imageId);
  const alts = await getAltImages(imageId);

  const images = [image, ...alts.documents];

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

      {images.map((image, index) => (
        <div key={image.$id}>
          <div key={image.$id} className="flex gap-4 mb-12">
            <div className="flex-grow">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${image.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                alt={image.title}
                title={image.title}
                className="rounded-md min-w-32"
              />
            </div>
            <div>
              <h1 className="text-4xl">{image.title}</h1>
              <div
                className="mt-2 mb-4"
                dangerouslySetInnerHTML={{
                  __html: image.description || "No description...",
                }}
              />
              {image.artistUrl && (
                <Link
                  href={image.artistUrl}
                  target="_blank"
                  className="flex align-middle"
                  title="Artist link"
                >
                  <LinkIcon className="pe-2" />
                  {image.artistUrl}
                </Link>
              )}{" "}
              <Button className="mt-4">
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${image.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                  target="_blank"
                >
                  See full image
                </Link>
              </Button>
            </div>
          </div>
          {index === 0 && images.length > 1 && (
            <h2 className="mb-8">Alt versions:</h2>
          )}
        </div>
      ))}
    </>
  );
}
