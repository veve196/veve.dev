import { databases } from "@/app/appwrite-server";
import { Gallery } from "../models";

export default async function getGallery(): Promise<Gallery.GalleryType> {
  return await databases.listDocuments("web", "gallery");
}
