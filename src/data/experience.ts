export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = present
  prose: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "seattle-chocolate",
    company: "Seattle Chocolate Company",
    title: "Director of IT & eCommerce",
    location: "Seattle, WA",
    startDate: "Dec 2024",
    endDate: null,
    prose:
      "I came on board to help level up the company's engineering, eCommerce, and accessibility practice. Day-to-day IT is handled by an external provider, with me filling in where an in-house engineer is needed, from Klaviyo and Shopify to whatever else breaks that day. On the eCommerce side I own maevechocolate.com and jcocochocolate.com, setting direction and working closely with ViewSource, our web partner. Marketing isn't in the title, but it's been the most fun part of the role. My fiancée and I both loved Dungeon Crawler Carl, and since we work together, a conversation about doing something with it felt natural. We reached out to Matt Dinniman. He said yes. Maeve became the first Dungeon Crawler Carl food collaboration. I consulted on the product, designed the Princess Donut PR box, and launched the takeover storefront with ViewSource. The first week we ran out of chocolate, and the campaign is now the biggest moment in Maeve's history.",
    highlights: [
      "Helped Maeve become the first Dungeon Crawler Carl food collaboration. Consulted on the partnership, designed the Princess Donut PR box, and launched the takeover storefront with ViewSource. First-week demand outran supply, and the campaign is now the brand's most viral moment.",
      "Own IT and eCommerce across the portfolio, including the Maeve rebrand for a younger, millennial audience and jcocochocolate.com. In-house bridge between external IT, marketing, and engineering.",
      "De-facto internal tech consultant across Klaviyo, Shopify, Outlook, and whatever else breaks that day.",
    ],
  },
  {
    id: "mckinsey-senior",
    company: "McKinsey & Company",
    title: "Senior Software Engineer",
    location: "Boston, MA",
    startDate: "Apr 2021",
    endDate: "Dec 2024",
    prose:
      "The McKinsey Design System was used by more than a thousand engineers across the Firm, and I spent most of my time keeping its core repos healthy. That meant shipping and maintaining the design-tokens repo, the Bootstrap theme that older teams still depended on, and the React component library, which is where most of our users lived. Releases went out as internal npm packages via JFrog. I worked closely with the Figma team to keep tokens in sync across code and design. When other teams hit a stubborn CSS or React state problem, I was often the person they pulled in. Mentoring was the other half of the job. Through the Firm's apprenticeship program I worked with two colleagues from non-technical backgrounds and helped them grow into engineers. I also sat on interviews and ran informal mentorship for juniors, covering the fundamentals of JavaScript, React, and CSS, especially the parts tutorials tend to skip.",
    highlights: [
      "Shipped and maintained the core repos of the McKinsey Design System: design tokens, Bootstrap theme, and React component library. Distributed as internal npm packages via JFrog and kept in sync with Figma.",
      "Often the person other teams reached out to for complex UI work, especially the layout, state, or accessibility problems that wouldn't crack on their own.",
      "Mentored two apprentices from non-technical backgrounds into engineering roles, plus ongoing mentorship of junior hires through interviews, pairing, and the fundamentals of JavaScript, React, and CSS.",
    ],
  },
  {
    id: "mckinsey-mid",
    company: "McKinsey & Company",
    title: "Software Engineer",
    location: "New York City, NY",
    startDate: "Nov 2019",
    endDate: "Apr 2021",
    prose:
      "I started at the Firm as a contractor and built what became the McKinsey Design System documentation portal. It was the shared source of truth where designers and engineers could learn the Firm's brand, visual language, and component patterns. The first version shipped in Gatsby, but I hit enough friction with it that I eventually rebuilt the whole thing in Next.js. On the developer-experience side, I wrote a small Node CLI scaffolder that set up new engineers in minutes instead of days. It handled Git auth, Homebrew, VS Code, and extensions, all branching on the engineer's role and project. Not flashy work, but it saved real time.",
    highlights: [
      "Built and owned the McKinsey Design System documentation portal, the shared source of truth for brand, tokens, and components. Later ported the whole thing from Gatsby to Next.js.",
      "Wrote a Node CLI scaffolder that set up new engineers from zero, covering Git, Homebrew, VS Code, and extensions, all branching on role and project.",
    ],
  },
  {
    id: "uhg",
    company: "Optum (UnitedHealth Group)",
    title: "Software Engineer",
    location: "Basking Ridge, NJ",
    startDate: "Jan 2017",
    endDate: "Nov 2019",
    prose:
      "This is where I got my start. I joined Optum's Technology Development Program as a system analyst, and after my first rotation I knew I wanted to work on the web. I spent an evening at a Starbucks teaching myself React, showed up to the hiring manager the next morning with a working app, and asked to join the team. It worked. From there, I shipped and maintained a record-keeping platform for medical providers used by thousands of physicians and staff. It's also where I found web accessibility, almost by accident. Most of the engineers around me were more interested in blockchain and Java, and HTML, CSS, and JS were treated as less serious work. I didn't see it that way, and digging into the fundamentals no one else wanted became my opening into accessibility. I eventually pitched my PM on a broader color-palette overhaul, with more conviction than experience at the time, and some of it stuck. I also started an informal mentorship group with other TDP folks who wanted to learn web. That was the first time teaching engineering felt as good to me as writing it.",
    highlights: [
      "Self-taught into my first engineering role. Joined Optum's Technology Development Program as a system analyst, taught myself React in a single coffee-shop evening, and asked my way onto the web team the next morning.",
      "Shipped and maintained a record-keeping platform for medical providers, serving thousands of users in the healthcare space.",
      "Became the team's accessibility-and-fundamentals person when others weren't interested in the work, and ran an informal mentorship group for other TDP folks learning web.",
    ],
  },
];
