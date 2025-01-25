"use client";
import "@/styles/typingAnimation.css";
import { useEffect, useState } from "react";

interface Props {
  texts: string[];
  typeSpeed?: number;
}

export default function TypingAnimation({ texts, typeSpeed = 150 }: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const timeout = setTimeout(
      () => {
        let updateText = displayedText;
        let updateCharIndex = charIndex;
        let updateTextIndex = textIndex;

        if (isDeleting) {
          updateText = displayedText.slice(0, -1);
          updateCharIndex--;
        } else {
          updateText = texts[textIndex].slice(0, charIndex + 1);
          updateCharIndex++;
        }

        setDisplayedText(updateText);
        setCharIndex(updateCharIndex);

        if (!isDeleting && updateText === texts[textIndex]) {
          if (textIndex !== texts.length - 1) {
            setTimeout(() => {
              setIsDeleting(true);
            }, 1000);
          } else {
            setAnimationCompleted(true);
          }
        } else if (isDeleting && updateText === "") {
          setIsDeleting(false);
          updateTextIndex = (textIndex + 1) % texts.length;
          setTextIndex(updateTextIndex);
          setCharIndex(0);
          if (textIndex === texts.length - 1) {
            return;
          }
          setAnimationCompleted(false);
        }
      },
      isDeleting ? typeSpeed / 2 : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayedText, textIndex, charIndex, isDeleting, texts, typeSpeed]);

  return (
    <span>
      {displayedText}
      {!animationCompleted && <span className="blinking-cursor">|</span>}
    </span>
  );
}
