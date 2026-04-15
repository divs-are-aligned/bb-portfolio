import { SectionWrapper, SectionHeading } from "@/components/shared/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { skills, skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading>Skills</SectionHeading>

      <div className="space-y-10">
        {skillCategories.map((category) => {
          const categorySkills = skills.filter(
            (s) => s.category === category.value
          );
          return (
            <div key={category.value}>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge
                    key={skill.name}
                    data-animate="skill-badge"
                    variant="secondary"
                    className="font-mono text-[11px] tracking-[0.06em] px-3 py-1"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
