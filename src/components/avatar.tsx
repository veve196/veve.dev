"use client";

import Image from "next/image";
import updateBoop from "../utils/actions/updateBoop";

export default function Avatar() {
  const handleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    const text = document.createElement("span");

    const emojis = [
      "👉👈",
      "🥺",
      "💕",
      "💗",
      "🧡",
      "💦",
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

    const result = await updateBoop();
  };

  return (
    <Image
      width={200}
      height={200}
      src="/veve.png"
      alt="veve"
      title="Goober"
      draggable={false}
      className="rounded-full mx-auto select-none border"
      onClick={(e) => handleClick(e)}
    />
  );
}
