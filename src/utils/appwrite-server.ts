import { Client, Databases, Functions, Storage } from "node-appwrite";

export const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_API_URL}/v1`)
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`)
  .setKey(`${process.env.APPWRITE_API_KEY}`);

export const databases: Databases = new Databases(client);
export const storage: Storage = new Storage(client);
export const functions: Functions = new Functions(client);
