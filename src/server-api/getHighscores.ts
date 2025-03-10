"use server";

import { databases } from "@/app/appwrite-server";
import { HighscoreType } from "@/utils/models";
import { Query } from "node-appwrite";

export default async function getSocials(): Promise<HighscoreType> {
  return await databases.listDocuments("web", "highscores", [
    Query.orderDesc("highscore"),
  ]);
}
