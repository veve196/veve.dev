import ImageList from "@/components/gallery/image-list";
import { getGallery } from "@/server-api/gallery";
import "@/styles/gallery.css";
import { Metadata } from "next/types";

export async function generateMetadata(props: {
  params: Promise<{ galleryId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { galleryId } = params;

  const gallery = await getGallery(galleryId);

  const gTitle = gallery?.title ?? "My Gallery!";
  const gDescription = gallery?.description ?? "Welcome to my gallery!";

  return {
    title: gTitle,
    description: gDescription,
    openGraph: {
      title: gTitle,
      description: gDescription,
    },
  };
}

export default async function Gallery(props: {
  params: Promise<{ galleryId: string }>;
}) {
  const params = await props.params;
  const { galleryId } = params;
  const gallery = await getGallery(galleryId);

  return (
    <>
      <div
        className="text-center mb-4 gallery-description"
        dangerouslySetInnerHTML={{
          __html: gallery?.description || "",
        }}
      />
      <ImageList galleryId={galleryId} imagesPerPage={25} />
    </>
  );
}
