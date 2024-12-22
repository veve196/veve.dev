import { Metadata } from "next/types";

export const runtime = "edge";
export const metadata: Metadata = {
  title: "About",
};
export default async function Discord() {
  return (
    <>
      <div className="text-center">
        <img
          src="/discord.webp"
          alt="discord"
          title="discord"
          width={400}
          className="mx-auto p-4"
        />
        <div>
          <p>discord has no profile link but my username there is veve :3</p>
        </div>
      </div>
    </>
  );
}
