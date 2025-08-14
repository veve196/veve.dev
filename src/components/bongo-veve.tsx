"use client";

import { cn } from "@/lib/utils";
import "@/styles/bongo-veve.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BongoVeveProps {
  className?: string;
}

export default function BongoVeve({ className }: BongoVeveProps) {
  const [imageSrc, setImageSrc] = useState("/bongo-veve/bongo-veve-01.webp");
  const [speechBubbleText, setSpeechBubbleText] = useState<string | null>(null);

  const speechBubbleTexts = ["Hello!", "Meow!", "Yip!"];

  useEffect(() => {
    const handleWindowMouseDown = (e: MouseEvent) => {
      console.log("bongo-veve down");
      setImageSrc("/bongo-veve/bongo-veve-02.webp");
    }

    const handleWindowMouseUp = (e: MouseEvent) => {
      console.log("bongo veve up");
      setImageSrc("/bongo-veve/bongo-veve-01.webp");
    }

    window.addEventListener("mousedown", handleWindowMouseDown)
    window.addEventListener("mouseup", handleWindowMouseUp)

    return () => {
      window.removeEventListener("mousedown", handleWindowMouseDown);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, []);

  const handleImageClick = () => {
    if (speechBubbleText != null) return;

    const randomIndex = Math.floor(Math.random() * speechBubbleTexts.length);
    setSpeechBubbleText(speechBubbleTexts[randomIndex]);

    setTimeout(() => {
      setSpeechBubbleText(null);
    }, 2000);
  };

  return (
    <div className={`${cn(className)}`}>
      {speechBubbleText && (
        <span className="speech-bubble">{speechBubbleText}</span>
      )}
      <Image
        src={imageSrc}
        alt="veve"
        width={128}
        height={74}
        onClick={handleImageClick}
        className="bongo-idle"
      />
    </div>
  );
}
