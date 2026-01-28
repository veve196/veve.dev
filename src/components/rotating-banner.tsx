"use client";
import { useState } from "react";

export default function RotatingBanner({
  message = "appwrite wants money from me to show (and transform) the preview pics, they wont get a dollar from me",
}: {
  message?: string;
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="rotating-banner"
      onClick={() => setVisible(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setVisible(false);
      }}
      aria-label="Dismiss banner"
    >
      <span className="rotating-banner__text">{message}</span>
    </div>
  );
}
