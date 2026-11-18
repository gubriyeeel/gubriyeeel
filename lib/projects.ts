export type ProjectStatus = "Live" | "Prototype" | "In development";

export type Project = {
  slug: string;
  name: string;
  /** One line: what it does, for whom. */
  tagline: string;
  kind: string;
  year: string;
  status: ProjectStatus;
  role: string;
  url?: string;
  stack: string[];
  problem: string;
  built: string[];
  decisions: { title: string; body: string }[];
  business: string[];
  next?: string;
};

const projects: Project[] = [
  {
    slug: "kainly",
    name: "Kainly",
    tagline:
      "A calorie tracker for every Juan that installs from the browser and reminds you to log.",
    kind: "Consumer product",
    year: "2026",
    status: "Live",
    role: "Product, design and engineering",
    url: "https://www.kainly.com",
    stack: ["Next.js 16", "React 19", "Better Auth", "Drizzle", "Neon Postgres", "Serwist", "Web Push"],
    problem:
      "Calorie tracking only works if people keep logging, and most people stop within days, usually because they forget. A native app adds another hurdle before day one: an app store listing, a download and an account, all before the first meal is logged.",
    built: [
      "An installable progressive web app, so it lives on the home screen without an app store.",
      "Web push reminders through the service worker, with a built-in notification tester for checking delivery.",
      "An offline fallback screen, so the app still opens without signal.",
      "Full account flow: sign-up, email verification, password reset and onboarding.",
      "Unit tests with Vitest and end-to-end tests with Playwright, plus a single verify script that runs lint, types, tests and build.",
    ],
    decisions: [
      {
        title: "Web app over native",
        body: "One codebase reaches Android and iOS (home-screen web apps support push since iOS 16.4), and releases ship instantly instead of waiting on store review.",
      },
      {
        title: "Reminders are the core feature",
        body: "Logging is a habit problem, not a database problem. Push reminders were built in from the first version, not added later.",
      },
    ],
    business: [
      "Retention is what makes a habit app work. Reminders target the exact moment people drop off.",
      "No app store fees or review queues, so experiments ship the same day.",
      "Installing from a link lowers the cost of every new user, from an ad or a shared post straight into the product.",
    ],
  },
  {
    slug: "kasya",
    name: "Kasya",
    tagline:
      "Personal finance in pesos across cash, bank and e-wallets, with budgets, recurring bills and savings goals.",
    kind: "Consumer product",
    year: "2026",
    status: "Live",
    role: "Product, design and engineering",
    url: "https://finance-app-rouge.vercel.app",
    stack: ["Next.js", "React 19", "Expo", "Better Auth", "Neon Postgres", "pnpm monorepo"],
    problem:
      "Money in the Philippines is spread across cash, bank accounts and e-wallets. Most trackers either assume one bank feed or start you on an empty screen with no idea what to do first. Both lead to the same thing: people stop logging.",
    built: [
      "Accounts, categories and transactions, with atomic bulk delete and account archiving.",
      "Transfers between accounts stored as linked transaction pairs, so balances always reconcile.",
      "Monthly budgets with spend rollups and a one-tap copy from last month.",
      "Recurring payments with weekly or monthly schedules, plus skip, pause and confirm.",
      "Savings goals with progress and a contribution history.",
      "A web app and an Expo mobile app in one monorepo, both using the same finance API.",
    ],
    decisions: [
      {
        title: "No empty first screen",
        body: "Sign-up creates starter categories plus Cash, Bank and E-wallet accounts at zero, so a new user can log their first expense in seconds instead of setting things up.",
      },
      {
        title: "Tested at real scale",
        body: "A seed script generates 100,000 transactions for one user, so filters, search and dashboards are tuned against heavy use, not a demo account.",
      },
      {
        title: "Page transitions without layout shift",
        body: "Screens hold their layout while data loads, so nothing jumps under the user's thumb.",
      },
    ],
    business: [
      "Faster first value means more sign-ups turn into active users.",
      "Correct balances are what make people trust a finance app. Linked transfers protect that trust.",
      "Sharing one API across web and mobile means the mobile app doesn't need a second backend or team.",
    ],
  },
  {
    slug: "sinag-solar",
    name: "Sinag Solar",
    tagline:
      "A quotation website for Philippine solar installers that turns a homeowner's electricity bill into a qualified lead.",
    kind: "Client website product",
    year: "2026",
    status: "Prototype",
    role: "Product, design and engineering",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    problem:
      "Many residential solar installers get work through referrals, Facebook and sales agents, and have a weak or generic website. Homeowners don't know what system size they need, and most installer sites ask for contact details before giving them anything useful.",
    built: [
      "A bill estimator: enter your monthly electricity bill and get an indicative system size, generation estimate and a conservative annual savings figure.",
      "A package recommendation and a Grid-tied vs Hybrid comparison.",
      "A proposal request flow, with a clear process and proposal scope.",
      "Calculator assumptions kept in one module, so each installer's real pricing and location data can be plugged in.",
    ],
    decisions: [
      {
        title: "Value before the form",
        body: "The only thing asked before showing an estimate is the monthly bill. Contact details come after the homeowner has seen something worth acting on.",
      },
      {
        title: "Estimates are labeled as estimates",
        body: "Savings figures are conservative, and the page separates an indicative estimate from a formal quotation. Overpromising wins clicks and loses signed contracts.",
      },
      {
        title: "Sold as a configured site, not a template",
        body: "Each installer gets their own packages, pricing and proof. That makes it a product that can be resold, not a one-off build.",
      },
    ],
    business: [
      "Inquiries arrive with the bill amount and preferred package, so sales calls start halfway through.",
      "Asking for less up front usually means more completed forms.",
      "One codebase, configured for many installers, keeps delivery cost low per client.",
    ],
    next: "Lead delivery to the installer's CRM, conversion analytics, and verified installer proof.",
  },
  {
    slug: "gow",
    name: "gow",
    tagline:
      "A webhook delivery service that retries failed deliveries, rejects duplicate events, and shows every attempt live.",
    kind: "Developer infrastructure",
    year: "2026",
    status: "Prototype",
    role: "API, worker and dashboard",
    stack: ["Go", "Gin", "PostgreSQL", "Docker", "Next.js", "Server-Sent Events", "OpenAPI"],
    problem:
      "Webhooks are how products tell other systems that something happened, like an order created or a payment cleared. When one gets lost or sent twice, someone ends up with a missing order or a double charge, and support has no way to see what went wrong.",
    built: [
      "A Go API for projects, endpoints and events, documented with an OpenAPI contract.",
      "A background worker that retries failed deliveries.",
      "Idempotency keys on publish: the same key and payload returns the original event, while the same key with different data is rejected with 409.",
      "Per-endpoint signing secrets, so receivers can verify that a webhook is real.",
      "A Next.js operations dashboard that streams delivery status live over Server-Sent Events.",
      "Health and readiness checks, configurable event retention, and a built-in load-test command.",
    ],
    decisions: [
      {
        title: "Duplicates are rejected at the door",
        body: "Clients retry when networks fail. Idempotency keys make those retries safe instead of creating a second order.",
      },
      {
        title: "Secrets stay on the server",
        body: "Project API keys are shown once at creation, and the dashboard's admin key never reaches the browser.",
      },
    ],
    business: [
      "Reliable delivery protects revenue events like orders and payments.",
      "Support can answer \"did it send?\" from the dashboard without asking an engineer.",
      "Signed payloads and idempotency are what enterprise customers check before they integrate.",
    ],
  },
  {
    slug: "claimy",
    name: "Claimy",
    tagline:
      "A research assistant that only saves a quote if it appears word for word in the source.",
    kind: "AI product",
    year: "2026",
    status: "Prototype",
    role: "Product and engineering",
    stack: ["Next.js", "TypeScript", "LLM agents", "Background jobs"],
    problem:
      "Most AI research assistants return papers that are on topic but say nothing concrete, and some will invent a quote that sounds right. For graduate students, a made-up citation isn't a small bug. It's an academic integrity problem.",
    built: [
      "An agent that breaks a research question into concepts and targeted searches, then screens papers for concrete claims.",
      "Accept, edit and reject review cards for every candidate paper and saved passage.",
      "A research ledger of exact source passages with bibliographic data.",
      "Searches that run as durable background jobs, so progress survives closing the app.",
      "A log of every AI interaction that can be attached to an academic disclosure statement.",
    ],
    decisions: [
      {
        title: "A verbatim quote gate",
        body: "No passage enters the ledger unless it exactly matches the stored source text. Anything else is rejected before a human ever sees it.",
      },
      {
        title: "Phone-first review",
        body: "Its users review papers on commutes and between classes, so the review flow was designed for a phone first and widened for desktop.",
      },
    ],
    business: [
      "In AI tools, trust is the product. A hard rule against invented quotes is easier to sell than \"usually accurate.\"",
      "The audit trail makes the tool usable under university AI policies, which opens the door to institutions, not just individuals.",
    ],
  },
  {
    slug: "comment-insight",
    name: "Comment Insight",
    tagline:
      "Turns thousands of YouTube comments into requests, questions and themes a creator can act on.",
    kind: "SaaS",
    year: "2026",
    status: "In development",
    role: "Product spec and engineering",
    stack: ["Next.js", "PostgreSQL", "Drizzle", "Docker", "LLM clustering"],
    problem:
      "Creators with 10k to 1M subscribers get more comments than they can read. Repeated questions get missed, video requests get buried, and recurring complaints get noticed too late.",
    built: [
      "Import from a channel, video or playlist using an ID, a handle or a pasted YouTube URL.",
      "Comments grouped into labeled themes, with top requests, frequent questions and sentiment.",
      "A dashboard built for creators, not analysts, with no raw-data digging needed.",
    ],
    decisions: [
      {
        title: "Predictable AI costs",
        body: "Analysis runs over bounded time windows with a deterministic fallback, so model costs per customer stay predictable. That keeps the pricing sustainable.",
      },
      {
        title: "Accept whatever the creator pastes",
        body: "IDs, handles and full URLs are all resolved to the right channel or video. Asking creators to find a channel ID is a drop-off point.",
      },
    ],
    business: [
      "Gives creators content ideas their audience is already asking for.",
      "Bounded costs per account make a subscription price that holds up as usage grows.",
    ],
  },
  {
    slug: "illustrify",
    name: "Illustrify",
    tagline:
      "AI-generated picture books for teachers, built around the lesson they're teaching.",
    kind: "AI product · Capstone",
    year: "2025",
    status: "Live",
    role: "Capstone team: engineering and release pipeline",
    url: "https://www.illustrify.app",
    stack: ["Next.js", "TypeScript", "AI text and image generation", "Vercel", "GitHub Actions"],
    problem:
      "Teachers often make their own classroom materials on their own time. A picture book that fits a specific lesson, reading level and class usually doesn't exist, and making one by hand takes hours.",
    built: [
      "Story generation by educational theme and reading level.",
      "AI illustrations in several styles, with consistent characters across pages.",
      "Accessibility options, including high contrast and dyslexia-friendly fonts.",
      "A release pipeline: conventional commits drive versioning, release notes and production deploys, with manual staging deploys for testing.",
    ],
    decisions: [
      {
        title: "Built for teachers, not students",
        body: "No student accounts or devices. Everything is designed around teacher-led lessons, which keeps it simple and avoids collecting children's data.",
      },
      {
        title: "Automated releases",
        body: "With several people shipping, versioning and deploys came from commit history instead of someone remembering to do them.",
      },
    ],
    business: [
      "Saves teachers prep time, which is what schools and individual teachers will actually pay for.",
      "Not having student accounts removes the hardest part of selling to schools: child data privacy.",
    ],
  },
];

export async function getProjects() {
  return projects;
}

export async function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
