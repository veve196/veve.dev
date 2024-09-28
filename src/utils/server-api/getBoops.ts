"use server";

import { databases } from "@/app/appwrite-server";
import { unstable_noStore } from "next/cache";

export default async function getBoops(): Promise<number> {
  unstable_noStore();
  const result = await databases.getDocument("web", "counters", "veveBoops");
  return result.count;
}
