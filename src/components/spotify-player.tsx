"use client";

import { getSpotifyStatus } from "@/server-api/getDiscordStatus";
import { FayeVR } from "@/utils/models";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function SpotifyPlayer() {
  const [spotifyStatus, setSpotifyStatus] = useState<FayeVR.Spotify | null>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchSpotifyStatus = async () => {
      const data = await getSpotifyStatus();

      if (data) {
        data.artist = data.artist.replaceAll(";", ", ");
      }

      setSpotifyStatus(data);

      if (data && data.ends_at) {
        const remainingTime = new Date(data.ends_at).getTime() - Date.now();
        const timer = setTimeout(() => {
          fetchSpotifyStatus();
        }, remainingTime + 1000);

        return () => clearTimeout(timer);
      }
    };

    fetchSpotifyStatus();
  }, []);

  useEffect(() => {
    if (spotifyStatus && spotifyStatus.started_at && spotifyStatus.ends_at) {
      const updateProgress = () => {
        const currentTime = Date.now();
        const startTime = new Date(spotifyStatus.started_at).getTime();
        const endTime = new Date(spotifyStatus.ends_at).getTime();
        const progressPercentage =
          ((currentTime - startTime) / (endTime - startTime)) * 100;
        setProgress(progressPercentage);
      };

      const interval = setInterval(updateProgress, 1000);
      updateProgress(); // Initial call to set the progress immediately

      return () => clearInterval(interval);
    }
  }, [spotifyStatus]);

  if (!spotifyStatus || spotifyStatus.song_name === undefined) {
    return null;
  }
  return (
    <>
      <div className="flex bg-background border-2 border-white rounded shadow w-full sm:w-[32rem] mx-auto mt-8">
        <Image
          src={spotifyStatus.cover_url}
          alt="album cover"
          title={`${spotifyStatus.song_name} by ${spotifyStatus.artist}`}
          width={148}
          height={148}
          className="self-center"
        />
        <div className="flex-1 p-4">
          <p className="text-xs text-muted-foreground pb-2">listening to:</p>
          <h1 className="font-semibold">{spotifyStatus.song_name}</h1>
          <p className="text-muted-foreground">{spotifyStatus.artist}</p>
          <Progress value={progress} className="mt-4" />
        </div>
      </div>
    </>
  );
}
