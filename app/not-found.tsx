import { CtaButton } from "@/components/cta-button";

export default function NotFound() {
  return (
    <main className="mt-12">
      <p className="enter text-muted-foreground">404</p>
      <h1 className="enter mt-1" style={{ "--i": 1 } as React.CSSProperties}>
        Flight not found.
      </h1>
      <p className="enter mt-4 text-muted-foreground" style={{ "--i": 2 } as React.CSSProperties}>
        This page took off without you.
      </p>
      <CtaButton href="/" label="Back home" className="enter mt-10" />
    </main>
  );
}
