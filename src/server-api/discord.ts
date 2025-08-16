"use server";

import { DiscordUser, SpotifyStatus } from "@/utils/models";

export async function getDiscordUser(): Promise<DiscordUser | null> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VEVE_API_URL}/Discord/Users/${process.env.NEXT_PUBLIC_DISCORD_MEMBER_ID}`,
    {
      headers: {
        "x-api-key": `${process.env.VEVE_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}

export async function getSpotifyStatus(): Promise<SpotifyStatus | null> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VEVE_API_URL}/Discord/Users/${process.env.NEXT_PUBLIC_DISCORD_MEMBER_ID}/Spotify`,
    {
      headers: {
        "x-api-key": `${process.env.VEVE_API_KEY}`,
      },
    }
  ).then((response) => {
    console.log(response);
    if (!response.ok) return null;
    return response.json();
  });
}
