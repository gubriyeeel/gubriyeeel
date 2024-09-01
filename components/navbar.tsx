import Link from "next/link";

const links = [
  {
    href: "/projects",
    label: "projects",
  },
  {
    href: "/contact",
    label: "contact",
  },
  {
    href: "/blogs",
    label: "blogs",
  },
];

export default function Navbar() {
  return (
    <nav>
      <ul className="flex gap-4 text-muted-foreground">
        {links.map((link) => (
          <li className="underline-offset-4 hover:underline" key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
