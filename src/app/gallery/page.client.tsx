"use client";

import getGalleries from "@/utils/server-api/getGalleries";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Galleries } from "@/utils/models";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function GalleryClient() {
  const [galleries, setGallieries] = useState<Galleries.GalleryType | null>(
    null
  );
  const [curGalleryId, setCurGalleryId] = useState<string | null>(null);

  useEffect(() => {
    getGalleries().then((galleries) => {
      setGallieries(galleries);

      const galleryId = sessionStorage.getItem("galleryId");

      setCurGalleryId(galleryId || galleries.documents[0].$id);
    });
  }, []);

  useEffect(() => {
    if (curGalleryId) sessionStorage.setItem("galleryId", curGalleryId);
  }, [curGalleryId]);

  const handleTabClick = (galleryId: string) => {
    setCurGalleryId(galleryId);
  };

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
      {(!galleries || !curGalleryId) && <LoadingSpinner className="mx-auto" />}
      {galleries && curGalleryId && (
        <Tabs defaultValue={curGalleryId} className="text-center">
          <TabsList>
            {galleries.documents.map((gallery) => (
              <TabsTrigger
                key={gallery.$id}
                value={gallery.$id}
                className="w-32"
                onClick={() => handleTabClick(gallery.$id)}
              >
                {gallery.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {galleries.documents.map((gallery) => (
            <TabsContent key={gallery.$id} value={gallery.$id}>
              <p className="my-4">{gallery.description}</p>

              <div className="flex gap-4 flex-wrap justify-center">
                {gallery.images
                  .filter((image) => !image.parentId && !image.isHidden)
                  .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999))
                  .map((image) => {
                    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${image.fileId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&height=400`;
                    return (
                      <Link key={image.$id} href={`/gallery/${image.$id}`}>
                        <div className="mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={image.title}
                            title={image.title}
                            className="rounded-md h-[200px]"
                          />
                          <p className="text-center">{image.title}</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
  );
}
