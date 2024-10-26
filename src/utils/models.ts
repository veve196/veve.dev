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

export namespace Socials {
  export interface SocialDocument extends Models.Document {
    url: string;
    title: string;
    tooltip?: string;
    sortOrder?: number;
  }

  export interface SocialType {
    total: number;
    documents: SocialDocument[];
  }
}

export namespace FayeVR {
  export interface DiscordStatus {
    status: "online" | "idle" | "dnd" | "offline";
    activities_raw: ActivitiesRaw[];
    activities_simplified: ActivitiesSimplified[];
    spotify: Spotify;
  }

  export interface ActivitiesRaw {
    name: string;
    type: number;
    url: any;
    details?: string;
    state?: string;
    applicationId?: string;
    timestamps?: Timestamps;
    party?: Party;
    syncId?: string;
    assets?: Assets;
    flags: number;
    emoji?: Emoji;
    buttons: any[];
    createdTimestamp: number;
  }

  export interface Timestamps {
    start: string;
    end?: string;
  }

  export interface Party {
    id?: string;
  }

  export interface Assets {
    largeText: string;
    smallText?: string;
    largeImage: string;
    smallImage?: string;
  }

  export interface Emoji {
    animated: boolean;
    name: string;
    id: string;
    createdTimestamp: number;
    identifier: string;
    imageURL: string;
  }

  export interface ActivitiesSimplified {
    name: string;
    type: number;
    state?: string;
    details?: string;
    url: any;
    timestamps?: Timestamps;
    assets?: Assets;
    party?: Party;
    flags: number;
  }

  export interface Spotify {
    song_name: string;
    artist: string;
    album: string;
    cover_url: string;
    started_at: string;
    ends_at: string;
  }
}
