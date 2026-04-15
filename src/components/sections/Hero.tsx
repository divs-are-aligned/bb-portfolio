import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/Icons";

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-5xl flex-col justify-center px-6 py-20">
      <div className="max-w-3xl">
        <p data-animate="hero-item" className="mb-6 font-mono text-[11px] uppercase tracking-[0.1em] text-accent-foreground">
          Hello, I&apos;m
        </p>

        {/* Each word is a separate span so GSAP can animate them individually */}
        <h1 className="mb-6 font-heading text-7xl font-medium leading-none tracking-tight sm:text-8xl lg:text-9xl">
          <span data-animate="hero-word" className="inline-block">Bart</span>{" "}
          <span data-animate="hero-word" className="inline-block">Budak</span>
        </h1>

        <p data-animate="hero-item" className="mb-6 font-sans text-2xl font-medium text-muted-foreground sm:text-3xl">
          Technologist
        </p>
        <p data-animate="hero-item" className="mb-12 max-w-lg text-base leading-relaxed text-muted-foreground">
          Self-taught from first principles — I found my foundation in web
          accessibility, fell in love with design systems, and never stopped
          asking why things work the way they do. 8+ years building the web
          with a deep focus on UI/UX, developer experience, and the humans
          behind the code.
        </p>

        <div data-animate="hero-item" className="flex flex-wrap items-center gap-4">
          <Button size="lg" nativeButton={false} render={<a href="#projects" />}>
            View Projects
          </Button>
          <Button variant="outline" size="lg" nativeButton={false} render={<a href="#contact" />}>
            Get in Touch
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="GitHub"
              nativeButton={false}
              render={
                <a
                  href="https://github.com/divs-are-aligned"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <GitHubIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="LinkedIn"
              nativeButton={false}
              render={
                <a
                  href="https://linkedin.com/in/bartbudak"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <LinkedInIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <a
        data-animate="hero-scroll"
        href="#about"
        aria-label="Scroll to about"
        className="mt-20 flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDownIcon className="size-4" />
        Scroll down
      </a>
    </section>
  );
}
