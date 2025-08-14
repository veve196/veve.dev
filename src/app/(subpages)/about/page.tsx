import Charm from "@/components/about/charm";
import "@/styles/about.css";
import Image from "next/image";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "About",
  description: "This is my about page!",
  openGraph: {
    title: "About",
    description: "This page is about stuff",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/about/downey.webp`,
        alt: "stuff",
      },
    ],
  },
};

export default async function About() {
  return (
    <>
      <div className="px-4 flex gap-8">
        <div className="relative group nervous">
          <Image
            src="/about/wave.webp"
            alt="wave"
            title="Hewwo!"
            width={200}
            height={250}
            priority
            className="block"
          />
          <svg
            className="sweat-drop absolute left-[21%] top-6 w-6 h-8 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 "
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M49,38a17.5,17.5,0,0,1-35,0C14,22.7,28.22,8.48,31.5,8.48S49,22.7,49,38Z"
              fill="#7FDBFF"
              stroke="#39C0ED"
              strokeWidth="2"
            />
            <path
              d="M22 29 q-4 14 6 20"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>
        <div className="grow">
          <p className="text-2xl mb-3">Hello, I&apos;m veve!</p>
          <p>Hey guys did you know that</p>
          <p>...</p>
          <p>Uhm hey guys</p>
        </div>
        <Image
          src="/about/veve-spin.webp"
          alt="veve spin"
          title="veve"
          width={250}
          height={250}
          unoptimized={true}
        />
      </div>
      <div className="text-center my-6">
        <h1 className="text-6xl text-rainbow mb-4">no but actually...</h1>
        <p>
          ...idk what to put here, so here&apos;s just some random stuff i like
          :3
        </p>
      </div>
      <div className="text-center">
        <Charm
          src={"/about/charms/drain-baby.webp"}
          alt="Drain Gang"
          title="Drain Gang"
          description="i love bladee"
        />
        <Charm
          src={"/about/charms/veve-skate.webp"}
          alt="Skateboarding"
          title="Skating"
          description="did nothing else my entire life :3"
        />
        <Charm
          src={"/about/charms/coffee.webp"}
          alt="Coffee"
          title="Coffee"
          description="im an addict"
        />
        <Charm
          src={"/about/charms/lily.webp"}
          alt="Coffee"
          title="Lily"
          description="my baby, i love her so much &lt;3"
        />
        <p className="mt-2 text-muted">
          &#40;...and a lot more im too lazy to add rn!&#41;
        </p>
      </div>
    </>
  );
}
