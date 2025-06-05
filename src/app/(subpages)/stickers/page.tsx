import StickersView from "@/components/stickers-view";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Stickers",
  description: "Have a look at my stickers!",
  openGraph: {
    title: "Stickers",
    description: "Have a look at my stickers!",
  },
};

export default function Stickers() {
  const stickerPack = "FurdisAndVeve";

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl mb-2 text-rainbow">My Stickers!</h1>
        <p className="mb-8">
          Thanks for checking them out, you can get them{" "}
          <Link
            href={`https://t.me/addstickers/${stickerPack}`}
            target="_blank"
            title="My Stickers"
            className="bg-gradient-to-r from-violet-500 via-blue-500 to-pink-500 bg-clip-text text-transparent animate-pulse"
          >
            here
          </Link>
          ! :3
        </p>
      </div>
      <StickersView stickerPackName={stickerPack} />
    </>
  );
}
