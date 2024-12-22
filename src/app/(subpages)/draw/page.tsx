import DrawingCanvas from "@/components/drawingCanvas";
import { Metadata } from "next/types";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Draw something!",
};
export default async function About() {
  return (
    <>
      <h1 className="text-center">
        Draw something <b>anonymously</b> for me to see! :3
      </h1>
      <p className="text-center text-destructive my-2">kinda wip!</p>
      <DrawingCanvas />
    </>
  );
}
