"use client";

import { FayeVR } from "@/utils/models";
import { getSpotifyStatus } from "@/server-api/getDiscordStatus";
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

  useEffect(() => {
    if (!spotifyStatus || !spotifyStatus.ends_at) return;

    const remainingTime =
      new Date(spotifyStatus.ends_at).getTime() - Date.now();
    const timer = setTimeout(() => {
      getSpotifyStatus().then((data) => {
        setSpotifyStatus(data);
      });
    }, remainingTime + 1000);

    return () => clearTimeout(timer);
  }, [spotifyStatus]);

  if (!spotifyStatus || spotifyStatus.song_name === undefined) {
    return null;
  }
  return (
    <>
      <div className="flex bg-background border-2 border-white rounded shadow w-full sm:w-[32rem] mx-auto mt-8">
        <img
          src={spotifyStatus.cover_url}
          alt="album cover"
          title={`${
            spotifyStatus.song_name
          } by ${spotifyStatus.artist.replaceAll("; ", ", ")}`}
          width={116}
          height={116}
          className="self-center"
        />
        <div className="flex-1 p-4">
          <p className="text-xs text-muted-foreground pb-2">listening to:</p>
          <h1 className="font-semibold">{spotifyStatus.song_name}</h1>
          <p className="text-muted-foreground">
            {spotifyStatus.artist.replaceAll("; ", ", ")}
          </p>
        </div>
      </div>
    </>
  );
}
