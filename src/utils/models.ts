import { Models } from "node-appwrite";
export namespace Gallery {
  export interface GalleryDocument extends Models.Document {
    fileId: string;
    displayName: string;
    description: string | null;
    artist: string | null;
    sortOrder: number | null;
  }

  export interface GalleryType {
    total: number;
    documents: GalleryDocument[];
  }
}
