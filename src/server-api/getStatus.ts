import { databases } from "@/app/appwrite-server";
import { Statuses } from "../utils/models";
import { Query } from "node-appwrite";
import { unstable_noStore } from "next/cache";

export async function getStatus(): Promise<Statuses.StatusDocument> {
  unstable_noStore();

  const date = new Date();
  const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
  const localISOTime = new Date(date.getTime() - tzOffset)
    .toISOString()
    .slice(0, -1); // remove the 'Z' at the end

  const documents: Statuses.StatusType = await databases.listDocuments(
    "web",
    "statuses",
    [
      Query.and([
        Query.or([
          Query.isNull("from"),
          Query.lessThanEqual("from", localISOTime),
        ]),
        Query.or([
          Query.isNull("to"),
          Query.greaterThanEqual("to", localISOTime),
        ]),
      ]),
      Query.limit(1),
      Query.orderDesc("from"),
    ]
  );

  return documents.documents[0];
}
