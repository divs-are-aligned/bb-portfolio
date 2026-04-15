export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = present
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "seattle-chocolate",
    company: "Seattle Chocolate Company",
    title: "Director of IT & eCommerce",
    location: "Seattle, WA",
    startDate: "Dec 2024",
    endDate: null,
    bullets: [
      "Lead all internal IT operations, overseeing infrastructure, tooling, and end-user support across the organization.",
      "Own and operate two Shopify storefronts — maevechocolate.com and jcocochocolate.com — driving eCommerce strategy, performance, and UX.",
    ],
  },
  {
    id: "mckinsey-senior",
    company: "McKinsey & Company",
    title: "Senior Software Engineer",
    location: "Boston, MA",
    startDate: "Apr 2021",
    endDate: "Dec 2024",
    bullets: [
      "Engineering lead for an internal design system serving 1,000+ users across the organization.",
      "Led front-end initiatives using React and Next.js, driving adoption of modern patterns and tooling.",
      "Advocated for and implemented accessibility best practices (WCAG 2.1) across the product suite.",
      "Mentored junior engineers through code reviews, pair programming, and internal tech talks.",
    ],
  },
  {
    id: "mckinsey-mid",
    company: "McKinsey & Company",
    title: "Software Engineer",
    location: "New York City, NY",
    startDate: "Nov 2019",
    endDate: "Apr 2021",
    bullets: [
      "Developed a Gatsby.js-based static site generator that streamlined content publishing across teams.",
      "Reduced technical debt and improved engineering velocity by standardizing build and deployment pipelines.",
      "Created CLI tooling to automate developer onboarding and enforce consistent coding standards.",
    ],
  },
  {
    id: "uhg",
    company: "Optum (UnitedHealth Group)",
    title: "Software Engineer",
    location: "Basking Ridge, NJ",
    startDate: "Jan 2017",
    endDate: "Nov 2019",
    bullets: [
      "Led technical decision-making and established coding standards across the front-end engineering team.",
      "Optimized application performance, achieving a 20% reduction in page load time.",
      "Maintained and evolved large-scale React and AngularJS applications serving millions of users.",
    ],
  },
];
