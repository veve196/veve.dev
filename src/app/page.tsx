import Avatar from "@/components/avatar";
import BoopCounter from "@/components/boopCounter";
import getBoops from "@/components/server-api/getBoops";
import { unstable_noStore } from "next/cache";
export const runtime = "edge";
export default async function Home() {
  unstable_noStore();
  const boops = await getBoops();
  return (
    <div className="mx-auto my-10 text-center">
      <Avatar />
      <p>veve</p>
      <BoopCounter count={boops.count} />
    </div>
  );
}
