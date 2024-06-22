import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto my-10 text-center">
      <Image
        width={200}
        height={200}
        src="/veve.png"
        alt="veve"
        title="Goober"
        className="rounded-full mx-auto"
      />
      <p>veve</p>
      <button className="bg-background">Aaaaaa</button>
    </div>
  );
}
