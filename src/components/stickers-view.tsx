"use client";

import Loading from "@/app/(subpages)/loading";
import GlareHover from "@/components/ui/glare-hover";
import getStickerUrls from "@/server-api/stickers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tilt } from "react-tilt";

interface StickersViewProps {
  stickerPackName: string;
}

export default function StickersView({ stickerPackName }: StickersViewProps) {
  const [stickerUrls, setStickerUrls] = useState<string[] | null>(null);

  useEffect(() => {
    getStickerUrls(stickerPackName)
      .then((urls) => setStickerUrls(urls))
      .catch((error) => {
        console.error("Failed to fetch sticker URLs:", error);
        setStickerUrls([]);
      });
  }, [stickerPackName]);

  if (!stickerUrls) {
    return <Loading />;
  }

  if (stickerUrls.length === 0) {
    return <p>No Stickers available. Something probably went wrong. :&#40;</p>;
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {stickerUrls.map((url, index) => (
          <Tilt key={index}>
            <GlareHover
              glareColor="#ffffff"
              background="transparent"
              glareOpacity={0.3}
              glareAngle={-30}
              transitionDuration={800}
              playOnce={false}
              className="!w-auto !h-auto border-0"
            >
              <Image src={url} alt="Sticker" width={128} height={128} />
            </GlareHover>
          </Tilt>
        ))}
      </div>
    </>
  );
}
