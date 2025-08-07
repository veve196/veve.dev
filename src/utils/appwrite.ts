import { Client, Databases, Functions, Storage } from "appwrite";

export const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_API_URL}/v1`)
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

export const databases: Databases = new Databases(client);
export const storage: Storage = new Storage(client);
export const functions: Functions = new Functions(client);
