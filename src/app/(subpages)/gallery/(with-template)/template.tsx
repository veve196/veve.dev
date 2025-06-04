import ImageListToggle from "@/components/gallery/image-list-toggle";
import { getGalleries } from "@/server-api/gallery";

interface GalleryTemplateProps {
  children: React.ReactNode;
}

export default async function GalleryTemplate({
  children,
}: GalleryTemplateProps) {
  const galleries = await getGalleries();

  return (
    <>
      {galleries && <ImageListToggle galleries={galleries} />}
      <div className="mt-4">{children}</div>
    </>
  );
}
