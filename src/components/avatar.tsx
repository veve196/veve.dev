"use client";

import Image from "next/image";
import updateBoop from "./actions/updateBoop";

export default function Avatar() {
  const handleClick = async () => {
    const result = await updateBoop();
  };

  return (
    <Image
      width={200}
      height={200}
      src="/veve.png"
      alt="veve"
      title="Goober"
      className="rounded-full mx-auto"
      onClick={handleClick}
    />
  );
}
