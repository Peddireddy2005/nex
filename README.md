# NEXUBOTICS

**Smarter Workflows. Faster Growth. Powered by AI.**

An autonomous AI platform designed to streamline processes and accelerate business growth through intelligent automation and conversational AI solutions.

## Overview

Nexubotics is a cutting-edge AI-powered platform that brings speed, style, and intelligence to workflow automation. Our platform leverages advanced AI chatbot interfaces to help businesses optimize their operations and achieve faster growth.

## Features

- **AI-Powered Automation**: Intelligent automation solutions for streamlined workflows
- **Conversational AI**: Advanced chatbot interfaces for seamless user interactions
- **Business Intelligence**: Accelerate growth through smart automation
- **Scalable Solutions**: Built to grow with your business needs

## Tech Stack

This project is built with:
- **TypeScript**: 97.5%
- **CSS**: 2.3%
- **HTML**: 0.2%

## Getting Started

### Prerequisites
- Node.js and npm/yarn
- TypeScript knowledge

### Installation

```bash
git clone https://github.com/nexubotics-arch/nexuboticsweb.git
cd nexuboticsweb
npm install
```

### Development

```bash
npm run dev
```

## Work / Case Studies page (preview)

A reusable portfolio + case-study system lives at `/work-preview` (list) and
`/work-preview/:slug` (detail). It is intentionally **not** linked from the
Navbar and is marked `noindex` — it's a preview route until the page is
approved for public launch. To publish it: add a "Work" link to
`src/components/layout/Navbar.tsx`, remove `noindex: true` from the
`useSEO(...)` calls in `src/pages/Work.tsx` and `src/pages/CaseStudyDetail.tsx`,
and optionally move the route from `/work-preview` to `/work`.

**Everything is data-driven.** To add a new project, you never need to touch
a page or route:

1. Open `src/data/caseStudies.ts` and add a new object to the `caseStudies`
   array (see the type comments at the top of the file for every field).
2. Drop any real screenshots/visuals in `public/work/<slug>/` and reference
   them in that project's `screenshots` array. Leave `screenshots` empty to
   show a clean, honestly-labeled placeholder instead of a fake image.
3. Save. The new project automatically appears in the grid, respects the
   category filters, and renders on its own detail page through the shared
   template — no new component required.

**Status system** (`status` field): `client` (real, verified work — MatchOn
is the first), `internal`, `demo`, and `concept`. Only `client` projects may
show `results`/`testimonial`; every `demo`/`concept` metric must be tagged
`type: "demo"` or `"illustrative"` so the UI labels it honestly instead of
implying a real client outcome.

Reusable building blocks live in `src/components/work/`: `CaseStudyCard`,
`StatusBadge`, `VisualFrame`, `MetricStrip`, `ProblemSolution`
(`ProblemSection` + `SolutionSection`), `SystemArchitecture`, `ProcessFlow`,
`BeforeAfter`, `TechStack`, `Testimonial`, `ServiceFilter`, `CTASection`.

## Links

- **Website**: [nexubotics.in](https://www.nexubotics.in)
- **GitHub Organization**: [NexuBotics](https://github.com/NexuBotics)

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is part of the Nexubotics platform.
