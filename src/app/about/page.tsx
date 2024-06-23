import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const runtime = "edge";
export default async function Home() {
  return (
    <>
      <Image
        width={600}
        height={600}
        src="/comebacklater.jpg"
        alt="come back later"
        title="come back later"
        className="mx-auto my-10"
      />
      <div className="text-center">
        <Link href="/">
          <Button>Go Back</Button>
        </Link>
      </div>
    </>
  );
}
