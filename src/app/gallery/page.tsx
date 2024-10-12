import { Metadata } from "next/types";
import GalleryClient from "./page.client";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Gallery",
  description: "gallery of stuff i commissioned and so on!",
  openGraph: {
    title: "Gallery",
    description: "gallery of stuff i commissioned and so on!",
  },
};
export default function Gallery() {
  return <GalleryClient />;
}
