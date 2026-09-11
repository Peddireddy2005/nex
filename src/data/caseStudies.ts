// ---------------------------------------------------------------------------
// Case Study data model
// ---------------------------------------------------------------------------
// This file is the single source of truth for everything shown on the
// Work / Case Studies page (/work-preview and /work-preview/:slug).
//
// HOW TO ADD A NEW PROJECT
// 1. Add a new object to the `caseStudies` array below.
// 2. Drop any real visuals in `public/work/<slug>/` (see `screenshots`).
// 3. That's it — the grid, filters, and detail page are all data-driven
//    and will pick up the new entry automatically. You never need to
//    touch a page component to add a project.
//
// HONESTY RULES (do not remove numbers to make a project look better,
// and do not add numbers to make a project look more impressive):
// - `status: "client"`   -> only use verified, real client information.
//   Leave `metrics`, `testimonial`, or `results` empty/null rather than
//   inventing a number or quote.
// - `status: "demo"` / "concept" -> every metric MUST be marked
//   type: "demo" or "illustrative" so the UI can label it as such.
//   Never mark a demo/concept metric as type: "real".
// ---------------------------------------------------------------------------

export type ProjectStatus = "client" | "internal" | "demo" | "concept";

export type MetricType = "real" | "demo" | "illustrative";

export interface Metric {
  value: string;
  label: string;
  type: MetricType;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ArchitectureNode {
  label: string;
  description: string;
}

export interface BeforeAfterRow {
  label: string;
  before: string;
  after: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

export interface CaseStudy {
  slug: string;
  status: ProjectStatus;
  /** e.g. "MatchOn" or "Nexubotics" (for internal/demo/concept work) */
  client: string;
  /** Outcome-oriented card + hero title */
  title: string;
  /** One sentence explaining the value delivered */
  summary: string;
  /** Filter categories this project should appear under */
  category: string[];
  /** Short tags shown on the card (services / focus areas) */
  tags: string[];

  /**
   * Real screenshots/visuals for this project, placed in
   * `public/work/<slug>/`. Leave empty for projects that don't have
   * verified real visuals yet — the UI will render a clean labeled
   * placeholder frame instead of a fabricated or stock image.
   */
  screenshots: string[];
  /** Short label used inside the placeholder frame when screenshots is empty */
  visualLabel: string;

  problem: string;
  solution: string;
  /** "What We Built" bullet list */
  built: string[];

  /** Leave empty rather than filling with an invented number */
  metrics: Metric[];

  architecture?: ArchitectureNode[];
  /** Optional numbered process/workflow steps, shown instead of/alongside architecture */
  process?: ProcessStep[];
  beforeAfter?: BeforeAfterRow[];

  stack: string[];
  services: string[];

  /** Only ever populate with a genuine, verified quote */
  testimonial: Testimonial | null;
  /** Only ever populate when backed by real, verified evidence */
  results: string | null;

