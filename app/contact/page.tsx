import type { Metadata } from "next";
import {
  ArrowTopRightIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { CopyButton } from "@/components/copy-button";
import { CtaButton } from "@/components/cta-button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Gabriel Sufrir.",
  alternates: { canonical: "/contact" },
};

const socials = [
  {
    label: "LinkedIn",
    handle: "in/gubriyeeel",
    href: siteConfig.links.linkedin,
    Icon: LinkedInLogoIcon,
  },
  {
    label: "GitHub",
    handle: "@gubriyeeel",
    href: siteConfig.links.github,
    Icon: GitHubLogoIcon,
  },
];

export default function ContactPage() {
  const email = siteConfig.links.emailAddress;

  return (
    <main>
      <section className="mb-8 mt-12">
        <p className="enter text-muted-foreground">Ping portal</p>
        <h1 className="enter mt-1" style={{ "--i": 1 } as React.CSSProperties}>
          Let&apos;s build something.
        </h1>
        <p
          className="enter mt-4 text-muted-foreground"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Open to collaborations, product work, and frontend consulting.
        </p>
      </section>

      <div className="flex flex-col gap-3">
        <div
          className="surface enter flex items-center gap-4 p-5"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary">
            <EnvelopeClosedIcon className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <a href={siteConfig.links.email} className="block truncate font-medium hover:underline">
              {email}
            </a>
          </div>
          <CopyButton value={email} label="Copy email address" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {socials.map(({ label, handle, href, Icon }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="surface pressable enter group flex flex-col gap-6 p-5 hover:border-white/[0.12]"
              style={{ "--i": 4 + i } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <Icon className="size-5" />
                <ArrowTopRightIcon className="size-4 text-muted-foreground transition-all duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <div>
                <p className="font-semibold tracking-tight">{label}</p>
                <p className="text-sm text-muted-foreground">{handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <CtaButton
        href={siteConfig.links.email}
        label="Send an email"
        hint="say hi"
        className="enter mt-10"
      />
    </main>
  );
}
