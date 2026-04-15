import { SectionWrapper, SectionHeading } from "@/components/shared/SectionWrapper";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DraggablePortrait } from "@/components/shared/DraggablePortrait";

const stats = [
  { label: "Years of experience", value: "8+" },
  { label: "Engineers mentored", value: "10+" },
  { label: "Design system users", value: "1k+" },
];

const languages = [
  { name: "English", level: "Native" },
  { name: "Polish", level: "Native" },
  { name: "Japanese", level: "Elementary" },
  { name: "German", level: "Elementary" },
];

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading>About</SectionHeading>

      <div className="grid gap-12 md:grid-cols-[1fr_auto]">
        <div data-animate="about-body" className="space-y-6">
          <DraggablePortrait className="mb-4 h-64 w-auto text-foreground md:float-right md:ml-8 md:mb-2" />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I was born in Rzesz&oacute;w, Poland and spent my first five years there
              before moving to the US with my family. The first website I ever
              visited was pokemon.com — sometime around 2001 — and something
              clicked. I&apos;ve been paying close attention to how I interact with
              technology ever since.
            </p>
            <p>
              I&apos;m self-taught. I initially flunked out of computer science —
              briefly considered studying Buddhist philosophy and spending a few
              years at a monastery, which remains one of my favorite career
              detours. I found my way back through curiosity and stubbornness.
              My first engineering role was at Optum, where I fell into{" "}
              <span className="text-foreground font-medium">
                web accessibility
              </span>{" "}
              almost by accident. Understanding it meant going back to
              fundamentals — HTML, CSS, and JavaScript at their core — and that
              foundation changed how I build everything. At one point I
              convinced my project manager to rethink our entire color palette,
              armed with nothing but a lot of opinions and genuine passion.
            </p>
            <p>
              From there I moved to McKinsey, where I learned to operate at
              scale — shipping an internal{" "}
              <span className="text-foreground font-medium">design system</span>{" "}
              serving 1,000+ engineers, building developer tooling, and
              deploying more npm packages than I can count. I became a go-to
              mentor for junior engineers. Because I learned everything the hard
              way, I try to keep that experience close when working with someone
              earlier in their journey.
            </p>
            <p>
              Outside of tech I nerd out about philosophy, language, and the
              deeper questions — the ones without clean answers. When I&apos;m not
              coding, I&apos;m probably thinking about design tokens.
            </p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Badge key={lang.name} variant="secondary">
                  {lang.name}
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    · {lang.level}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-8 md:flex-col md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} data-animate="about-stat" className="min-w-[80px]">
              <p className="font-heading text-2xl font-medium">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {i < stats.length - 1 && (
                <Separator className="mt-6 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
