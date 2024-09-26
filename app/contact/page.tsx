import { AnimatedText } from "@/components/animated-name";
import { ContactForm } from "@/components/contact-form";

export default function MusicPage() {
  return (
    <main>
      <h2>
        <AnimatedText name="Contact" username="Ping Portal" />
      </h2>

      <ContactForm />
    </main>
  );
}
