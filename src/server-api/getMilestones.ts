"use server";

import { databases } from "@/app/appwrite-server";
import { MilestoneType } from "@/utils/models";

export default async function getMilestones(): Promise<MilestoneType> {
  return await databases.listDocuments("web", "milestones");
}
