import { AnimatedText } from "@/components/animated-name";

export default function ContactPage() {
  return (
    <main>
      <h2>
        <AnimatedText name="Contact" username="Ping Portal" />
      </h2>

      <p className="mb-4 text-primary-foreground/80">
        Open to collaborations, product work, and frontend consulting.
      </p>

      <ul className="flex flex-col gap-3 text-primary-foreground/90">
        <li>
          Email:{" "}
          <a
            className="underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500"
            href="mailto:work.gabrielsufrir@gmail.com"
          >
            work.gabrielsufrir@gmail.com
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            className="underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500"
            href="https://www.linkedin.com/in/gubriyeeel/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/gubriyeeel
          </a>
        </li>
      </ul>
    </main>
  );
}
