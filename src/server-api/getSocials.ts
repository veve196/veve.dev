"use server";

import { databases } from "@/utils/appwrite-server";
import { SocialType } from "@/utils/models";
import { Query } from "node-appwrite";

export default async function getSocials(): Promise<SocialType | null> {
  try {
    return await databases.listDocuments("web", "socials", [
      Query.orderAsc("sortOrder"),
    ]);
  } catch {
    return null;
  }
}
