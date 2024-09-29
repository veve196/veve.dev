import Avatar from "@/components/avatar";
import BoopCounter from "@/components/boopCounter";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TypingAnimation from "@/components/typingAnimation";
import getMilestones from "@/utils/server-api/getMilestones";
import getBoops from "@/utils/server-api/getBoops";

export const runtime = "edge";

export default async function Home() {
  const milestones = await getMilestones();
  const boops = await getBoops();

  return (
    <div className="text-center">
      <Avatar milestones={milestones} />
      <p className="text-5xl mt-2 mb-4">
        <TypingAnimation texts={["welcome to my page! :3", "veve"]} />
      </p>
      <Button variant="link" className="px-2" type="button">
        <Link href={"/about"}>About</Link>
      </Button>
      •
      <Button variant="link" className="px-2" type="button">
        <Link href={"/gallery"}>Gallery</Link>
      </Button>
      •
      <Button variant="link" className="px-2" type="button">
        <Link href={"/ref"}>Refsheet</Link>
      </Button>
      <span className="hidden sm:inline-block">•</span>
      <Button
        variant="link"
        className="px-2 block mx-auto sm:inline-block"
        type="button"
      >
        <Link href="https://t.me/addstickers/FurdisAndVeve" target="_blank">
          My Stickers!
        </Link>
      </Button>
      <Separator className="my-3 w-72 mx-auto" />
      <Button variant="link" className="block mx-auto" type="button">
        <Link href={"https://x.com/veve196"} target="_blank">
          Twitter/X
        </Link>
      </Button>
      <Button variant="link" className="block mx-auto" type="button">
        <Link href={"https://t.me/veve196"} target="_blank">
          Telegram
        </Link>
      </Button>
      <Separator className="my-3 w-72 mx-auto" />
      <BoopCounter boopCount={boops} />
    </div>
  );
}
