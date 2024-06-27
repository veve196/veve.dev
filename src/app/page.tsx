import Avatar from "@/components/avatar";
import BoopCounter from "@/components/boopCounter";
import getBoops from "@/utils/server-api/getBoops";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const runtime = "edge";

export default async function Home() {
  const boops = await getBoops();
  return (
    <div className="text-center">
      <Avatar />
      <p className="text-6xl mt-2 mb-4">veve</p>
      <Link href={"/about"}>About</Link> •{" "}
      <Link href={"/gallery"}>Gallery</Link> •{" "}
      <Link href={"/ref"}>Refsheet</Link> •{" "}
      <Link href="https://t.me/addstickers/FurdisAndVeve" target="_blank">
        My Stickers!
      </Link>
      <Separator className="my-3 w-72 mx-auto" />
      <BoopCounter count={boops.count} />
    </div>
  );
}
