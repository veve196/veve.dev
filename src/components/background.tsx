"use client";

import "@/styles/background.css";
import { useEffect } from "react";

export default function Background() {
  useEffect(() => {
    const stars = document.querySelectorAll(
      "[id^=stars-]"
    ) as NodeListOf<HTMLDivElement>;

    stars.forEach((star: HTMLDivElement) => {
      const [size, amount, speed] = star.id.split("-").slice(1).map(Number);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      let boxShadow = "";

      for (let i = 0; i < amount; i++) {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        boxShadow += `${x}vw ${y}vh hsl(var(--secondary)), `;
      }

      boxShadow = boxShadow.slice(0, -2);

      star.style.boxShadow = boxShadow.slice(0, -2);
      star.style.animation = `animStar ${speed}s linear infinite`;

      const afterRule = `
      #${star.id}::after {
        content: " ";
        position: absolute;
        top: 100vh;
        width: ${size}px;
        height: ${size}px;
        background: transparent;
        box-shadow: ${boxShadow};
      }
    `;

      document.styleSheets[0].insertRule(
        afterRule,
        document.styleSheets[0].cssRules.length
      );
    });
  }, []);

  return (
    <div id="background">
      <div id="stars-1-500-100"></div>
      <div id="stars-2-200-150"></div>
      <div id="stars-3-100-200"></div>
    </div>
  );
}
