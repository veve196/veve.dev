import Avatar from "@/components/avatar";
import BoopCounter from "@/components/boopCounter";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TypingAnimation from "@/components/typingAnimation";
import getMilestones from "@/utils/server-api/getMilestones";
import getBoops from "@/utils/server-api/getBoops";
import { getStatus } from "@/utils/server-api/getStatus";
import getSocials from "@/utils/server-api/getSocials";
import SpotifyPlayer from "@/components/spotifyPlayer";

export const runtime = "edge";

export default async function Home() {
  const socials = await getSocials();
  const milestones = await getMilestones();
  const boops = await getBoops();
  const status = await getStatus();

  return (
    <>
      <div className="text-center">
        <Avatar milestones={milestones} />
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
          <Link href="https://t.me/addstickers/FurdisAndVeve" target="_blank">
            My Stickers!
          </Link>
        </Button>
        <Separator className="my-3 w-72 mx-auto" />
        <div className="flex flex-col">
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
                className=""
              >
                {social.title}
              </Link>
            </Button>
          ))}
        </div>
        <Separator className="my-3 w-72 mx-auto" />
        <BoopCounter boopCount={boops} />
      </div>
      <SpotifyPlayer />
    </>
  );
}
