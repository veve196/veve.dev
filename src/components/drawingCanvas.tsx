"use client";

import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import uploadDrawing from "@/utils/actions/uploadDrawing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { LoadingSpinner } from "./ui/loading-spinner";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [showDialog, setShowDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = color;

    const startDrawing = (event: MouseEvent) => {
      setHasDrawn(true);
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      context.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [isDrawing, color]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
      }
    }
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsSaving(true);

    const dataURL = canvas.toDataURL("image/png");
    const blob = await (await fetch(dataURL)).blob();

    await uploadDrawing(blob);

    setIsSaving(false);
    setShowDialog(true);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;

    handleClear();
    setShowDialog(false);
  };

  return (
    <>
      <div className="mx-auto w-[500px] relative">
        <div className="h-[500px]">
          {isSaving && (
            <div className=" w-full h-full bg-black opacity-50 absolute flex justify-center items-center gap-2">
              <LoadingSpinner />
              Saving...
            </div>
          )}
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className="border border-black bg-white w-[500px] h-[500px]"
          />
          <div className="mt-4 flex justify-between">
            <Button
              variant={"destructive"}
              onClick={handleClear}
              className="w-32"
              disabled={isSaving}
            >
              Clear
            </Button>
            <Input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-32 p-1"
              disabled={isSaving}
            />
            <Button
              onClick={handleSave}
              className="w-32 bg-green-500 text-white"
              disabled={isSaving || !hasDrawn}
              title={
                hasDrawn
                  ? "Send your drawing to me! :3"
                  : "Draw something first!"
              }
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog open={showDialog} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thank you! 🩵</AlertDialogTitle>
            <AlertDialogDescription>
              Thanks for sending me your beautiful masterpiece! :3 🎨
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DrawingCanvas;
