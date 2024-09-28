import { databases } from "@/app/appwrite-server";
import { Gallery } from "../models";

export default async function getGalleryItem(
  galleryId: string
): Promise<Gallery.GalleryDocument> {
  return await databases.getDocument("web", "gallery", galleryId);
}
