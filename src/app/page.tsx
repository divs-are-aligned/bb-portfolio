import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Animations } from "@/components/shared/Animations";
import { Marquee } from "@/components/shared/Marquee";

export default function Home() {
  return (
    <>
      <Animations />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
