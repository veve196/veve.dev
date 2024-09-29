import { databases } from "@/app/appwrite-server";
import { Gallery } from "../models";
import { Query } from "node-appwrite";

export default async function getGallery(): Promise<Gallery.GalleryType> {
  return await databases.listDocuments("web", "gallery", [
    Query.orderAsc("sortOrder"),
    Query.limit(100),
  ]);
}
