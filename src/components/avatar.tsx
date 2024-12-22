"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { FayeVR, Milestones } from "@/models";
import getDiscordStatus from "@/server-api/getDiscordStatus";
import React, { useEffect } from "react";
import updateBoop from "../actions/updateBoop";
import "../styles/avatar.css";

export default function Avatar({
  milestones,
}: {
  milestones: Milestones.MilestoneType;
}) {
  const [showMessage, setShowMessage] = React.useState(false);
  const [msDoc, setMsDoc] = React.useState<
    Milestones.MilestoneDocument | undefined
  >();
  const [dcStatus, setDcStatus] = React.useState<
    FayeVR.DiscordStatus | undefined
  >();

  useEffect(() => {
    getDiscordStatus().then((status) => {
      setDcStatus(status);
    });

    // Preload image to avoid flickering on hover
    const img = new Image();
    img.src = "/avatar_blushies.webp";
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    const text = document.createElement("span");

    const emojis = [
      "👉👈",
      "🥺",
      "💕",
      "💗",
      "🧡",
      "💦",
      "🍆",
      "💙",
      "💘",
      "💓",
      "💖",
      "💚",
      "💛",
      "💜",
      "💝",
      "💞",
      "💟",
      "🖤",
      "🤍",
      "🤎",
      "💌",
      "💢",
      "💫",
      "💤",
      "💥",
      "🔥",
      "🔫",
      "i'm trying to reach you about your car's extended warranty",
    ];

    text.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    text.className = "fade-away";
    text.style.left = `${e.pageX}px`;
    text.style.top = `${e.pageY - 40}px`; // Bisschen höher setzen weil der Daumen sonst verdeckt
    document.body.appendChild(text);

    setTimeout(() => {
      document.body.removeChild(text);
    }, 2000);

    const curBoop = await updateBoop();
    const msTempDoc = milestones.documents.find(
      (doc) => doc.milestone === curBoop
    );

    if (msTempDoc) {
      setShowMessage(true);
      setMsDoc(msTempDoc);
    }
  };

  return (
    <>
      <div
        id="avatar"
        className={`w-[200px] h-[200px] rounded-full mx-auto select-none relative cursor-pointer ${
          dcStatus ? `status-${dcStatus.status} border-4` : ""
        }`}
        onClick={handleClick}
        title="Boop me!"
      >
        {dcStatus && (
          <div
            className={`w-[32px] h-[32px] rounded-full border-2 border-transparent absolute bottom-3 right-3 status-${dcStatus.status}`}
            title={`${dcStatus.status}`}
          />
        )}
      </div>
      <AlertDialog open={showMessage} onOpenChange={setShowMessage}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{msDoc?.title}</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <div
              dangerouslySetInnerHTML={{
                __html: msDoc?.description || "",
              }}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
