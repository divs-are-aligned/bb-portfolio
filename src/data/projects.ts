import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "mckinsey-design-system",
    title: "Enterprise Design System",
    description:
      "Engineering lead for an internal design system serving 1,000+ users at McKinsey & Company. Drove adoption of accessibility best practices and mentored junior engineers across distributed teams.",
    techStack: ["React", "Next.js", "TypeScript", "Storybook", "Jest"],
    category: "web",
  },
  {
    id: "mckinsey-ssg",
    title: "Static Site Generator",
    description:
      "Developed a Gatsby.js-based static site generator at McKinsey to streamline content publishing, reduce technical debt, and accelerate delivery across engineering teams.",
    techStack: ["Gatsby", "React", "GraphQL", "Node.js", "AWS"],
    category: "web",
  },
  {
    id: "mckinsey-cli",
    title: "Developer Onboarding CLI",
    description:
      "Built command-line tooling to automate developer onboarding workflows at McKinsey, cutting setup time and enforcing consistent coding standards across the engineering org.",
    techStack: ["Node.js", "TypeScript", "Shell"],
    category: "open-source",
  },
  {
    id: "bb-portfolio",
    title: "Portfolio (this site)",
    description:
      "Personal portfolio PWA built with Next.js 16, shadcn/ui, and deployed to Firebase Hosting at bartbudak.io.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    category: "open-source",
    githubUrl: "https://github.com/divs-are-aligned/bb-portfolio",
    liveUrl: "https://bartbudak.io",
  },
];

export const projectCategories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "open-source", label: "Open Source" },
] as const;
