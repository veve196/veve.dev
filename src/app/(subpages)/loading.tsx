import Image from "next/image";

interface LoadingProps {
  text?: string;
}

export default function Loading({ text }: LoadingProps) {
  return (
    <div className="mx-auto text-center">
      <Image
        src="/ve-cube.webp"
        alt="Loading"
        width={64}
        height={64}
        className="mx-auto"
      />
      <p className="text-gray-500">{text ?? "Loading..."}</p>
    </div>
  );
}
