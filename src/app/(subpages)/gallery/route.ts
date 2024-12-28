import { getDefaultGallery } from "@/server-api/gallery";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const defaultGallery = await getDefaultGallery();

  return NextResponse.redirect(
    new URL(`/gallery/${defaultGallery.$id}`, request.url)
  );
}
