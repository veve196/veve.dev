"use server";

import { FayeVR } from "../models";

export default async function getDiscordStatus(): Promise<FayeVR.DiscordStatus> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_DISCORD_API_URL}/getstatus?member=${process.env.NEXT_PUBLIC_DISCORD_MEMBER_ID}`
  ).then((res) => res.json());
}
