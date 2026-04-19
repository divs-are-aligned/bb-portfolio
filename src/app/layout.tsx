import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ServiceWorkerRegistration } from "@/components/shared/ServiceWorkerRegistration";
import { BackgroundGrid } from "@/components/shared/BackgroundGrid";
import { BackgroundConfigProvider } from "@/components/shared/BackgroundConfig";
import { ColorPaletteProvider } from "@/components/shared/ColorPaletteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://bartbudak.io";
const SITE_DESCRIPTION =
  "Personal portfolio of Bart Budak — software engineer and technologist building performant, accessible web experiences. Director of IT & eCommerce at Seattle Chocolate Company; design systems, accessibility, and a long-running Platycerium care catalog.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bart Budak — Software Engineer & Technologist",
    template: "%s — Bart Budak",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Bart Budak",
  authors: [{ name: "Bart Budak", url: SITE_URL }],
  creator: "Bart Budak",
  publisher: "Bart Budak",
  keywords: [
    "Bart Budak",
    "software engineer",
    "front-end engineer",
    "design systems",
    "web accessibility",
    "WCAG",
    "React",
    "Next.js",
    "TypeScript",
    "eCommerce",
    "Shopify",
    "Platycerium",
    "staghorn fern",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bart Budak — Software Engineer & Technologist",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Bart Budak",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bart Budak — Software Engineer & Technologist",
    description: SITE_DESCRIPTION,
    creator: "@bartbudak",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bart Budak",
  alternateName: "Bartosz Budak",
  url: SITE_URL,
  jobTitle: "Director of IT & eCommerce",
  worksFor: {
    "@type": "Organization",
    name: "Seattle Chocolate Company",
  },
  knowsAbout: [
    "Software engineering",
    "Design systems",
    "Web accessibility",
    "Front-end architecture",
    "React",
    "Next.js",
    "TypeScript",
    "eCommerce",
    "Shopify",
    "Platycerium care",
  ],
  sameAs: [
    "https://github.com/divs-are-aligned",
    "https://linkedin.com/in/bartbudak",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bart Budak",
  url: SITE_URL,
  inLanguage: "en-US",
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Person",
    name: "Bart Budak",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ColorPaletteProvider>
            <BackgroundConfigProvider>
              <TooltipProvider>
                <ServiceWorkerRegistration />
                <BackgroundGrid />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </TooltipProvider>
            </BackgroundConfigProvider>
          </ColorPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
