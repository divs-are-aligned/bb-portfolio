import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "HTML", category: "language" },
  { name: "CSS / Sass", category: "language" },

  // Frameworks & Libraries
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "Gatsby", category: "framework" },
  { name: "Node.js", category: "framework" },
  { name: "AngularJS", category: "framework" },
  { name: "GraphQL / Apollo", category: "framework" },
  { name: "Styled Components", category: "framework" },

  // Tools
  { name: "Git", category: "tool" },
  { name: "Jest / Enzyme", category: "tool" },
  { name: "Jenkins", category: "tool" },
  { name: "Jira", category: "tool" },
  { name: "Figma", category: "tool" },

  // Cloud & DevOps
  { name: "AWS (Amplify, S3, Lambda, CloudFront)", category: "cloud" },
  { name: "Google Firebase", category: "cloud" },
  { name: "GitHub Actions", category: "cloud" },
  { name: "Dynatrace / Heap", category: "cloud" },
];

export const skillCategories: Array<{
  value: Skill["category"];
  label: string;
}> = [
  { value: "language", label: "Languages" },
  { value: "framework", label: "Frameworks & Libraries" },
  { value: "tool", label: "Tools" },
  { value: "cloud", label: "Cloud & DevOps" },
];
