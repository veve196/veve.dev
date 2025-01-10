import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getImage, getAltImages } from "@/server-api/gallery";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next/types";
import React from "react";
import "@/styles/details.css";

export const runtime = "edge";

export async function generateMetadata(props: {
  params: Promise<{ imageId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { imageId } = params;

  const img = await getImage(imageId);

  return {
    title: img.title,
    description: img.description,
    openGraph: {
      title: img.title,
      description: img.description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${img.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`,
          alt: img.title,
        },
      ],
    },
  };
}

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
      {images.map((image, index) => {
        image.width = image.width || 300;
        image.height = image.height || 300;

        const isLarge = image.height > 800;
        const scaledHeight = isLarge ? 800 : image.height;
        const scaledWidth = isLarge
          ? (image.width / image.height) * scaledHeight
          : image.height;

        return (
          <React.Fragment key={index}>
            <div className="image-container p-4 rounded-lg mb-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${image.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                alt={image.title}
                title={image.title}
                width={scaledWidth}
                height={scaledHeight}
                objectFit="contain"
                className="mx-auto"
                quality={100}
                unoptimized={
                  image.mimeType != null &&
                  [
                    "image/gif",
                    "image/apng",
                    "image/webp",
                    "image/svg+xml",
                    "video/x-mng",
                  ].includes(image.mimeType)
                }
                placeholder="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw"
              />
            </div>
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
            {index === 0 && images.length > 1 && (
              <>
                <Separator className="my-6" />
                <h2 className="mb-4">Alt versions:</h2>
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
