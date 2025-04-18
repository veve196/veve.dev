import Ballpit from "@/components/ballpit";

export default function Page() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
      <Ballpit
        colors={[0xffffff]}
        followCursor={false}
        ambientIntensity={0}
        lightIntensity={0}
      />
    </div>
  );
}
