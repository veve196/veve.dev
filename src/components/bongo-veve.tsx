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
<<<<<<< HEAD
    const handleWindowMouseDown = (e: MouseEvent) => {
=======
    const handleWindowMouseDown = () => {
>>>>>>> e0ffd082de60863df2f1395d7c6c5565ec787a4e
      setImageSrc("/bongo-veve/bongo-veve-02.webp");
    };

<<<<<<< HEAD
    const handleWindowMouseUp = (e: MouseEvent) => {
=======
    const handleWindowMouseUp = () => {
>>>>>>> e0ffd082de60863df2f1395d7c6c5565ec787a4e
      setImageSrc("/bongo-veve/bongo-veve-01.webp");
    };

    window.addEventListener("mousedown", handleWindowMouseDown);
    window.addEventListener("mouseup", handleWindowMouseUp);

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
