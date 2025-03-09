"use server";

import { databases } from "@/app/appwrite-server";
import { SocialType } from "../utils/models";
import { Query } from "node-appwrite";

export default async function getSocials(): Promise<SocialType> {
  return await databases.listDocuments("web", "socials", [
    Query.orderAsc("sortOrder"),
  ]);
}
