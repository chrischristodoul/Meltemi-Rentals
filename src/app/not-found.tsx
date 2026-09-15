import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section as="div">
      <SectionHeading
        as="h1"
        title="Page not found"
        lead="The page you were looking for doesn't exist. Try the fleet or start a rental request."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" variant="secondary">
          Go home
        </Button>
        <Button href="/cars">See the fleet</Button>
      </div>
    </Section>
  );
}
