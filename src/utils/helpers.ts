export function scaleImageDimensions(
  originalWidth: number | undefined,
  originalHeight: number | undefined,
  newHeight: number,
  newHeightIsMax: boolean
) {
  originalWidth = originalWidth || newHeight;
  originalHeight = originalHeight || newHeight;

  const isLarge =
    (!newHeightIsMax && originalHeight !== newHeight) ||
    (newHeightIsMax && originalHeight > newHeight);
  const scaledHeight = isLarge ? newHeight : originalHeight;
  const scaledWidth = isLarge
    ? (originalWidth / originalHeight) * scaledHeight
    : originalHeight;

  return { scaledWidth, scaledHeight };
}

export function isMimeTypeAnimatable(mimeType: string | undefined) {
  return (
    mimeType != null &&
    [
      "image/gif",
      "image/apng",
      "image/webp",
      "image/svg+xml",
      "video/x-mng",
    ].includes(mimeType)
  );
}
