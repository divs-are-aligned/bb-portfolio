import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bart Budak — Portfolio",
    short_name: "BartBudak",
    description:
      "Personal portfolio of Bart Budak — software engineer building performant, accessible web experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#080B10",
    theme_color: "#080B10",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
