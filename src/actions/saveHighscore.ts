"use server";

import { databases } from "@/app/appwrite-server";
import { Query } from "node-appwrite";

// const response: Galleries.GalleryType = await databases.listDocuments(
//     "web",
//     "galleries",
//     [
//       Query.select(["$id", "title"]),
//       Query.orderAsc("sortOrder"),
//       Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
//       Query.limit(1),
//     ]
//   );

export default async function saveHighscore(
  name: string,
  highscore: number
): Promise<number> {
  const data = await databases.listDocuments("web", "highscores", [
    Query.equal("$id", name),
  ]);

  if (data.documents.length > 0) {
    if (data.documents[0].highscore < highscore) {
      const result = await databases.updateDocument(
        "web",
        "highscores",
        data.documents[0].$id,
        {
          highscore: highscore,
        }
      );
      return result.highscore;
    }
  } else {
    const result = await databases.createDocument("web", "highscores", name, {
      highscore: highscore,
    });
    return result.highscore;
  }
  return 0;
}
