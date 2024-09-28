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
export namespace Milestones {
  export interface MilestoneDocument extends Models.Document {
    milestone: number;
    message: string;
  }

  export interface MilestoneType {
    total: number;
    documents: MilestoneDocument[];
  }
}
