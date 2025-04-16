"use client";

import Image from "next/image";
import getStickerUrls from "@/server-api/stickers";
import { useEffect, useState } from "react";
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
          <Image key={index} src={url} alt="Sticker" width={128} height={128} />
        ))}
      </div>
    </>
  );
}
