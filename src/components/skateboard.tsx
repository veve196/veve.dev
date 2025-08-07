"use client";

import { cn } from "@/lib/utils";

interface SkateboardProps {
  children?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  length?: number | string;
  className?: string;
}

export default function Skateboard({
  children,
  orientation = "horizontal",
  length = "100%",
  className,
}: SkateboardProps) {
  if (typeof length === "number") {
    length = `${length}px`;
  }

  let deckStyle: React.CSSProperties = {};
  let truckTailStyle: React.CSSProperties = {};
  let truckNoseStyle: React.CSSProperties = {};

  if (orientation === "horizontal") {
    deckStyle = { aspectRatio: "7/2", width: length };
    truckTailStyle = { left: "8%" };
    truckNoseStyle = { right: "8%" };
  } else {
    deckStyle = { aspectRatio: "2/7", height: length };
    truckTailStyle = { bottom: "8%" };
    truckNoseStyle = { top: "8%" };
  }

  return (
    <div
      className={`relative rounded-full border-2 bg-radial from-blue-900 to-violet-950 border-amber-700 ${cn(
        className
      )}`}
      style={deckStyle}
    >
      <Truck orientation={orientation} style={truckTailStyle} />
      <Truck orientation={orientation} style={truckNoseStyle} />
      {children}
    </div>
  );
}

function Truck({
  orientation,
  style,
}: {
  orientation: "horizontal" | "vertical";
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`${
        orientation === "horizontal" ? "h-full" : "w-full rotate-90"
      } z-10 absolute aspect-[1/1] flex items-center justify-center`}
      style={style}
    >
      {/* Baseplate */}
      <div className="absolute bg-gray-700 w-[40%] h-[30%] rounded-[16%]" />
      {/* Washers(?) */}
      <div className="absolute bg-gray-600 w-1/4 h-1/5 rounded-[50%]" />
      {/* Axle */}
      <div className="absolute h-full w-[10%] bg-gray-500" />
      {/* Wheels */}
      <div className="absolute w-[30%] h-[15%] bg-gradient-to-b from-blue-800 to-blue-950 rounded-[30%] self-start top-[-5%]"></div>
      <div className="absolute w-[30%] h-[15%] bg-gradient-to-b from-blue-950 to-blue-800 rounded-[30%] self-end bottom-[-5%]"></div>
    </div>
  );
}
