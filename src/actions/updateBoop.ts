"use server";

import { databases } from "@/utils/appwrite-server";

export default async function updateBoop(): Promise<number> {
  const data = await databases.getDocument("web", "counters", "veveBoops");
  const result = await databases.updateDocument(
    "web",
    "counters",
    "veveBoops",
    {
      count: data.count + 1,
    }
  );
  return result.count;
}
