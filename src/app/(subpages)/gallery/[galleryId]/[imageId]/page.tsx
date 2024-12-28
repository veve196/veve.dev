import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getImage, getAltImages } from "@/server-api/gallery";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next/types";
import React from "react";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Details",
};

export default async function Details(props: {
  params: Promise<{ imageId: string }>;
}) {
  const params = await props.params;

  const { imageId } = params;

  const img = await getImage(imageId);
  const alts = await getAltImages(imageId);

  const images = [img, ...alts.documents];

  return (
    <>
      {images.map((image, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-wrap gap-4">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${image.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
              alt={image.title}
              title={image.title}
              className="max-h-96"
            />
            <div>
              <h1 className="text-4xl">{image.title}</h1>
              <div
                className="mt-2 mb-4 image-description"
                dangerouslySetInnerHTML={{
                  __html: image.description || "No description...",
                }}
              />
              {image.artistUrl && (
                <Link
                  href={image.artistUrl}
                  target="_blank"
                  className="flex align-middle underline"
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
            <>
              <Separator className="my-6" />
              <h2 className="mb-4">Alt versions:</h2>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
