"use client";

import updateBoop from "@/actions/updateBoop";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getDiscordUser } from "@/server-api/discord";
import getMilestones from "@/server-api/getMilestones";
import "@/styles/avatar.css";
import { DiscordUser, MilestoneDocument, MilestoneType } from "@/utils/models";
import React, { useEffect, useState } from "react";

export default function Avatar() {
  const [showMessage, setShowMessage] = useState(false);
  const [milestones, setMilestones] = useState<MilestoneType | null>(null);
  const [msDoc, setMsDoc] = useState<MilestoneDocument | null>(null);
  const [dcUser, setDcUser] = useState<DiscordUser | null>(null);

  useEffect(() => {
    getMilestones().then((milestones) => {
      setMilestones(milestones);
    });

    getDiscordUser().then((user) => {
      setDcUser(user);
    });
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
      "🛹",
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

    if (!milestones) return;

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
      {/* Hidden preloader for avatar-blushies.webp */}
      <div
        className="hidden w-0 h-0 overflow-hidden absolute bg-[url('/avatar-blushies.webp')]"
        aria-hidden="true"
      />
      <div
        id="avatar"
        className={`w-[200px] h-[200px] rounded-full mx-auto select-none relative cursor-pointer ${
          dcUser ? `status-${dcUser.status} border-4` : ""
        }`}
        onClick={handleClick}
        title="Boop me!"
      >
        {dcUser && (
          <div
            className={`w-[32px] h-[32px] rounded-full border-2 border-transparent absolute bottom-3 right-3 status-${dcUser.status}`}
            title={`${dcUser.status}`}
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
