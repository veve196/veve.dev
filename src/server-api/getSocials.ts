"use server";

import { databases } from "@/app/appwrite-server";
import { Socials } from "../utils/models";
import { Query } from "node-appwrite";

export default async function getSocials(): Promise<Socials.SocialType> {
  return await databases.listDocuments("web", "socials", [
    Query.orderAsc("sortOrder"),
  ]);
}
