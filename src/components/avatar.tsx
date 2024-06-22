"use client";

import Image from "next/image";
import updateBoop from "./actions/updateBoop";

export default function Avatar() {
  const handleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    const text = document.createElement("span");

    const emojis = [
      "👉👈",
      "🥺",
      "❤",
      "💕",
      "💗",
      "🧡",
      "❣",
      "💦",
      "💙",
      "💘",
      "💓",
      "im trying to reach you about your car's extended warranty",
    ];

    text.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    text.className = "fade-away";
    text.style.left = `${e.pageX}px`;
    text.style.top = `${e.pageY}px`;
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
      className="rounded-full mx-auto select-none"
      onClick={(e) => handleClick(e)}
    />
  );
}
