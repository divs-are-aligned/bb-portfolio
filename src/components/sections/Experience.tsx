import { SectionWrapper, SectionHeading } from "@/components/shared/SectionWrapper";
import { experience } from "@/data/experience";

function formatDate(date: string | null) {
  return date ?? "Present";
}

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading>Experience</SectionHeading>

      <ol className="relative border-l border-accent-foreground/20 ml-3">
        {experience.map((entry) => (
          <li key={entry.id} className="mb-12 ml-6 last:mb-0">
            <span className="absolute -left-[7px] mt-1.5 flex size-3.5 items-center justify-center rounded-full border border-accent-foreground/50 bg-background ring-4 ring-background" />

            <div data-animate="exp-item" className="ml-2">
              <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-heading text-base font-medium">{entry.title}</h3>
                <span className="text-sm text-muted-foreground">·</span>
                <span className="font-sans text-sm font-medium text-muted-foreground">
                  {entry.company}
                </span>
              </div>

              <p className="mb-4 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
                {formatDate(entry.startDate)} — {formatDate(entry.endDate)}{" "}
                <span className="mx-1">·</span>
                {entry.location}
              </p>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {entry.prose}
              </p>

              <ul className="space-y-1.5">
                {entry.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed before:content-['—'] before:mr-2 before:text-border"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
