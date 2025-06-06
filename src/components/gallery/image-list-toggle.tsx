"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GalleryType } from "@/utils/models";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ImageListToggleProps {
  galleries: GalleryType;
}

export default function ImageListToggle({ galleries }: ImageListToggleProps) {
  const routes = usePathname().split("/");
  const galleryId = routes[routes.length - 1];

  return (
    <ToggleGroup type="single" defaultValue={galleryId} className="mx-auto">
      {galleries.documents.map((gallery, index) => (
        <ToggleGroupItem
          key={index}
          value={gallery.$id}
          asChild
          className="rounded-md min-w-[auto]"
        >
          <Link href={`/gallery/${gallery.$id}`}>{gallery.title}</Link>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
