"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Images } from "@/models";
import { getGalleryImages } from "@/server-api/gallery";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface GalleryContentProps {
  galleryId: string;
  imagesPerPage: number;
}

export default function GalleryContent({
  galleryId,
  imagesPerPage,
}: GalleryContentProps) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<Images.ImageType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageSize = 200;

  useEffect(() => {
    setIsLoading(true);
    getGalleryImages(galleryId, page, imagesPerPage).then((images) => {
      setImages(images);
      setIsLoading(false);
    });
  }, [page]);

  if (!images || isLoading) return <LoadingSpinner className="mx-auto" />;

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center">
        {images.documents.map((image, index) => {
          image.width = image.width || imageSize;
          image.height = image.height || imageSize;

          const isLarge = image.height != imageSize;
          const scaledHeight = isLarge ? imageSize : image.height;
          const scaledWidth = isLarge
            ? (image.width / image.height) * scaledHeight
            : image.height;

          const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${image.fileId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&height=200`;

          return (
            <Link
              key={index}
              href={`/gallery/${galleryId}/${image.$id}`}
              className="image-item"
            >
              <Image
                src={url}
                alt={image.title}
                title={image.title}
                width={scaledWidth}
                height={scaledHeight}
                className="rounded"
                quality={90}
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
              <p className="text-center">{image.title}</p>
            </Link>
          );
        })}
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage(page - 1)}
              className={
                page === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>
          {Array.from(
            { length: Math.ceil(images.total / imagesPerPage) },
            (_, i) => (
              <PaginationItem key={i + 1} onClick={() => setPage(i + 1)}>
                <Button variant="outline">{i + 1}</Button>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                page < Math.ceil(images.total / imagesPerPage) &&
                setPage(page + 1)
              }
              className={
                page === Math.ceil(images.total / imagesPerPage)
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
