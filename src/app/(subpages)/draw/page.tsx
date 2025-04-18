import DrawingCanvas from "@/components/drawing-canvas";
import GalleryContent from "@/components/gallery-content";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Draw something!",
  description: "i dare u",
  openGraph: {
    title: "Draw something!",
    description: "i dare u",
  },
};
export default async function Draw() {
  return (
    <>
      <h1 className="text-center">
        Draw something <b>anonymously</b> for me to see! :3
      </h1>
      <p className="text-center text-destructive my-2">kinda wip!</p>
      <DrawingCanvas />
      <div className="text-center mt-12">
        <h1 className="text-4xl mb-8">Thank you for these!💙</h1>
        <GalleryContent
          galleryId="yourdrawings"
          imagesPerPage={Number.MAX_SAFE_INTEGER}
        />
      </div>
    </>
  );
}
