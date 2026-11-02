import Image from "next/image";
import { site } from "@/content/site";

// The LinkedIn photo (site.photo). Above the fold on both home layouts, so it's preloaded.
// Callers set the shape; each theme can restyle .profile-photo in globals.css.
export function ProfilePhoto({ size, className = "" }: { size: number; className?: string }) {
  return (
    <Image
      src={site.photo}
      alt={`${site.name}`}
      width={size}
      height={size}
      preload
      className={`profile-photo shrink-0 object-cover ${className}`}
    />
  );
}
