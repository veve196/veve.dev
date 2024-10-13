import { Models } from "node-appwrite";
export namespace Statuses {
  export interface StatusDocument extends Models.Document {
    status: string;
    from?: Date;
    to?: Date;
  }

  export interface StatusType {
    total: number;
    documents: StatusDocument[];
  }
}

export namespace Galleries {
  export interface GalleryDocument extends Models.Document {
    title: string;
    description?: string;
    isDefault?: boolean;
    images: Images.ImageDocument[];
  }

  export interface GalleryType {
    total: number;
    documents: GalleryDocument[];
  }
}

export namespace Images {
  export interface ImageDocument extends Models.Document {
    fileId: string;
    parentId?: string;
    title: string;
    description?: string;
    artistUrl?: string;
    sortOrder?: number;
    isHidden?: boolean;
  }

  export interface ImageType {
    total: number;
    documents: ImageDocument[];
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
