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

export async function generateMetadata(props: {
  params: Promise<{ imageId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { imageId } = params;

  const img = await getImage(imageId);

  const imgTitle = img != null ? img.title : "Some image!";
  const imgDescription =
    img != null ? img.description : "Can't load the description rn :[";

  return {
    title: imgTitle,
    description: imgDescription,
    openGraph: {
      title: imgTitle,
      description: imgDescription,
      images:
        img != null
          ? [
              {
                url: `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${img.fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`,
                alt: imgTitle,
              },
            ]
          : undefined,
    },
  };
}

export default async function Details(props: {
  params: Promise<{ imageId: string }>;
}) {
  const params = await props.params;
  const { imageId } = params;
  console.log(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/gallery/files/${imageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
  );
  const img = await getImage(imageId);
  const alts = await getAltImages(imageId);

  if (img == null)
    return (
      <div className="text-center text-2xl font-bold text-slate-200">
        Couldn&#39;t load image :&#91;
      </div>
    );

  return (
    <>
      <GalleryDetailImage image={img} />

      {alts && alts.documents.length > 0 && (
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
