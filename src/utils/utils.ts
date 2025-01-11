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
