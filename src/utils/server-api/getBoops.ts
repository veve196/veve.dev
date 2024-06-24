import { databases } from "@/app/appwrite-server";
import {unstable_noStore} from "next/cache";

export default async function getBoops() {
  unstable_noStore();
  return await databases.getDocument("web", "counters", "veveBoops");
}
