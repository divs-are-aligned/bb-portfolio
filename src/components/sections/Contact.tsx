import { MailIcon } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/Icons";
import { SectionWrapper, SectionHeading } from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";

const socials = [
  {
    label: "Email",
    href: "mailto:bartosz.budak@gmail.com",
    icon: MailIcon,
    display: "bartosz.budak@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/divs-are-aligned",
    icon: GitHubIcon,
    display: "github.com/divs-are-aligned",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/bartbudak",
    icon: LinkedInIcon,
    display: "linkedin.com/in/bartbudak",
    external: true,
  },
];

export function Contact() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading>Contact</SectionHeading>

      <div className="max-w-lg">
        <p className="mb-10 text-muted-foreground leading-relaxed">
          Have a project in mind, want to talk design systems, or just want to
          say hello? My inbox is always open.
        </p>

        <div className="space-y-3">
          {socials.map((social) => (
            <Button
              key={social.label}
              data-animate="contact-item"
              variant="outline"
              nativeButton={false}
              className="w-full justify-start gap-3 h-12"
              render={
                <a
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                />
              }
            >
              <social.icon className="size-4 shrink-0" />
              <span className="flex flex-col items-start text-left">
                <span className="font-mono text-xs uppercase tracking-[0.06em] text-muted-foreground">
                  {social.label}
                </span>
                <span className="font-mono text-[12px]">{social.display}</span>
              </span>
            </Button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
