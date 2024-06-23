"use server";

import { databases } from "@/app/appwrite-server";

export default async function updateBoop() {
  const data = await databases.getDocument("web", "counters", "veveBoops");
  return await databases.updateDocument("web", "counters", "veveBoops", {
    count: data.count + 1,
  });
}
