"use server";

export default async function getStickerUrls(
  stickerSet: string
): Promise<string[]> {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VEVE_API_URL}/Telegram/Stickers/${stickerSet}`,
    {
      headers: {
        "x-api-key": `${process.env.VEVE_API_KEY}`,
      },
    }
  ).then((res) => res.json());
}
