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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getGalleryImages(galleryId, page, imagesPerPage).then((images) => {
      setImages(images);
      setLoading(false);
    });
  }, [page]);

  if (!images || loading) return <LoadingSpinner className="mx-auto" />;

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center">
        {images.documents.map((image, index) => {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${image.fileId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&height=200`;

          return (
            <Link
              key={index}
              href={`/gallery/${galleryId}/${image.$id}`}
              className="image-item"
            >
              <img
                src={url}
                alt={image.title}
                title={image.title}
                className="rounded"
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
