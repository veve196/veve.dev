import { Models } from "node-appwrite";

export interface CounterDocument extends Models.Document {
  count: number;
  previousCount?: number;
}

export interface StatusDocument extends Models.Document {
  status: string;
  from?: Date;
  to?: Date;
}

export interface StatusType {
  total: number;
  documents: StatusDocument[];
}

export interface GalleryDocument extends Models.Document {
  title: string;
  description?: string;
  isDefault?: boolean;
  images: ImageDocument[];
}

export interface GalleryType {
  total: number;
  documents: GalleryDocument[];
}

export interface ImageDocument extends Models.Document {
  fileId: string;
  parentId?: string;
  title: string;
  description?: string;
  artistUrl?: string;
  sortOrder?: number;
  isHidden?: boolean;
  width?: number;
  height?: number;
  mimeType?: string;
}

export interface ImageType {
  total: number;
  documents: ImageDocument[];
}

export interface MilestoneDocument extends Models.Document {
  milestone: number;
  title: string;
  description?: string;
}

export interface MilestoneType {
  total: number;
  documents: MilestoneDocument[];
}

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

export interface HighscoreDocument extends Models.Document {
  highscore: number;
}

export interface HighscoreType {
  total: number;
  documents: HighscoreDocument[];
}

export interface DiscordUser {
  id: string;
  avatarUrl: string;
  status: "online" | "idle" | "dnd" | "offline";
}

export interface SpotifyStatus {
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  startDate: Date;
  endDate: Date;
}
