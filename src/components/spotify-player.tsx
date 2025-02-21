"use client";

import { Progress } from "@/components/ui/progress";
import { getSpotifyStatus } from "@/server-api/discord";
import { Discord } from "@/utils/models";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SpotifyPlayer() {
  const [spotifyStatus, setSpotifyStatus] =
    useState<Discord.SpotifyStatus | null>();
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

      if (data && data.endDate) {
        const remainingTime = new Date(data.endDate).getTime() - Date.now();
        const timer = setTimeout(() => {
          fetchSpotifyStatus();
        }, remainingTime + 1000);

        return () => clearTimeout(timer);
      }
    };

    fetchSpotifyStatus();
  }, []);

  useEffect(() => {
    if (spotifyStatus && spotifyStatus.startDate && spotifyStatus.endDate) {
      const updateProgress = () => {
        const songLength =
          new Date(spotifyStatus.endDate).getTime() -
          new Date(spotifyStatus.startDate).getTime();
        const startTime = new Date(spotifyStatus.startDate).getTime();
        const endTime = new Date(spotifyStatus.endDate).getTime();
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

  if (!spotifyStatus || spotifyStatus.title === undefined) {
    return null;
  }
  return (
    <>
      <div className="flex bg-background border-2 border-white rounded shadow-sm w-full sm:w-[32rem] mx-auto mt-8 fade-in">
        <Image
          src={spotifyStatus.coverUrl}
          alt="album cover"
          title={`${spotifyStatus.title} by ${spotifyStatus.artist}`}
          width={148}
          height={148}
          className="self-center"
        />
        <div className="flex-1 p-4 w-0">
          <p className="text-xs text-muted-foreground pb-2">listening to:</p>
          <h1 className="font-semibold truncate" title={spotifyStatus.title}>
            {spotifyStatus.title}
          </h1>
          <p
            className="text-muted-foreground truncate"
            title={spotifyStatus.artist}
          >
            {spotifyStatus.artist}
          </p>

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
