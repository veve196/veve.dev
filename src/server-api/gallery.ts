"use server";

import { databases } from "@/app/appwrite-server";
import {
  GalleryDocument,
  GalleryType,
  ImageDocument,
  ImageType,
} from "@/utils/models";
import { Query } from "node-appwrite";

export async function getGalleriesWithImages(): Promise<GalleryType | null> {
  try {
    return await databases.listDocuments("web", "galleries", [
      Query.orderAsc("sortOrder"),
      Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
    ]);
  } catch {
    return null;
  }
}

export async function getGalleries(): Promise<GalleryType | null> {
  try {
    return await databases.listDocuments("web", "galleries", [
      Query.select(["$id", "title"]),
      Query.orderAsc("sortOrder"),
      Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
    ]);
  } catch {
    return null;
  }
}

export async function getDefaultGallery(): Promise<GalleryDocument | null> {
  try {
    const response: GalleryType = await databases.listDocuments(
      "web",
      "galleries",
      [
        Query.select(["$id", "title"]),
        Query.orderAsc("sortOrder"),
        Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
        Query.limit(1),
      ]
    );

    if (response.documents.length === 0) {
      throw new Error("No gallery found!");
    }

    return response.documents[0];
  } catch {
    return null;
  }
}

export async function getGallery(id: string): Promise<GalleryDocument | null> {
  try {
    return (await databases.getDocument(
      "web",
      "galleries",
      id
    )) as GalleryDocument;
  } catch {
    return null;
  }
}

export async function getGalleryImages(
  id: string,
  page: number,
  imagesPerPage: number
): Promise<ImageType | null> {
  try {
    return await databases.listDocuments("web", "images", [
      Query.equal("galleryId", id),
      Query.or([Query.isNull("parentId"), Query.equal("parentId", "")]),
      Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
      Query.limit(imagesPerPage),
      Query.offset((page - 1) * imagesPerPage),
      Query.orderAsc("sortOrder"),
      Query.orderDesc("$createdAt"),
    ]);
  } catch {
    return null;
  }
}

export async function getImage(id: string): Promise<ImageDocument | null> {
  try {
    return (await databases.getDocument("web", "images", id)) as ImageDocument;
  } catch {
    return null;
  }
}

export async function getAltImages(id: string): Promise<ImageType | null> {
  try {
    return await databases.listDocuments("web", "images", [
      Query.equal("parentId", id),
      Query.orderAsc("sortOrder"),
    ]);
  } catch {
    return null;
  }
}
