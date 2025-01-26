"use server";

import { databases } from "@/app/appwrite-server";

export default async function getBoops(): Promise<number> {
  const result = await databases.getDocument("web", "counters", "veveBoops");
  return result.count;
}
