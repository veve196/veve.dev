"use client";

import { databases } from "@/app/appwrite";

export default async function getBoops(): Promise<number> {
  const result = await databases.getDocument("web", "counters", "veveBoops");
  return result.count;
}