  ctaText: string;
}

export const CATEGORIES = [
  "All",
  "AI & Automation",
  "Web Development",
  "Lead Generation",
  "Custom Software",
  "Business Automation",
] as const;

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  client: "Client Project",
  internal: "Internal Build",
  demo: "Nexubotics Demo",
  concept: "Nexubotics Concept",
};

export const caseStudies: CaseStudy[] = [
  // -------------------------------------------------------------------
  // REAL CLIENT PROJECT — verified information only.
  // -------------------------------------------------------------------
  {
    slug: "matchon-cricket-camp",
    status: "client",
    client: "MatchOn",
    title: "A complete digital front door for a modern cricket camp",
    summary:
      "A conversion-focused website with a full registration and payment flow, built and deployed for MatchOn's cricket camp.",
    category: ["Web Development"],
    tags: ["Web Development", "Registration", "Payments", "Sports"],
    screenshots: [],
    visualLabel: "MatchOn — matchonleague.com",
    problem:
      "MatchOn needed a professional digital presence that could communicate the camp experience and handle registrations, payments, and communication in one connected place — instead of juggling separate signup forms, messages, and manual payment tracking.",
    solution:
      "We designed and built a modern, conversion-focused website with a seamless registration flow, secure payment integration, and a mobile-first experience, then connected it to MatchOn's custom domain for a fully branded launch.",
    built: [
      "Marketing site with a mobile-first layout",
      "End-to-end registration flow",
      "Secure online payment collection",
      "Automated confirmation emails",
      "Custom domain connected to production hosting",
    ],
    metrics: [
      { value: "Live", label: "Production status", type: "real" },
      { value: "Web + Mobile", label: "Responsive coverage", type: "real" },
    ],
    stack: ["TanStack Start", "Tailwind CSS", "Supabase", "Razorpay", "EmailJS", "Vercel"],
    services: ["Web Design & Development", "Registration System", "Payment Integration"],
    testimonial: null,
    results: null,
    ctaText: "Have a similar project? Let's build it.",
  },

  // -------------------------------------------------------------------
  // DEMO PROJECTS — capability demonstrations. Every metric below is
  // illustrative/demo data, clearly labeled as such in the UI.
  // -------------------------------------------------------------------
  {
    slug: "ai-customer-support-agent",
    status: "demo",
    client: "Nexubotics",
    title: "An AI support agent that resolves the repetitive stuff on its own",
    summary:
      "A 24/7 AI chat agent that understands product context and resolves common queries automatically, escalating only what genuinely needs a human.",
    category: ["AI & Automation"],
    tags: ["AI & Automation", "Chatbot", "Customer Support"],
    screenshots: [],
    visualLabel: "AI Customer Support Chatbot — Demo",
    problem:
      "Support teams get buried under repetitive, low-complexity questions — order status, account info, basic troubleshooting — which delays response times for the cases that actually need a human.",
    solution:
      "We designed an AI support agent trained on product documentation and common ticket patterns, able to hold natural multi-turn conversations, pull account context, and hand off cleanly to a human when a query is out of scope.",
    built: [
      "Natural-language chat widget",
      "Product/doc knowledge base grounding",
      "Escalation-to-human handoff logic",
      "Multi-language support",
      "WhatsApp and website integration",
    ],
    metrics: [
      { value: "82%", label: "Queries resolved automatically", type: "illustrative" },
      { value: "< 30 sec", label: "Average response time", type: "illustrative" },
      { value: "24/7", label: "Availability", type: "illustrative" },
      { value: "3.2x", label: "More conversations handled", type: "illustrative" },
    ],
    architecture: [
      { label: "User Query", description: "Customer message arrives via chat widget or WhatsApp." },
      { label: "AI Agent", description: "Understands intent and retrieves relevant knowledge base context." },
      { label: "Resolution / Escalation", description: "Answers directly, or routes to human support with full context." },
    ],
    stack: ["OpenAI", "n8n", "Supabase", "WhatsApp API"],
    services: ["AI Chatbots", "Knowledge Base Integration"],
    testimonial: null,
    results:
      "This is a Nexubotics capability demo, not a measured client outcome. Metrics shown illustrate what a well-scoped support agent can achieve and will be replaced with verified numbers once a client deployment has real data.",
    ctaText: "Have a similar problem? Let's build it.",
  },

  {
    slug: "lead-qualification-engine",
    status: "demo",
    client: "Nexubotics",
    title: "Turning inbound form fills into qualified sales conversations",
    summary:
      "An automated pipeline that captures leads, qualifies them with AI, and routes only the good ones straight to the sales team.",
    category: ["Lead Generation", "AI & Automation"],
    tags: ["Lead Generation", "AI Qualification", "CRM"],
    screenshots: [],
    visualLabel: "Lead Qualification Engine — Demo",
    problem:
      "Generic contact forms don't ask the right qualifying questions, so sales teams end up manually sorting through a mix of genuine prospects and unqualified noise — and by the time someone follows up, the lead has gone cold.",
    solution:
      "We built an automated lead-generation system that captures form submissions, uses AI to score and qualify each lead against defined criteria, then routes qualified leads directly into the CRM with an instant sales notification.",
    built: [
      "Custom lead capture forms",
      "AI-based qualification scoring",
      "CRM auto-routing",
      "Instant sales team notifications",
      "Follow-up sequence automation",
    ],
    metrics: [
      { value: "3.4x", label: "More qualified opportunities", type: "illustrative" },
      { value: "< 5 min", label: "Response time", type: "illustrative" },
      { value: "18%", label: "Qualification rate", type: "illustrative" },
    ],
    architecture: [
      { label: "Website / Landing Page", description: "Prospect submits a lead capture form." },
      { label: "AI Qualification", description: "Lead is scored against ICP and intent signals." },
      { label: "CRM + Notification", description: "Qualified leads sync to CRM and alert the sales team instantly." },
    ],
    beforeAfter: [
      { label: "Manual work", before: "Hours/week reviewing raw form submissions", after: "Automated scoring on arrival" },
      { label: "Response time", before: "Delayed, ad-hoc follow-up", after: "Instant notification" },
      { label: "People involved", before: "Multiple team members", after: "1 person to review qualified leads" },
    ],
    stack: ["OpenAI", "n8n", "HubSpot", "Slack"],
    services: ["Lead Generation", "CRM Integration", "Workflow Automation"],
    testimonial: null,
    results:
      "This is a Nexubotics capability demo. Figures illustrate the kind of lift a qualification layer can produce and are not measured results from a paying client.",
    ctaText: "Have a similar problem? Let's build it.",
  },

  {
    slug: "business-workflow-automation",
    status: "demo",
    client: "Nexubotics",
    title: "Replacing hours of manual data entry with one connected workflow",
    summary:
      "An automated workflow that removes repetitive manual steps from a business process, from data entry to notifications.",
    category: ["Business Automation"],
    tags: ["Automation", "Workflows", "Integrations"],
    screenshots: [],
    visualLabel: "Business Workflow Automation — Demo",
    problem:
      "Teams lose hours every week on repetitive tasks — data entry, follow-ups, status updates — spread across disconnected tools, which slows everything down and invites human error.",
    solution:
      "We mapped the manual workflow end-to-end and rebuilt it as an automated pipeline, connecting existing tools so information flows between them without anyone re-typing it.",
    built: [
      "Workflow mapping and redesign",
      "Tool-to-tool integrations",
      "Automated notifications",
      "Error handling and monitoring",
    ],
    metrics: [
      { value: "80%", label: "Process automated", type: "illustrative" },
      { value: "5x", label: "Time saved", type: "illustrative" },
      { value: "3 hrs/week", label: "Manual work remaining (from 18 hrs)", type: "illustrative" },
      { value: "1", label: "Person required (from multiple)", type: "illustrative" },
    ],
    beforeAfter: [
      { label: "Manual steps", before: "5 manual steps", after: "1 manual step" },
      { label: "Time / week", before: "18 hrs/week (manual)", after: "3 hrs/week (automated)" },
      { label: "People involved", before: "Multiple", after: "1" },
      { label: "Notifications", before: "Delayed follow-up", after: "Instant" },
    ],
    process: [
      { title: "Form Submission", description: "Incoming request or data entry point is captured automatically." },
      { title: "AI Processing", description: "Data is validated, categorized, and enriched without manual review." },
      { title: "CRM Update", description: "Records are created or updated in the connected business tools." },
      { title: "Notifications", description: "Relevant team members are alerted instantly, not at end-of-day." },
      { title: "Follow-up", description: "Any remaining action is queued automatically for the one person still involved." },
    ],
    stack: ["n8n", "Make", "Zapier", "Google Workspace", "Slack"],
    services: ["Business Automation", "Systems Integration"],
    testimonial: null,
    results:
      "This is a Nexubotics capability demo illustrating a typical workflow-automation engagement. Numbers are illustrative, not measured client results.",
    ctaText: "Have a similar problem? Let's build it.",
  },

  {
    slug: "custom-business-dashboard",
    status: "demo",
    client: "Nexubotics",
    title: "A single dashboard that replaces five spreadsheets",
    summary:
      "A custom-built operational dashboard that brings scattered business data into one live, easy-to-read view.",
    category: ["Custom Software"],
    tags: ["Custom Software", "Analytics", "Dashboard"],
    screenshots: [],
    visualLabel: "Custom Business Dashboard — Demo",
    problem:
      "Business data lives across spreadsheets, tools, and inboxes, so getting a real-time view of what's happening means stitching together reports by hand.",
    solution:
      "We built a custom web dashboard that pulls data from a business's existing tools into one live view, with role-based access and the specific metrics that matter to that business.",
    built: [
      "Custom data dashboard UI",
      "Role-based admin access",
      "Live data sync from source systems",
      "Exportable reporting views",
    ],
    metrics: [
      { value: "12.4K", label: "Monthly active users", type: "illustrative" },
      { value: "99.9%", label: "Uptime", type: "illustrative" },
      { value: "1.2s", label: "Average response time", type: "illustrative" },
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Vercel"],
    services: ["Custom Software", "Dashboards & Analytics"],
    testimonial: null,
    results:
      "This is a Nexubotics capability demo showing dashboard UI and typical performance targets for a custom software build — not measured usage from a live client deployment.",
    ctaText: "Have a similar problem? Let's build it.",
  },

  // -------------------------------------------------------------------
  // CONCEPT PROJECT — proposed solution / visual prototype, no implied
  // deployment.
  // -------------------------------------------------------------------
  {
    slug: "high-converting-business-website",
    status: "concept",
    client: "Nexubotics",
    title: "A premium website concept built around conversion, not decoration",
    summary:
      "A conversion-oriented website concept showing how structure, hierarchy, and messaging can be engineered to turn visitors into leads.",
    category: ["Web Development"],
    tags: ["Web Development", "Conversion Design"],
    screenshots: [],
    visualLabel: "High-Converting Business Website — Concept",
    problem:
      "Many small business websites are built to look nice, not to convert — there's no clear path from landing on the page to taking action.",
    solution:
      "We designed a concept landing page structured around a single conversion goal, with a clear value proposition, proof section, and repeated calls to action placed where visitor intent is highest.",
    built: [
      "Conversion-focused page structure",
      "Above-the-fold value proposition",
      "Proof / trust section layout",
      "Repeated, contextual CTAs",
    ],
    metrics: [],
    stack: ["React", "Tailwind CSS"],
    services: ["Web Design", "Conversion Strategy"],
    testimonial: null,
    results:
      "This is a Nexubotics concept — a visual prototype exploring conversion-oriented structure. It has not been deployed for a client and carries no performance claims.",
    ctaText: "Want this built for your business? Let's talk.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
