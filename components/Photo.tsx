import Image from "next/image";
import type { Img } from "@/content/site";

// next/image with the generated blur placeholder; `fill` for photos that fill a sized parent.
export function Photo({ img, sizes, className, priority, fill }: { img: Img; sizes: string; className?: string; priority?: boolean; fill?: boolean }) {
  const common = {
    src: img.src,
    sizes,
    className,
    placeholder: img.blur ? ("blur" as const) : undefined,
    blurDataURL: img.blur,
    ...(priority ? { priority: true, fetchPriority: "high" as const, quality: 60 } : {}),
  };
  return fill ? <Image {...common} alt={img.alt} fill /> : <Image {...common} alt={img.alt} width={img.w} height={img.h} />;
}
