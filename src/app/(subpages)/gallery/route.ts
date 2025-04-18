import { getDefaultGallery } from "@/server-api/gallery";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const defaultGallery = await getDefaultGallery();
  let url;

  if (defaultGallery == null) {
    url = new URL("/", request.url);
  } else {
    url = new URL(`/gallery/${defaultGallery.$id}`, request.url);
  }

  return NextResponse.redirect(url);
}
