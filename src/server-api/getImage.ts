import { databases } from "@/app/appwrite-server";
import { Images } from "../models";
import { Query } from "node-appwrite";

export default async function getImage(
  id: string
): Promise<Images.ImageDocument> {
  return await databases.getDocument("web", "images", id);
}

export async function getAltImages(id: string): Promise<Images.ImageType> {
  return await databases.listDocuments("web", "images", [
    Query.equal("parentId", id),
    Query.orderAsc("sortOrder"),
  ]);
}
