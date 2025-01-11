import GalleryDetailImage from "@/components/gallery-detail-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { getAltImages, getImage } from "@/server-api/gallery";
import "@/styles/details.css";
import { Metadata } from "next/types";

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

  return (
    <>
      <GalleryDetailImage image={img} />

      {alts.documents.length > 0 && (
        <>
          <Separator className="mt-8" />
          <Accordion type="multiple" defaultValue={["alts"]}>
            <AccordionItem value="alts" className="border-none">
              <AccordionTrigger>Alt versions</AccordionTrigger>
              <AccordionContent>
                {alts.documents.map((image, index) => (
                  <GalleryDetailImage key={index} image={image} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </>
  );
}
