import GalleryToggleGroup from "@/components/gallery-toggle-group";
import { Galleries } from "@/utils/models";
import { getGalleries } from "@/server-api/gallery";

interface GalleryTemplateProps {
  children: React.ReactNode;
}

export default async function GalleryTemplate({
  children,
}: GalleryTemplateProps) {
  const galleries: Galleries.GalleryType = await getGalleries();

  return (
    <>
      <GalleryToggleGroup galleries={galleries} />
      <div className="mt-4">{children}</div>
    </>
  );
}
