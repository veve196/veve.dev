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

    const startDrawing = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      setIsDrawing(true);
      setHasDrawn(true);
      const { offsetX, offsetY } = getScaledEventPosition(event, canvas);

      context.beginPath();
      context.moveTo(offsetX, offsetY);

      // draws a dot if you click without moving
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (!isDrawing) return;
      const { offsetX, offsetY } = getScaledEventPosition(event, canvas);
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };

    const getScaledEventPosition = (
      event: MouseEvent | TouchEvent,
      canvas: HTMLCanvasElement
    ) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX, clientY;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }

      return {
        offsetX: (clientX - rect.left) * scaleX,
        offsetY: (clientY - rect.top) * scaleY,
      };
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      context.closePath();
    };

    const handleMouseEnter = (event: MouseEvent) => {
      if (!isDrawing) return;

      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (!isDrawing) return;
      context.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing, { passive: false });
    window.addEventListener("mouseup", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
      window.removeEventListener("mouseup", stopDrawing);
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
      <div className="mx-auto relative max-w-[500px]">
        <div className="">
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
            className="border border-black bg-white w-full"
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
