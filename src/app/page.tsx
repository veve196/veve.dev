import Avatar from "@/components/avatar";
import BoopCounter from "@/components/boop-counter";
import SpotifyPlayer from "@/components/spotify-player";
import TypingAnimation from "@/components/typing-animation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import getSocials from "@/server-api/getSocials";
import { getStatus } from "@/server-api/getStatus";
import { SocialType, StatusDocument } from "@/utils/models";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";

export default async function Home() {
  const socials: SocialType | null = await getSocials();
  const status: StatusDocument | null = await getStatus();

  return (
    <>
      <div className="text-center">
        <Avatar />
        <p className="text-5xl mt-2 mb-4">
          <TypingAnimation texts={["welcome to my page! :3", "veve"]} />
        </p>
        {status && <p>{status.status}</p>}
        <Button variant="link" className="px-2" type="button" asChild>
          <Link href={"/about"}>About</Link>
        </Button>
        •
        <Button variant="link" className="px-2" type="button" asChild>
          <Link href={"/gallery"}>Gallery</Link>
        </Button>
        •
        <Button variant="link" className="px-2" type="button" asChild>
          <Link href={"/ref"}>Refsheet</Link>
        </Button>
        <span className="hidden sm:inline-block">•</span>
        <Button
          variant="link"
          className="px-2 block mx-auto sm:inline-block"
          type="button"
          asChild
        >
          <Link href={"https://t.me/addstickers/FurdisAndVeve"}>
            My Stickers!
          </Link>
        </Button>
        <Separator className="my-3 !w-72 mx-auto" />
        <div className="flex flex-col">
          {socials == null ? (
            <p>
              Couldn't load socials... :&#91;
              <br />
              Maybe come back later!
            </p>
          ) : (
            <>
              {socials.documents.map((social) => (
                <Button
                  key={social.$id}
                  variant="link"
                  className="block mx-auto"
                  type="button"
                  asChild
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    title={social.tooltip ?? social.title}
                  >
                    {social.title}
                  </Link>
                </Button>
              ))}
            </>
          )}
        </div>
        <Separator className="my-3 !w-72 mx-auto" />
        <BoopCounter />
      </div>
      <SpotifyPlayer />
      <Link href={"/draw"}>
        <Image
          src="/paint.webp"
          alt="Paint"
          title="Draw something!"
          width={128}
          height={128}
          className="sm:fixed relative sm:right-0 sm:top-0 sm:mt-16 sm:me-10 mx-auto my-16 animate-bounce"
        />
      </Link>
    </>
  );
}
