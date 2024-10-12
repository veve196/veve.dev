"use server";

import { databases } from "@/app/appwrite-server";
import { Galleries } from "../models";
import { Query } from "node-appwrite";

export default async function getGalleries(): Promise<Galleries.GalleryType> {
  return await databases.listDocuments("web", "galleries", [
    Query.orderAsc("sortOrder"),
  ]);
}
