"use client";

import { FayeVR } from "@/utils/models";
import { getSpotifyStatus } from "@/utils/server-api/getDiscordStatus";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";

export default function SpotifyPlayer() {
  const [spotifyStatus, setSpotifyStatus] =
    React.useState<FayeVR.Spotify | null>();

  useEffect(() => {
    getSpotifyStatus().then((data) => {
      setSpotifyStatus(data);
    });
  }, []);

  if (!spotifyStatus || spotifyStatus.song_name === undefined) {
    return null;
  }
  return (
    <>
      <div className="flex bg-background border-2 border-white rounded shadow w-full sm:w-[32rem] mx-auto mt-8">
        <img
          src={spotifyStatus.cover_url}
          alt="album cover"
          title={`${spotifyStatus.song_name} by ${spotifyStatus.artist}`}
          width={116}
          height={116}
          className="self-center"
        />
        <div className="flex-1 p-4">
          <p className="text-xs text-muted-foreground pb-2">listening to:</p>
          <h1 className="font-semibold">{spotifyStatus.song_name}</h1>
          <p className="text-muted-foreground">{spotifyStatus.artist}</p>
        </div>
      </div>
    </>
  );
}
