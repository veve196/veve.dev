"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
