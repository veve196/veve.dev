import { Button } from "@/components/ui/button";
import { isMimeTypeAnimatable, scaleImageDimensions } from "@/utils/helpers";
import { ImageDocument } from "@/utils/models";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GalleryDetailImageProps {
  image: ImageDocument;
}

export default function GalleryDetailImage({ image }: GalleryDetailImageProps) {
  const { scaledWidth, scaledHeight } = scaleImageDimensions(
    image.width,
    image.height,
    800,
    true
  );

  return (
    <>
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
          unoptimized={isMimeTypeAnimatable(image.mimeType)}
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
    </>
  );
}
