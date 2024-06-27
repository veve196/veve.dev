import Avatar from "@/components/avatar";
import BoopCounter from "@/components/boopCounter";
import getBoops from "@/utils/server-api/getBoops";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Twitter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export default async function Home() {
  const boops = await getBoops();
  return (
    <div className="text-center">
      <Avatar />
      <p className="text-5xl mt-2 mb-4">veve</p>
      <Button variant="link" className="px-2">
        <Link href={"/about"}>About</Link>
      </Button>
      •
      <Button variant="link" className="px-2">
        <Link href={"/gallery"}>Gallery</Link>
      </Button>
      •
      <Button variant="link" className="px-2">
        <Link href={"/ref"}>Refsheet</Link>
      </Button>
      •
      <Button variant="link" className="px-2">
        <Link href="https://t.me/addstickers/FurdisAndVeve" target="_blank">
          My Stickers!
        </Link>
      </Button>
      <Separator className="my-3 w-72 mx-auto" />
      <div className="flex flex-col">
        <Button variant="link">
          <Link href="https://x.com/veve196" target="_blank">
            Twitter/X
          </Link>
        </Button>
        <Button variant="link">
          <Link href="https://t.me/veve196" target="_blank">
            Telegram
          </Link>
        </Button>
      </div>
      <Separator className="my-3 w-72 mx-auto" />
      <BoopCounter count={boops.count} />
    </div>
  );
}
