"use server";

export default async function getStickerUrls(
  stickerSet: string
): Promise<string[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VEVE_API_URL}/Telegram/Stickers/${stickerSet}`,
    {
      headers: {
        "x-api-key": `${process.env.VEVE_API_KEY}`,
      },
    }
  );

  const text = await res.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    const body = typeof data === "string" ? data : JSON.stringify(data);
    throw new Error(
      `Failed to fetch stickers: ${res.status} ${res.statusText} - ${body}`
    );
  }

  if (!Array.isArray(data)) {
    throw new Error(
      `Unexpected sticker response shape: ${JSON.stringify(data)}`
    );
  }

  return data as string[];
}
