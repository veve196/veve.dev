"use client";

import "@/styles/about.css";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [showInterests, setShowInterests] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        <Image
          src="/about/wave.webp"
          alt="wave"
          title="Hewwo!"
          width={256}
          height={256}
          priority
        />

        <div className="flex flex-col items-start w-full">
          <p className="text-2xl mb-3">Hello, I&apos;m veve!</p>
          <p>Hey guys did you know that</p>
          <p>...</p>
          <p>Uhm hey guys</p>
          {showInterests ? (
            <p>
              ...
              <br />
              I'm bad at talking about myself... so instead here's just some
              stuff I like :3
            </p>
          ) : (
            <div className="grow flex flex-col justify-end">
              {/* <Button onClick={() => setShowInterests(true)}>...</Button> */}
            </div>
          )}
        </div>
      </div>
      {showInterests && (
        <div className="text-center mt-8">
          <h1 className="rainbow-text text-6xl w-full text-center mx-auto">
            cool stuff
          </h1>
          <Image
            src={"/about/interests/dg-baby.png"}
            width={128}
            height={128}
            className="relative left-[20%]"
            alt="dg-baby"
          />
          <Image
            src={"/about/interests/dg-lovepill.png"}
            width={128}
            height={128}
            className="relative left-[80%]"
            alt="dg-baby"
          />
          <Image
            src={"/about/interests/veve-skating.png"}
            width={128}
            height={128}
            className="relative left-[20%]"
            alt="dg-baby"
          />
        </div>
      )}
    </>
  );
}
