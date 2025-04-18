"use client";

import Image from "next/image";
import getStickerUrls from "@/server-api/stickers";
import { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import "@/styles/stickers.css";

export default function StickersView() {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    getStickerUrls("FurdisAndVeve").then((urls) => setUrls(urls));
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {urls.map((url, index) => (
          <Tilt key={index}>
            <Image
              src={url}
              alt="Sticker"
              className="sticker"
              width={128}
              height={128}
            />
          </Tilt>
        ))}
      </div>
    </>
  );
}
