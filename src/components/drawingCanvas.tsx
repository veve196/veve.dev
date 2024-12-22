"use client";

import uploadDrawing from "@/actions/uploadDrawing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Slider } from "@/components/ui/slider";
import React, { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [showDialog, setShowDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>(
    []
  );

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

    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.strokeStyle = color;

    const startDrawing = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      setIsDrawing(true);
      const { offsetX, offsetY } = getScaledEventPosition(event, canvas);

      const newPath = [{ x: offsetX, y: offsetY }];
      setCurrentPath(newPath);

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
      const newPoint = { x: offsetX, y: offsetY };
      setCurrentPath((prevPath) => [...prevPath, newPoint]);

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
      if (!isDrawing) return;
      setIsDrawing(false);
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath([]);
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
  }, [isDrawing, color, currentPath, lineWidth]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setPaths([]);
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

  const handleUndo = () => {
    setPaths((prevPaths) => {
      const newPaths = prevPaths.slice(0, -1);
      redrawCanvas(newPaths);
      return newPaths;
    });
  };

  const redrawCanvas = (paths: { x: number; y: number }[][]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = color;

    paths.forEach((path) => {
      context.beginPath();
      path.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.stroke();
    });
  };

  return (
    <>
      <div className="mx-auto relative max-w-[500px]">
        <div>
          {isSaving && (
            <div className=" w-full h-full absolute flex justify-center items-center gap-2 text-black text-4xl animate-pulse">
              <LoadingSpinner />
              Saving...
            </div>
          )}
          <div className="flex justify-between gap-2 mb-2">
            {/* <Button
              onClick={handleUndo}
              disabled={paths.length === 0 || isSaving}
              className="w-16"
            >
              <RotateCcw />
            </Button> */}
            <Slider
              defaultValue={[lineWidth]}
              min={1}
              max={20}
              step={1}
              onValueChange={(value) => setLineWidth(value[0])}
              disabled={isSaving}
              className="w-32"
            />
            <Input
              type="color"
              value={color}
              onChange={handleColorChange}
              disabled={isSaving}
              className="w-16 p-0 rounded"
            />
          </div>
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className="border border-black bg-white w-full"
          />
          <div className="mt-4 flex justify-between gap-2">
            <Button
              variant={"destructive"}
              onClick={handleClear}
              className="w-32"
              disabled={isSaving}
            >
              Clear
            </Button>
            <Button
              onClick={handleSave}
              className="w-32 bg-green-500 text-white"
              disabled={isSaving || paths.length === 0}
              title={
                paths.length === 0
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
            <AlertDialogTitle>Thank you! 💙</AlertDialogTitle>
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
