"use client";

import { useState } from "react";
import { ExternalLinkIcon } from "lucide-react";
import { GitHubIcon } from "@/components/shared/Icons";
import { SectionWrapper, SectionHeading } from "@/components/shared/SectionWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { projects, projectCategories } from "@/data/projects";
import type { Project } from "@/types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card data-animate="project-card" className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-heading text-xl font-medium">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-mono text-[11px] tracking-[0.04em]">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {project.githubUrl && (
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
              />
            }
          >
            <GitHubIcon className="size-3.5" />
            Source
          </Button>
        )}
        {project.liveUrl && (
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live demo"
              />
            }
          >
            <ExternalLinkIcon className="size-3.5" />
            Live
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <SectionWrapper id="projects">
      <SectionHeading>Projects</SectionHeading>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          {projectCategories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {projectCategories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No projects in this category yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </SectionWrapper>
  );
}
