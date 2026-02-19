import Link from "next/link";

const links = [
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
];

export default function Navbar() {
  return (
    <nav>
      <ul className="flex gap-8 text-muted-foreground">
        {links.map((link) => (
          <li
            className="underline-offset-4 hover:text-white hover:underline"
            key={link.href}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
