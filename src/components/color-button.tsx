"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  copyColor: string;
  textColor?: string;
}

export default function ColorButton({ copyColor, textColor }: Props) {
  const handleOnClick = () => {
    navigator.clipboard
      .writeText(copyColor)
      .then(() => toast("✔️ Copied!"))
      .catch(() => {
        toast(`❌ Failed to copy color code: ${copyColor}`);
      });
  };

  return (
    <Button
      style={{
        backgroundColor: copyColor,
        color: textColor || "white",
      }}
      className="me-2 mb-2 border"
      title="Click to copy!"
      onClick={handleOnClick}
    >
      {copyColor}
    </Button>
  );
}
