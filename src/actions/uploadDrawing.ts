"use server";

import { databases, storage } from "@/app/appwrite-server";
import { ID, Query } from "node-appwrite";
import { Galleries } from "../utils/models";

export default async function uploadDrawing(drawing: Blob) {
  const file = new File([drawing], "drawing.png", { type: "image/png" });
  const response = await storage.createFile("drawings", ID.unique(), file);

  // const visitorGallery: Galleries.GalleryType = await databases.listDocuments(
  //   "web",
  //   "galleries",
  //   [Query.equal("$id", "visitordrawings"), Query.limit(1)]
  // );

  // await databases.createDocument("web", "images", ID.unique(), {
  //   fileId: response.$id,
  //   title: `#${visitorGallery.documents[0].images.length + 1}`,
  //   description: `Created by an anonymous user on ${new Date().toLocaleString()}`,
  //   galleries: ["visitordrawings"],
  // });
}
