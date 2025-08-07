"use server";

import { databases } from "@/utils/appwrite-server";
import { MilestoneType } from "@/utils/models";

export default async function getMilestones(): Promise<MilestoneType | null> {
  try {
    return await databases.listDocuments("web", "milestones");
  } catch {
    return null;
  }
}
