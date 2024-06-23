"use client";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface Props {
  copyColor: string;
  textColor?: string;
}

export default function ColorButton({ copyColor, textColor }: Props) {
  const { toast } = useToast();

  const handleOnClick = () => {
    navigator.clipboard
      .writeText(copyColor)
      .then(() =>
        toast({
          title: "✔️ Copied!",
        })
      )
      .catch(() => {
        toast({
          title: `❌ Failed to copy color code: ${copyColor}`,
          variant: "destructive",
        });
      });
  };

  return (
    <Button
      className={`bg-[${copyColor}] ${textColor || "text-white"} me-2`}
      onClick={handleOnClick}
    >
      Copy
    </Button>
  );
}
