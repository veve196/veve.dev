"use server";

import { databases } from "@/app/appwrite-server";
import { unstable_noStore } from "next/cache";
import { Milestones } from "../models";

export default async function getMilestones(): Promise<Milestones.MilestoneType> {
  unstable_noStore();
  return await databases.listDocuments("web", "milestones");
}
