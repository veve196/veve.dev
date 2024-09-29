"use client";

import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import updateBoop from "../utils/actions/updateBoop";
import "../styles/avatar.css";
import { Milestones } from "@/utils/models";
import React from "react";

export default function Avatar({
  milestones,
}: {
  milestones: Milestones.MilestoneType;
}) {
  const [showMessage, setShowMessage] = React.useState(false);
  const [msDoc, setMsDoc] = React.useState<
    Milestones.MilestoneDocument | undefined
  >();
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
        className="w-[200px] h-[200px] rounded-full mx-auto select-none border"
        onClick={handleClick}
      />
      {/* <Image
        width={200}
        height={200}
        src="/avatar.webp"
        alt="veve"
        title="Click me!"
        draggable={false}
        className="rounded-full mx-auto select-none border"
        priority
        onClick={handleClick}
      /> */}
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
