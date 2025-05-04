"use client";

import { Progress } from "@/components/ui/progress";
import { getSpotifyStatus } from "@/server-api/discord";
import { SpotifyStatus } from "@/utils/models";
import Image from "next/image";
import { useEffect, useState } from "react";
import "@/styles/spotify-player.css";

export default function SpotifyPlayer() {
  const [spotifyStatus, setSpotifyStatus] = useState<SpotifyStatus | null>();
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (spotifyStatus && spotifyStatus.title) {
      setIsVisible(true);
    }
  }, [spotifyStatus]);

  useEffect(() => {
    const fetchSpotifyStatus = async () => {
      const data = await getSpotifyStatus();

      setSpotifyStatus(data);
      if (!data) return;
      if (data.artist) {
        data.artist = data.artist.replaceAll(";", ", ");
      }
      if (data.endDate) {
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
    <div
      className={`relative border-2 border-white rounded shadow-sm w-full sm:w-[32rem] mx-auto mt-8 overflow-hidden ${
        isVisible ? "spotify-player-animate" : ""
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center -z-10 blur-sm animated-background"
        style={{
          backgroundImage: `url(${spotifyStatus.coverUrl})`,
        }}
      ></div>
      <div className="flex">
        <Image
          src={spotifyStatus.coverUrl}
          alt="album cover"
          title={`${spotifyStatus.title} by ${spotifyStatus.artist}`}
          width={148}
          height={148}
          className="self-center"
        />
        <div className="relative flex-1 p-4 w-0 bg-background/70">
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
    </div>
  );
}
