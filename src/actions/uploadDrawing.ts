"use server";

import { storage } from "@/app/appwrite-server";
import { ID } from "node-appwrite";

export default async function uploadDrawing(drawing: Blob) {
  const file = new File([drawing], "drawing.png", { type: "image/png" });
  const response = await storage.createFile("drawings", ID.unique(), file);
}
