"use server";

import { databases } from "@/app/appwrite-server";
import { Galleries, Images } from "@/utils/models";
import { Query } from "node-appwrite";

export async function getGalleriesWithImages(): Promise<Galleries.GalleryType> {
  return await databases.listDocuments("web", "galleries", [
    Query.orderAsc("sortOrder"),
    Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
  ]);
}

export async function getGalleries(): Promise<Galleries.GalleryType> {
  return await databases.listDocuments("web", "galleries", [
    Query.select(["$id", "title"]),
    Query.orderAsc("sortOrder"),
    Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
  ]);
}

export async function getDefaultGallery(): Promise<Galleries.GalleryDocument> {
  const response: Galleries.GalleryType = await databases.listDocuments(
    "web",
    "galleries",
    [
      Query.select(["$id", "title"]),
      Query.orderAsc("sortOrder"),
      Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
      Query.limit(1),
    ]
  );

  return response.documents[0];
}

export async function getGallery(
  id: string
): Promise<Galleries.GalleryDocument> {
  return await databases.getDocument("web", "galleries", id);
}

export async function getGalleryImages(
  id: string,
  page: number,
  imagesPerPage: number
): Promise<Images.ImageType> {
  return await databases.listDocuments("web", "images", [
    Query.equal("galleryId", id),
    Query.or([Query.isNull("parentId"), Query.equal("parentId", "")]),
    Query.or([Query.isNull("isHidden"), Query.equal("isHidden", false)]),
    Query.limit(imagesPerPage),
    Query.offset((page - 1) * imagesPerPage),
    Query.orderAsc("sortOrder"),
    Query.orderDesc("$createdAt"),
  ]);
}

export async function getImage(id: string): Promise<Images.ImageDocument> {
  return await databases.getDocument("web", "images", id);
}

export async function getAltImages(id: string): Promise<Images.ImageType> {
  return await databases.listDocuments("web", "images", [
    Query.equal("parentId", id),
    Query.orderAsc("sortOrder"),
  ]);
}
