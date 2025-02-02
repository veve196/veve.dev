"use client";

import { Progress } from "@/components/ui/progress";
import { getSpotifyStatus } from "@/server-api/getDiscordStatus";
import { FayeVR } from "@/utils/models";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SpotifyPlayer() {
  const [spotifyStatus, setSpotifyStatus] = useState<FayeVR.Spotify | null>();
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const fetchSpotifyStatus = async () => {
      const data = await getSpotifyStatus();

      if (data && data.artist) {
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
        const songLength =
          new Date(spotifyStatus.ends_at).getTime() -
          new Date(spotifyStatus.started_at).getTime();
        const startTime = new Date(spotifyStatus.started_at).getTime();
        const endTime = new Date(spotifyStatus.ends_at).getTime();
        const elapsedTime = Date.now() - startTime;
        const remainingTime = endTime - Date.now();
        const progressPercentage = (elapsedTime / (endTime - startTime)) * 100;
        setProgress(progressPercentage);
        setElapsedTime(elapsedTime > songLength ? songLength : elapsedTime);
        setRemainingTime(remainingTime < 0 ? 0 : remainingTime);
      };

      const interval = setInterval(updateProgress, 1000);
      updateProgress();

      return () => clearInterval(interval);
    }
  }, [spotifyStatus]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!spotifyStatus || spotifyStatus.song_name === undefined) {
    return null;
  }
  return (
    <>
      <div className="flex bg-background border-2 border-white rounded shadow-sm w-full sm:w-[32rem] mx-auto mt-8">
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

          <div className="flex gap-2 items-center mt-4">
            <p className="text-xs text-muted-foreground">
              {formatTime(elapsedTime)}
            </p>
            <Progress value={progress} className="h-2 grow mt-0" />
            <p className="text-xs text-muted-foreground">
              -{formatTime(remainingTime)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
