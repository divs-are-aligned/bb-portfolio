import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { BackgroundSettings } from "@/components/shared/BackgroundSettings";
import { ColorPaletteSettings } from "@/components/shared/ColorPaletteSettings";
import { MobileNav } from "./MobileNav";

export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/plants", label: "Plants" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a
          href="/"
          className="font-heading text-base font-medium tracking-tight transition-opacity hover:opacity-70"
        >
          Bart Budak
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ColorPaletteSettings />
          <BackgroundSettings />
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
