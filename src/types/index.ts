export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: "web" | "mobile" | "open-source" | "other";
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "cloud";
}
