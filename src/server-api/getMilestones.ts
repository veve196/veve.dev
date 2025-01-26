"use server";

import { databases } from "@/app/appwrite-server";
import { Milestones } from "@/utils/models";

export default async function getMilestones(): Promise<Milestones.MilestoneType> {
  return await databases.listDocuments("web", "milestones");
}
