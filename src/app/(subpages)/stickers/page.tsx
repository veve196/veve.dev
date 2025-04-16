import StickersView from "@/components/stickers-view";
import { Metadata } from "next/types";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "Stickers",
  description: "Have a look at my stickers!",
  openGraph: {
    title: "Stickers",
    description: "Have a look at my stickers!",
  },
};

export default function Stickers() {
  return (
    <>
      <h1>My Stickers!</h1>
      <p>
        Thanks for checking them out, you can get them{" "}
        <a
          href="https://t.me/addstickers/FurdisAndVeve"
          target="_blank"
          title="My Stickers"
        >
          here
        </a>
        ! :3
      </p>
      <StickersView />
    </>
  );
}
