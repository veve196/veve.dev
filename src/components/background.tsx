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

    // Shooting star
    function randomBetween(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function createShootingStar() {
      const star = document.createElement("div");
      star.className = "shooting-star";

      let startX, startY, tx, ty;

      if (Math.random() < 0.5) {
        startX = -100;
        startY = randomBetween(
          window.innerHeight * 0.1,
          window.innerHeight * 0.9
        );
        const angle = randomBetween(-20, 20);
        const distance = window.innerWidth + 200;
        const rad = angle * (Math.PI / 180);
        tx = Math.cos(rad) * distance;
        ty = Math.sin(rad) * distance;
      } else {
        startX = randomBetween(
          window.innerWidth * 0.1,
          window.innerWidth * 0.9
        );
        startY = -100;

        const angle = randomBetween(70, 110);
        const distance = window.innerHeight + 200;

        const rad = angle * (Math.PI / 180);
        tx = Math.cos(rad) * distance;
        ty = Math.sin(rad) * distance;
      }

      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      star.style.setProperty("--tx", `${tx}px`);
      star.style.setProperty("--ty", `${ty}px`);
      star.style.animation = `shooting-star 1.5s linear forwards`;
      star.style.animationDelay = `${randomBetween(0, 1)}s`;

      document.getElementById("background")?.appendChild(star);

      star.addEventListener("animationend", () => {
        star.remove();
      });
    }

    const interval = setInterval(
      createShootingStar,
      randomBetween(10000, 15000)
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="background">
      <div id="stars-1-500-100"></div>
      <div id="stars-2-200-150"></div>
      <div id="stars-3-100-200"></div>
    </div>
  );
}
