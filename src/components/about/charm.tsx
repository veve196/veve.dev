import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface CharmProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function Charm({ src, alt, title, description }: CharmProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Image
          className="duration-300 hover:scale-105"
          src={src}
          alt={alt}
          width={128}
          height={128}
        />
      </TooltipTrigger>
      <TooltipContent>
        <h2 className="text-xl">{title}</h2>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
}
