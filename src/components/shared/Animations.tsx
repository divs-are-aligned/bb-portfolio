"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Animations() {
  useGSAP(() => {
    // ── Navbar: slam down from above ────────────────────────────
    gsap.fromTo(
      "header",
      { opacity: 0, y: -60 },
      { opacity: 1, y: 0, duration: 0.9, ease: "elastic.out(1, 0.6)" }
    );

    // Stagger the nav links
    gsap.fromTo(
      "header nav a",
      { opacity: 0, y: -16 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "back.out(3)",
        delay: 0.5,
      }
    );

    // ── Hero name: words drop in with heavy bounce ───────────────
    gsap.fromTo(
      '[data-animate="hero-word"]',
      { opacity: 0, y: 140, rotation: -6, scale: 0.6 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        stagger: 0.14,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        delay: 0.15,
      }
    );

    // ── Hero items: cascade in from the left ─────────────────────
    gsap.fromTo(
      '[data-animate="hero-item"]',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "back.out(2.5)",
        delay: 0.9,
      }
    );

    // ── Scroll hint: pop in then bob forever ─────────────────────
    gsap
      .timeline({ delay: 1.6 })
      .fromTo(
        '[data-animate="hero-scroll"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(2)" }
      )
      .to('[data-animate="hero-scroll"]', {
        y: -10,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

    // ── Marquee: fade in ─────────────────────────────────────────
    gsap.fromTo(
      '[data-animate="marquee"]',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: '[data-animate="marquee"]', start: "top 90%" },
      }
    );

    // ── Section headings: skew + bounce up ──────────────────────
    gsap.utils
      .toArray<Element>('[data-animate="section-heading"]')
      .forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, skewX: -4 },
          {
            opacity: 1,
            y: 0,
            skewX: 0,
            duration: 1.0,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

    // ── About: body slides up, stats pop ────────────────────────
    gsap.fromTo(
      '[data-animate="about-body"]',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "back.out(2)",
        scrollTrigger: { trigger: "#about", start: "top 78%" },
      }
    );

    gsap.fromTo(
      '[data-animate="about-stat"]',
      { opacity: 0, y: 40, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.18,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: "#about", start: "top 72%" },
      }
    );

    // ── Experience: slam in hard from the left ───────────────────
    gsap.fromTo(
      '[data-animate="exp-item"]',
      { opacity: 0, x: -80, scale: 0.94 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.2,
        duration: 1.0,
        ease: "elastic.out(1, 0.55)",
        scrollTrigger: { trigger: "#experience", start: "top 80%" },
      }
    );

    // ── Skills: badges explode in ────────────────────────────────
    gsap.fromTo(
      '[data-animate="skill-badge"]',
      { opacity: 0, scale: 0, rotation: -15 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        stagger: 0.045,
        duration: 0.55,
        ease: "elastic.out(1.3, 0.5)",
        scrollTrigger: { trigger: "#skills", start: "top 80%" },
      }
    );

    // ── Projects: cards bounce up with slight tilt ───────────────
    gsap.fromTo(
      '[data-animate="project-card"]',
      { opacity: 0, y: 90, scale: 0.88, rotation: -2 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        stagger: 0.14,
        duration: 1.1,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: "#projects", start: "top 80%" },
      }
    );

    // ── Contact: items slam in from right ────────────────────────
    gsap.fromTo(
      '[data-animate="contact-item"]',
      { opacity: 0, x: 70, scale: 0.92 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.9,
        ease: "elastic.out(1, 0.55)",
        scrollTrigger: { trigger: "#contact", start: "top 82%" },
      }
    );
  });

  return null;
}
