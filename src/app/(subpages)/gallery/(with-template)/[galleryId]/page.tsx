import GalleryContent from "@/components/gallery-content";
import "@/styles/gallery.css";
import { Metadata } from "next/types";

export const runtime = "edge";

export async function generateMetadata(props: {
  params: Promise<{ galleryId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { galleryId } = params;

  return {
    title: galleryId,
  };
}

export default async function Gallery(props: {
  params: Promise<{ galleryId: string }>;
}) {
  const params = await props.params;
  const { galleryId } = params;

  return (
    <>
      <GalleryContent galleryId={galleryId} imagesPerPage={25} />
    </>
  );
}
