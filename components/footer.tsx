import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 flex items-center justify-between border-t border-white/[0.06] pt-6 text-sm text-muted-foreground">
      <div className="flex gap-5">
        <a
          className="transition-colors hover:text-foreground"
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="transition-colors hover:text-foreground"
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <Link
          className="transition-colors hover:text-foreground"
          href="/contact"
        >
          Contact
        </Link>
      </div>
      <a
        href="#top"
        aria-label="Back to top"
        className="pressable group grid size-9 place-items-center rounded-full bg-card hover:bg-secondary hover:text-foreground"
      >
        <ArrowUpIcon className="transition-transform duration-500 ease-spring group-hover:-translate-y-0.5" />
      </a>
    </footer>
  );
}
