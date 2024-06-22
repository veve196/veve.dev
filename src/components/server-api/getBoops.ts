import { databases } from "@/app/appwrite-server";

export default async function getBoops() {
  return await databases.getDocument("web", "counters", "veveBoops");
}
