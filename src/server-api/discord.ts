"use server";

import { Discord } from "@/utils/models";

export async function getDiscordUser(): Promise<Discord.User> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VEVE_API_URL}/Discord/${process.env.NEXT_PUBLIC_DISCORD_MEMBER_ID}`,
    {
      headers: {
        "x-api-key": `${process.env.VEVE_API_KEY}`,
      },
    }
  ).then((res) => res.json());
}

export async function getSpotifyStatus(): Promise<Discord.SpotifyStatus | null> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VEVE_API_URL}/Discord/Spotify/${process.env.NEXT_PUBLIC_DISCORD_MEMBER_ID}`,
    {
      headers: {
        "x-api-key": `${process.env.VEVE_API_KEY}`,
      },
    }
  ).then((res) => res.json());
}
