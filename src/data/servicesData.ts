import React from "react";
import {
  Monitor,
  Layers,
  Database,
  Building2,
  Cpu,
  Smartphone,
  Cloud,
  TrendingUp,
  Workflow,
  ShieldCheck,
  Zap,
  Boxes,
  Lock,
  GitMerge,
  BarChart3,
  Globe2,
} from "lucide-react";

export interface ServiceMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ServiceCapability {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceProcessStep {
  number: string;
  title: string;
  timeframe: string;
  description: string;
  points: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  category: "engineering" | "enterprise" | "cloud_ai" | "growth";
  categoryLabel: string;
  title: string;
  shortTitle: string;
  tagline: string;
  heroHeadline: string;
  heroHighlight: string;
  description: string;
  extendedDescription: string;
  iconName: string;
  primaryImage: string;
  secondaryImage: string;
  imageCaption: string;
  interactiveWidgetType:
    | "web-speed"
    | "saas-mrr"
    | "crm-pipeline"
    | "erp-inventory"
    | "ai-stream"
    | "mobile-preview"
    | "devops-cluster"
    | "growth-attribution";
  businessProblem: {
    problemTitle: string;
    problemDescription: string;
    painPoints: string[];
  };
  solutionTransformation: {
    solutionTitle: string;
    solutionDescription: string;
    keyAdvantages: string[];
  };
  businessImpact: {
    roiHeadline: string;
    outcomes: {
      label: string;
      value: string;
      desc: string;
    }[];
  };
  metrics: ServiceMetric[];
  capabilities: ServiceCapability[];
  deliverables: string[];
  architectureOverview: string;
  architectureHighlights: string[];
  techStack: {
    category: string;
    technologies: string[];
  }[];
  process: ServiceProcessStep[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-applications",
    slug: "web-applications",
    category: "engineering",
    categoryLabel: "Web Engineering",
    title: "Web Application Development",
    shortTitle: "Web Applications",
    tagline: "High-performance, reactive, pixel-perfect web platforms",
    heroHeadline: "Ultra-fast web apps engineered for",
    heroHighlight: "maximum scale and engagement.",
    description:
      "We engineer fast, resilient, and accessible web applications utilizing modern frameworks like React, Next.js, and TypeScript. From high-throughput client portals to real-time collaboration suites, we ensure sub-second response times and unmatched UX fidelity.",
    extendedDescription:
      "Our web engineering philosophy marries strict performance budgets with fluid, tactile interactions. We eliminate latency through edge-rendering, optimize Core Web Vitals to the 99th percentile, and build accessible, WCAG-compliant design systems that scale effortlessly across global user bases.",
    iconName: "Monitor",
    primaryImage: "/services/web-abstract.jpg",
    secondaryImage: "/services/web-app-arch.jpg",
    imageCaption: "White Light Luminous Curves & Translucent Glass Prisms",
    interactiveWidgetType: "web-speed",
    businessProblem: {
      problemTitle: "The High Cost of Sluggish, Fragile Web Architectures",
      problemDescription:
        "Outdated monolithic web applications suffer from slow load times, frequent downtime during traffic spikes, poor mobile responsiveness, and disconnected data silos. Every second of latency directly reduces conversion rates and drives frustrated users to competitors.",
      painPoints: [
        "1-second delay in page load time causes a 7% drop in customer conversions",
        "Legacy codebases prevent rapid product iterations and feature deployments",
        "Poor Core Web Vitals directly damage organic Google search rankings",
        "Inability to handle concurrent traffic spikes during marketing campaigns",
      ],
    },
    solutionTransformation: {
      solutionTitle: "How Our Custom Web Engineering Transforms Your Business",
      solutionDescription:
        "We replace bloated legacy systems with modular, edge-rendered Next.js/React web applications. By utilizing optimistic state updates, distributed edge caching, and real-time WebSockets, we create buttery-smooth web experiences that convert visitors into loyal customers.",
      keyAdvantages: [
        "Sub-100ms interaction latency with edge-side server rendering (SSR)",
        "Real-time multi-user collaboration with zero data collision",
        "100% responsive design tokens built with Tailwind CSS & Radix UI primitives",
        "Automated CI/CD pipelines enabling daily zero-downtime feature releases",
      ],
    },
    businessImpact: {
      roiHeadline: "Proven Business Outcomes from Modern Web Architecture",
      outcomes: [
        {
          label: "Conversion Boost",
          value: "+45%",
          desc: "Average increase in customer conversions following UI/performance overhaul",
        },
        {
          label: "Bounce Rate Reduction",
          value: "-58%",
          desc: "Achieved via instant sub-second edge page loads and fluid navigation",
        },
        {
          label: "Feature Velocity",
          value: "3.5x",
          desc: "Faster release cycles with modular TypeScript component design systems",
        },
      ],
    },
    metrics: [
      {
        value: "99.9%",
        label: "Lighthouse Performance",
        detail: "Near-perfect scores across Performance, Accessibility, and SEO",
      },
      {
        value: "< 100ms",
        label: "Edge Interaction Latency",
        detail: "Optimized server-side rendering and client cache pipelines",
      },
      {
        value: "45%",
        label: "Average Conversion Boost",
        detail: "Driven by fluid micro-interactions and instant page transitions",
      },
    ],
    capabilities: [
      {
        title: "Progressive Web Apps (PWA)",
        description: "Offline-first capability with service workers, instant local caching, and seamless cross-platform desktop & mobile installation.",
        iconName: "Zap",
      },
      {
        title: "Real-Time Collaborative State",
        description: "WebSocket and server-sent event (SSE) infrastructures enabling instant multi-user synchronization, live cursors, and data streaming.",
        iconName: "Workflow",
      },
      {
        title: "Edge Rendering & SSR",
        description: "Dynamic edge computing on Vercel and Cloudflare for instant worldwide page delivery and top-tier search crawler indexing.",
        iconName: "Globe2",
      },
      {
        title: "Tailored Design Systems",
        description: "Robust, themeable component libraries built with Tailwind CSS and Radix UI primitives ensuring consistent design tokens.",
        iconName: "Boxes",
      },
    ],
    deliverables: [
      "Production-ready Next.js / React application codebase",
      "Full TypeScript typing with strict linting and test coverage",
      "Responsive, mobile-optimized UI across all screen breakpoints",
      "Comprehensive Core Web Vitals optimization audit",
      "CI/CD deployment pipelines on Vercel, AWS, or Docker",
      "Interactive component documentation & Storybook setup",
    ],
    architectureOverview:
      "A modern decoupled architecture combining edge-rendered frontend components with high-throughput API endpoints, cached by distributed CDNs and resilient database replicas.",
    architectureHighlights: [
      "Edge-side hydration with selective partial prerendering",
      "State management using TanStack Query and Zustand",
      "End-to-end type safety from database schema to UI components",
      "Automated visual regression & unit test pipelines",
    ],
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"],
      },
      {
        category: "Data & State",
        technologies: ["TanStack Query", "Zustand", "GraphQL", "WebSockets", "Axios"],
      },
      {
        category: "Backend & API",
        technologies: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Prisma"],
      },
      {
        category: "Deployment & QA",
        technologies: ["Vercel", "AWS CloudFront", "Docker", "Playwright", "Jest", "Sentry"],
      },
    ],
    process: [
      {
        number: "01",
        title: "UX Architecture & Wireframes",
        timeframe: "Week 1–2",
        description: "User journey mapping, design token definitions, and high-fidelity clickable prototypes in Figma.",
        points: ["Design system blueprint", "Interactive component wireframes", "Information architecture"],
      },
      {
        number: "02",
        title: "Component & API Scaffolding",
        timeframe: "Week 3–5",
        description: "Building responsive UI components, setting up state stores, and integrating backend REST/GraphQL endpoints.",
        points: ["Full TypeScript contract", "Responsive component library", "Mock API integration"],
      },
      {
        number: "03",
        title: "Real-time Logic & Testing",
        timeframe: "Week 6–8",
        description: "Implementing live WebSocket channels, complex forms, authentication states, and end-to-end tests.",
        points: ["Role-based access", "Cross-browser testing", "Performance profiling"],
      },
      {
        number: "04",
        title: "Edge Deployment & Launch",
        timeframe: "Week 9+",
        description: "Zero-downtime global rollout with CDN cache tuning, telemetry monitoring, and Core Web Vitals checks.",
        points: ["Production CDN configuration", "Error monitoring with Sentry", "Post-launch warranty"],
      },
    ],
    faq: [
      {
        question: "How do you ensure fast load times for web applications?",
        answer: "We employ edge SSR, dynamic code splitting, smart prefetching, optimized asset pipelines, and minimal client-side JavaScript execution.",
      },
      {
        question: "Can you migrate legacy web apps to modern Next.js/React?",
        answer: "Yes, we frequently execute incremental migrations using the Strangler Fig pattern, ensuring zero operational downtime for your existing users.",
      },
    ],
  },
  {
    id: "saas",
    slug: "saas",
    category: "engineering",
    categoryLabel: "Cloud Platforms",
    title: "SaaS Platform Development",
    shortTitle: "SaaS Platforms",
    tagline: "Multi-tenant cloud platforms engineered for hyperscale",
    heroHeadline: "Mission-critical SaaS platforms built for",
    heroHighlight: "multi-tenant scale and exponential ARR.",
    description:
      "End-to-end SaaS platform engineering — multi-tenant database partitioning, automated subscription billing, real-time analytics, user dashboards, and role-based permissions designed to support thousands of concurrent enterprise organizations.",
    extendedDescription:
      "Building a scalable SaaS requires more than code: it demands bulletproof tenant isolation, frictionless self-serve onboarding, tiered pricing logic with Stripe/Paddle, real-time webhook infrastructure, and granular telemetry. We take you from early MVP to enterprise readiness.",
    iconName: "Layers",
    primaryImage: "/services/saas-abstract.jpg",
    secondaryImage: "/services/saas-arch.jpg",
    imageCaption: "Concentric Glass Discs with Radiant White Glowing Core",
    interactiveWidgetType: "saas-mrr",
    businessProblem: {
      problemTitle: "The Growth Ceiling of Fragile Single-Tenant Platforms",
      problemDescription:
        "Building a software business on improvised architecture creates catastrophic scalability limits: tenant data leaks, billing glitches during upgrades, manual customer onboarding, and an inability to sell to security-conscious enterprise buyers who demand SOC2 compliance and SAML SSO.",
      painPoints: [
        "Cross-tenant data contamination risks leading to critical legal liabilities",
        "Failed billing events and manual invoice adjustments eroding ARR",
        "Lack of enterprise SAML/SSO blocking 6-figure enterprise deals",
        "Crippling database locks when high-volume tenants run heavy queries",
      ],
    },
    solutionTransformation: {
      solutionTitle: "How Our Custom SaaS Engine Drives Exponential Revenue",
      solutionDescription:
        "We build hardened multi-tenant SaaS foundations with PostgreSQL Row-Level Security (RLS), automated Stripe/Paddle billing orchestrators, granular role-based permissions, and developer-friendly webhook APIs. Your team can onboard thousands of tenants with zero manual intervention.",
      keyAdvantages: [
        "Strict database-level tenant isolation preventing data leakage",
        "Automated recurring, metered, and tiered subscription billing",
        "Enterprise-ready SAML 2.0 / OIDC integrations (Okta, Azure AD, Google)",
        "Real-time executive metrics dashboard for MRR, LTV, churn, and usage",
      ],
    },
    businessImpact: {
      roiHeadline: "Transforming Software Ideas into Scalable ARR Engines",
      outcomes: [
        {
          label: "Time-to-Market",
          value: "60% Faster",
          desc: "Launch enterprise-ready MVP in weeks instead of quarters",
        },
        {
          label: "Billing Accuracy",
          value: "99.99%",
          desc: "Automated webhook idempotency eliminates failed charges and revenue leaks",
        },
        {
          label: "Enterprise ACV",
          value: "3x Higher",
          desc: "Won enterprise contracts through built-in SAML SSO and audit logs",
        },
      ],
    },
    metrics: [
      {
        value: "10M+",
        label: "Daily Events Handled",
        detail: "High-throughput asynchronous queuing and event-driven backends",
      },
      {
        value: "99.99%",
        label: "Tenant Isolation",
        detail: "Granular row-level security and partitioned database schemas",
      },
      {
        value: "60%",
        label: "Faster Time-to-Market",
        detail: "Pre-built hardened SaaS scaffolding and modular microservices",
      },
    ],
    capabilities: [
      {
        title: "Multi-Tenant Data Architecture",
        description: "PostgreSQL Row-Level Security (RLS) or schema-per-tenant isolation ensuring complete data sovereignty and enterprise compliance.",
        iconName: "Database",
      },
      {
        title: "Subscription & Usage Billing",
        description: "Seamless integration with Stripe, LemonSqueezy, or Paddle for automated recurring tiers, metered seats, and proration logic.",
        iconName: "TrendingUp",
      },
      {
        title: "Enterprise SSO & Granular RBAC",
        description: "SAML 2.0 / OIDC integrations (Okta, Azure AD, Google Workspace) alongside customizable permission matrices.",
        iconName: "Lock",
      },
      {
        title: "Public API & Developer Webhooks",
        description: "Rate-limited API gateways with developer token management, interactive OpenAPI/Swagger docs, and reliable webhook dispatchers.",
        iconName: "GitMerge",
      },
    ],
    deliverables: [
      "Full multi-tenant backend with automated provisioning",
      "Customer onboarding portal, settings, and subscription checkout",
      "Admin analytics panel for MRR, churn, and tenant health tracking",
      "Stripe webhook listeners with idempotency guarantees",
      "Dockerized container configurations & Helm charts for cloud rollout",
      "Security audit documentation and SOC2 readiness checklist",
    ],
    architectureOverview:
      "Event-driven microservices or modular monolith backed by PostgreSQL schemas, Redis distributed caching, and asynchronous task queues (BullMQ / Celery).",
    architectureHighlights: [
      "Row-Level Security (RLS) enforcement at database level",
      "Asynchronous background worker queues for resource-heavy jobs",
      "Audit logging for every mutation with tamper-resistant records",
      "Auto-scaling container clusters managed with Kubernetes or AWS ECS",
    ],
    techStack: [
      {
        category: "Core Stack",
        technologies: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Prisma"],
      },
      {
        category: "Billing & Auth",
        technologies: ["Stripe", "Paddle", "Auth0", "Clerk", "WorkOS (SSO)", "Supabase Auth"],
      },
      {
        category: "Infrastructure",
        technologies: ["AWS (ECS/EKS)", "Docker", "Terraform", "Cloudflare", "BullMQ"],
      },
      {
        category: "Monitoring",
        technologies: ["Datadog", "Sentry", "PostHog", "OpenTelemetry", "Grafana"],
      },
    ],
    process: [
      {
        number: "01",
        title: "Data Modeling & Architecture Blueprint",
        timeframe: "Weeks 1–2",
        description: "Defining tenant boundaries, database partitioning strategies, and billing tier models.",
        points: ["Multi-tenant schema design", "Billing tier specification", "Auth & SSO architecture"],
      },
      {
        number: "02",
        title: "Core Backend & Auth Engine",
        timeframe: "Weeks 3–6",
        description: "Developing the tenant isolation layer, subscription webhooks, and secure user management APIs.",
        points: ["Stripe billing engine", "RBAC & permission system", "Asynchronous job queues"],
      },
      {
        number: "03",
        title: "User & Admin Dashboards",
        timeframe: "Weeks 7–10",
        description: "Crafting modern tenant portals, high-density analytical dashboards, and customer self-service settings.",
        points: ["Interactive data tables", "Real-time notifications", "Developer API key portal"],
      },
      {
        number: "04",
        title: "Stress Testing & Enterprise Rollout",
        timeframe: "Weeks 11+",
        description: "Load testing simulated traffic surges, running penetration checks, and deploying to auto-scaling cloud clusters.",
        points: ["Penetration & security testing", "Multi-region failover", "Production launch"],
      },
    ],
    faq: [
      {
        question: "How do you handle multi-tenancy securely?",
        answer: "We implement PostgreSQL Row-Level Security (RLS) combined with application-level tenant context injection, preventing cross-tenant leakage.",
      },
      {
        question: "Can you implement metered usage-based billing?",
        answer: "Yes, we build high-precision event ingestors that aggregate API calls or feature usage and sync metered units to Stripe or Paddle in real time.",
      },
    ],
  },
  {
    id: "crms",
    slug: "crms",
    category: "enterprise",
    categoryLabel: "Enterprise Software",
    title: "Custom CRM & Customer Portals",
    shortTitle: "Custom CRMs",
    tagline: "High-velocity customer relationship platforms tailored to your sales funnel",
    heroHeadline: "Bespoke CRM systems engineered for your exact",
    heroHighlight: "sales pipeline and customer lifecycle.",
    description:
      "Off-the-shelf CRMs force your sales team to adapt to rigid workflows. We engineer tailor-made CRM platforms featuring automated lead scoring, omnichannel communication, deal Kanban boards, and instant client portals that accelerate deal velocity.",
    extendedDescription:
      "We replace bloated SaaS subscriptions with custom, lightning-fast CRM software designed around your specific conversion funnels. Integrated seamlessly with WhatsApp, Email, VOIP telephony, and payment gateways, our CRMs give your sales and support teams superpowers.",
    iconName: "Database",
    primaryImage: "/services/crm-abstract.jpg",
    secondaryImage: "/actts-crm-1.png",
    imageCaption: "Monochrome Obsidian Nodes Connected by Luminous White Rays",
    interactiveWidgetType: "crm-pipeline",
    businessProblem: {
      problemTitle: "Why Generic CRMs Cost You Deals and Massive Monthly Fees",
      problemDescription:
        "Standard CRMs like Salesforce or HubSpot cost thousands per seat each month yet force your team into convoluted click-heavy menus. Sales reps spend 40% of their day on manual data entry, deals slip through the cracks, and customer chat histories remain scattered across personal WhatsApps and inboxes.",
      painPoints: [
        "Skyrocketing monthly per-seat licensing fees that punish team growth",
        "Disjointed conversations scattered across WhatsApp, Email, and SMS",
        "Zero real-time visibility into rep performance and stalled pipeline deals",
        "Rigid stages that cannot adapt to unique multi-party sales workflows",
      ],
    },
    solutionTransformation: {
      solutionTitle: "The Bespoke CRM Advantage: Built Exclusively for Your Pipeline",
      solutionDescription:
        "We build a high-velocity custom CRM that your sales team will actually love using. Every rep gets a unified conversation timeline with 1-click WhatsApp messaging, automated follow-up sequences, instant digital proposal generators, and real-time deal stage boards.",
      keyAdvantages: [
        "Unlimited users with 100% custom ownership and zero recurring seat fees",
        "Unified WhatsApp Cloud API, Email, and Call recordings in one client thread",
        "Automated lead ingestion from Meta Ads, Google Ads, and custom landing forms",
        "Client self-service portals where prospects sign contracts and pay milestones",
      ],
    },
    businessImpact: {
      roiHeadline: "Accelerating Deal Velocity & Cutting Software Overhead",
      outcomes: [
        {
          label: "Deal Close Speed",
          value: "35% Faster",
          desc: "Automated instant follow-up triggers and 1-click WhatsApp quotes",
        },
        {
          label: "Annual Software Savings",
          value: "$45,000+",
          desc: "Saved annually by eliminating bloated per-seat monthly CRM licenses",
        },
        {
          label: "Lead Conversion Rate",
          value: "3.2x Boost",
          desc: "Zero dropped leads through automated routing and SLA reminders",
        },
      ],
    },
    metrics: [
      {
        value: "3.2x",
        label: "Lead Conversion Velocity",
        detail: "Automated routing and instant multi-channel lead engagement",
      },
      {
        value: "100%",
        label: "Pipeline Customization",
        detail: "Zero limitations on custom fields, stages, or automation triggers",
      },
      {
        value: "35%",
        label: "Sales Cycle Reduction",
        detail: "Streamlined follow-ups, proposal generation, and digital signing",
      },
    ],
    capabilities: [
      {
        title: "Omnichannel Communications Hub",
        description: "Direct integrations with WhatsApp Business API, Twilio VOIP, SendGrid email threads, and SMS within a unified client timeline.",
        iconName: "Workflow",
      },
      {
        title: "Dynamic Lead Routing & AI Scoring",
        description: "Automated lead distribution based on rep availability, geography, deal size, or predictive AI intent scores.",
        iconName: "Zap",
      },
      {
        title: "Interactive Deal Kanban & Forecasting",
        description: "Drag-and-drop sales pipeline boards with automatic stage calculations, quota tracking, and revenue forecasting.",
        iconName: "BarChart3",
      },
      {
        title: "Dedicated Client Self-Service Portals",
        description: "Secure customer-facing portals where clients track project status, review documents, sign proposals, and pay invoices.",
        iconName: "ShieldCheck",
      },
    ],
    deliverables: [
      "Custom responsive CRM web app for desktop and tablet",
      "Unified contact timeline with WhatsApp, Email, and call logs",
      "Automated lead ingestion hooks from websites, meta ads, and forms",
      "Role-based sales team permissions and activity auditing",
      "PDF proposal & invoice generator with digital signature capture",
      "Sales performance reports and executive forecasting charts",
    ],
    architectureOverview:
      "Real-time WebSocket-enabled backend syncing team activity instantaneously across all reps, with relational PostgreSQL schemas for comprehensive relational reporting.",
    architectureHighlights: [
      "Unified message thread schema connecting email, chat, and notes",
      "Background worker for drip follow-up sequences and reminders",
      "Fine-grained data export restrictions to protect proprietary leads",
      "Instant fuzzy search across hundreds of thousands of contacts",
    ],
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Lucide Icons"],
      },
      {
        category: "Backend & Queues",
        technologies: ["Node.js / Express", "FastAPI", "PostgreSQL", "Redis", "BullMQ"],
      },
      {
        category: "Integrations",
        technologies: ["WhatsApp Cloud API", "Twilio", "SendGrid", "Stripe", "DocuSign API"],
      },
      {
        category: "Infrastructure",
        technologies: ["AWS RDS", "Docker", "Redis Cache", "Nginx", "GitHub Actions"],
      },
    ],
    process: [
      {
        number: "01",
        title: "Sales Funnel Audit",
        timeframe: "Week 1–2",
        description: "Analyzing your current sales cycle, lead handoffs, lost deal reasons, and communication channels.",
        points: ["Stage-by-stage pipeline mapping", "Integration audit", "Role definition"],
      },
      {
        number: "02",
        title: "Contact Hub & Messaging Core",
        timeframe: "Week 3–5",
        description: "Scaffolding the centralized contact timeline, communication APIs, and lead ingestion pipelines.",
        points: ["WhatsApp & Email sync", "Lead deduplication logic", "Custom field manager"],
      },
      {
        number: "03",
        title: "Pipelines, Automations & Portals",
        timeframe: "Week 6–8",
        description: "Building interactive Kanban boards, automated drip sequences, quote generation, and client portals.",
        points: ["Kanban drag & drop", "Automated email sequences", "Client login portal"],
      },
      {
        number: "04",
        title: "Data Migration & Team Onboarding",
        timeframe: "Week 9+",
        description: "Migrating existing contacts from spreadsheets or HubSpot/Salesforce, team training, and go-live.",
        points: ["Clean data migration", "Rep onboarding workshops", "Ongoing feature roadmap"],
      },
    ],
    faq: [
      {
        question: "Can we migrate data from our existing CRM (Salesforce, HubSpot, Zoho)?",
        answer: "Yes, we build automated migration scripts that clean, deduplicate, and map your historical deals, contacts, and notes seamlessly.",
      },
      {
        question: "Is the CRM accessible on mobile devices?",
        answer: "Yes, the UI is built with a responsive progressive web design, allowing field reps to log notes and update deals from any phone or tablet.",
      },
    ],
  },
  {
    id: "erp",
    slug: "erp",
    category: "enterprise",
    categoryLabel: "Enterprise Software",
    title: "Enterprise ERP & Operations Systems",
    shortTitle: "Enterprise ERP",
    tagline: "Centralized operational intelligence for inventory, finance, and supply chain",
    heroHeadline: "Unified enterprise operations engineered for",
    heroHighlight: "operational clarity and total workflow control.",
    description:
      "Modernize complex business operations with custom Enterprise Resource Planning (ERP) software. We integrate procurement, inventory management, human resources, financials, and supply chain logistics into one unified, real-time command center.",
    extendedDescription:
      "Traditional ERP systems like SAP or NetSuite are painfully rigid and cost millions in consulting fees. We engineer bespoke ERP platforms tailored precisely to your manufacturing lines, multi-warehouse logistics, purchase order hierarchies, and statutory financial compliance.",
    iconName: "Building2",
    primaryImage: "/services/erp-abstract.jpg",
    secondaryImage: "/erp.png",
    imageCaption: "Architectural Matte Black Monolith with Glowing White Bevels",
    interactiveWidgetType: "erp-inventory",
    businessProblem: {
      problemTitle: "The Operational Chaos of Disconnected Business Tools",
      problemDescription:
        "When procurement runs on spreadsheets, inventory is tracked manually in warehouse clipboards, and accounting is siloed in separate software, enterprise leadership is flying blind. Stockouts halt production, duplicate purchase orders drain cash flow, and month-end audits take weeks of manual reconciliation.",
      painPoints: [
        "Unsynchronized inventory causing stockouts or expensive overstocking",
        "Unauthorized purchase orders and lack of multi-tier approval controls",
        "Days spent manually reconciling bank statements and statutory GST/VAT filings",
        "Disjointed employee shift, attendance, and payroll processing errors",
      ],
    },
    solutionTransformation: {
      solutionTitle: "How Custom ERP Software Centralizes Enterprise Intelligence",
      solutionDescription:
        "We engineer a unified operational command center where every stock movement, purchase order, and financial entry executes through an immutable double-entry ledger. Barcode scanners update live warehouse counts, automated triggers reorder materials, and real-time trial balances are available instantly.",
      keyAdvantages: [
        "Live multi-warehouse inventory tracking with automated batch/lot traceability",
        "Tiered purchase order approval matrices with automated PDF generation",
        "ACID-compliant double-entry accounting ledger with real-time financial reporting",
        "Integrated HRMS, biometric attendance sync, and automated salary slip dispatch",
      ],
    },
    businessImpact: {
      roiHeadline: "Measurable Operational Efficiency Across Facilities",
      outcomes: [
        {
          label: "Manual Data Entry",
          value: "-80%",
          desc: "Automated PO matching, digital barcode scanning, and invoice sync",
        },
        {
          label: "Stockout Elimination",
          value: "Zero Incidents",
          desc: "Predictive reorder level triggers prevent factory downtime",
        },
        {
          label: "Financial Closing",
          value: "5 Days Faster",
          desc: "Instant trial balances and automated multi-entity consolidation",
        },
      ],
    },
    metrics: [
      {
        value: "80%",
        label: "Manual Work Reduction",
        detail: "Automated PO generation, invoice matching, and ledger reconciliation",
      },
      {
        value: "Zero",
        label: "Stockout Incidents",
        detail: "Real-time inventory tracking with predictive reorder triggers",
      },
      {
        value: "5 Days",
        label: "Faster Month-End Close",
        detail: "Instant trial balances and automated multi-entity consolidation",
      },
    ],
    capabilities: [
      {
        title: "Multi-Warehouse Inventory Control",
        description: "Barcode/QR tracking, batch and lot traceability, inter-warehouse stock transfers, and automated low-stock reorder triggers.",
        iconName: "Boxes",
      },
      {
        title: "Procurement & Purchase Order Workflow",
        description: "Multi-level approval matrices, vendor quotation comparisons, automated PO generation, and goods receipt verification.",
        iconName: "Workflow",
      },
      {
        title: "Double-Entry Financial Ledger",
        description: "Automated general ledger entries, Accounts Receivable/Payable tracking, GST/VAT tax compliance, and automated financial statements.",
        iconName: "BarChart3",
      },
      {
        title: "HRMS, Payroll & Attendance",
        description: "Biometric attendance integration, leave management, shift planning, payroll processing, and statutory deductions.",
        iconName: "ShieldCheck",
      },
    ],
    deliverables: [
      "Custom web-based ERP central command dashboard",
      "Inventory management module with barcode scanning support",
      "Procurement & vendor management portal with tiered approvals",
      "Financial ledger with automatic journal entries and audit trails",
      "Comprehensive employee directory, payroll, and leave management",
      "Role-based data masking and strict ISO/SOC2 compliant audit logs",
    ],
    architectureOverview:
      "Enterprise-grade transactional architecture powered by ACID-compliant PostgreSQL databases, Redis distributed caching, and Kafka/RabbitMQ message brokers for high-volume inventory events.",
    architectureHighlights: [
      "Strict double-entry bookkeeping constraints in SQL transactions",
      "Immutable audit log capturing all ledger and stock adjustments",
      "Multi-currency, multi-branch, and multi-entity consolidation",
      "Automated daily database backups with 15-minute point-in-time recovery",
    ],
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "TypeScript", "Tailwind CSS", "AG-Grid", "Radix UI"],
      },
      {
        category: "Backend Services",
        technologies: ["Node.js / TypeScript", "Go", "Python", "FastAPI", "PostgreSQL"],
      },
      {
        category: "Data & Event Bus",
        technologies: ["RabbitMQ / Kafka", "Redis Cache", "ElasticSearch", "TimescaleDB"],
      },
      {
        category: "Cloud Infrastructure",
        technologies: ["AWS (RDS Multi-AZ)", "Docker", "Kubernetes", "Terraform", "Vault"],
      },
    ],
    process: [
      {
        number: "01",
        title: "Operational Deep Dive",
        timeframe: "Weeks 1–3",
        description: "Mapping material flows, inventory touchpoints, accounting rules, and approval hierarchies.",
        points: ["Supply chain flowcharts", "Approval matrix blueprint", "Tax & statutory requirements"],
      },
      {
        number: "02",
        title: "Schema & Transaction Core",
        timeframe: "Weeks 4–7",
        description: "Architecting the double-entry accounting schema, inventory ledger, and vendor databases.",
        points: ["ACID transaction tests", "Inventory ledger schema", "Vendor integration APIs"],
      },
      {
        number: "03",
        title: "Module Build & High-Density UI",
        timeframe: "Weeks 8–12",
        description: "Developing high-density data grids, barcode scanning interfaces, and automated report generators.",
        points: ["Interactive data grids", "Purchase order workflow", "Financial report generation"],
      },
      {
        number: "04",
        title: "Pilot Testing & Full Rollout",
        timeframe: "Weeks 13+",
        description: "Running parallel operations alongside legacy tools, verifying balance sheets, and complete plant switchover.",
        points: ["Parallel testing run", "Inventory reconciliation", "Plant & office rollout"],
      },
    ],
    faq: [
      {
        question: "Can this ERP integrate with existing accounting software like Tally or QuickBooks?",
        answer: "Yes, we build bi-directional sync connectors that mirror ledger transactions and invoices between your custom ERP and Tally, QuickBooks, or SAP.",
      },
      {
        question: "How do you prevent data loss during inventory movements?",
        answer: "All stock movements are recorded as atomic database transactions with strict foreign keys and immutable audit records, preventing discrepancies.",
      },
    ],
  },
  {
    id: "automation",
    slug: "automation",
    category: "cloud_ai",
    categoryLabel: "AI & Intelligence",
    title: "AI & Workflow Automation",
    shortTitle: "AI & Automation",
    tagline: "Autonomous AI agents, LLM integrations, and custom workflow engines",
    heroHeadline: "Supercharge your business operations with",
    heroHighlight: "autonomous AI agents and intelligent workflows.",
    description:
      "Eliminate repetitive manual toil and accelerate decision-making with custom AI agents and workflow orchestration. We build intelligent document extraction, LLM-powered assistant workflows, automated data reconciliations, and webhook pipelines.",
    extendedDescription:
      "We build practical AI systems that solve real business bottlenecks. By connecting state-of-the-art Large Language Models (OpenAI, Anthropic, DeepSeek, open-source models) to your internal databases and APIs via RAG (Retrieval-Augmented Generation), we automate complex research, customer support, and document processing.",
    iconName: "Cpu",
    primaryImage: "/services/ai-abstract.jpg",
    secondaryImage: "/services/ai-automation.jpg",
    imageCaption: "Sculptural Glowing White Neural Torus & Autonomous Node Mesh",
    interactiveWidgetType: "ai-stream",
    businessProblem: {
      problemTitle: "The Productivity Drain of Manual Knowledge Work and Data Entry",
      problemDescription:
        "High-value knowledge workers spend up to 40% of their workweeks manually copying data from invoices into ERPs, writing repetitive customer replies, and searching through hundreds of internal PDFs. This creates massive operational bottlenecks and limits company throughput.",
      painPoints: [
        "Hundreds of hours lost reading unstructured PDF invoices, contracts, and claims",
        "Delayed customer support responses causing churn and low CSAT scores",
        "High error rate in manual data entry causing costly downstream errors",
        "Generic ChatGPT wrappers that hallucinate and lack access to company data",
      ],
    },
    solutionTransformation: {
      solutionTitle: "How Custom AI Agents & Automation Unlock 10x Throughput",
      solutionDescription:
        "We build secure, enterprise-grade AI agents connected directly to your databases and tools via RAG (Retrieval-Augmented Generation). Our agents extract structured data from messy documents, draft context-aware communications, and trigger automated webhook actions with 99%+ accuracy.",
      keyAdvantages: [
        "Deterministic JSON data extraction from scanned PDFs, invoices, and contracts",
        "Enterprise RAG semantic search over millions of internal documents in milliseconds",
        "Human-in-the-loop review dashboards for high-stakes operational workflows",
        "Zero data retention guarantees: your proprietary data is never used for training",
      ],
    },
    businessImpact: {
      roiHeadline: "Scaling Operational Capacity Without Ballooning Headcount",
      outcomes: [
        {
          label: "Task Throughput",
          value: "10x Faster",
          desc: "Documents processed in seconds rather than hours of manual review",
        },
        {
          label: "Team Time Saved",
          value: "120+ Hours/wk",
          desc: "Freed up operational staff to focus on high-value client relationships",
        },
        {
          label: "Accuracy Rate",
          value: "99.2%",
          desc: "Eliminated manual transcription errors through schema validation",
        },
      ],
    },
    metrics: [
      {
        value: "10x",
        label: "Throughput Boost",
        detail: "Process thousands of incoming documents, leads, and orders instantly",
      },
      {
        value: "95%",
        label: "Time Saved on Tasks",
        detail: "Automated data extraction, invoice processing, and ticket classification",
      },
      {
        value: "0%",
        label: "Manual Data Entry Errors",
        detail: "Guaranteed structured outputs and automated validation checks",
      },
    ],
    capabilities: [
      {
        title: "Autonomous Agent Orchestration",
        description: "Multi-agent workflows equipped with tool-calling capabilities to research data, query APIs, generate reports, and trigger downstream tasks.",
        iconName: "Cpu",
      },
      {
        title: "Intelligent Document Parsing (OCR + LLM)",
        description: "Extract structured data from unstructured invoices, legal contracts, receipts, and PDFs with 99%+ accuracy.",
        iconName: "Boxes",
      },
      {
        title: "Enterprise RAG & Semantic Search",
        description: "Vector database pipelines (pgvector, Pinecone) indexing your company knowledge base to deliver instant, cited factual answers.",
        iconName: "Database",
      },
      {
        title: "Event-Driven Webhook Bridges",
        description: "Custom serverless micro-automations connecting your CRM, ERP, Slack, email, and databases with automated retry logic.",
        iconName: "Workflow",
      },
    ],
    deliverables: [
      "Custom AI agent workflow engine with human-in-the-loop review UI",
      "Document ingestion pipeline with OCR and JSON extraction",
      "Enterprise RAG vector search API integrated with your data lakes",
      "Automated Slack / WhatsApp / Email notification bot",
      "Admin monitoring dashboard tracking token usage, latency, and agent accuracy",
      "Comprehensive data privacy & sandboxing documentation",
    ],
    architectureOverview:
      "Python / FastAPI microservices with Celery asynchronous task workers, LangChain/LlamaIndex orchestration, pgvector semantic search, and streaming WebSocket output.",
    architectureHighlights: [
      "Strict data privacy guards ensuring zero customer data is used for model training",
      "Fallback LLM routing between Claude 3.5 Sonnet, GPT-4o, and local models",
      "Deterministic schema validation using Zod and Pydantic",
      "Resilient rate-limiting and exponential backoff retry queues",
    ],
    techStack: [
      {
        category: "AI & LLM",
        technologies: ["LangChain", "LlamaIndex", "OpenAI API", "Anthropic Claude", "Ollama", "HuggingFace"],
      },
      {
        category: "Vector & Search",
        technologies: ["pgvector", "Pinecone", "Qdrant", "ElasticSearch", "SentenceTransformers"],
      },
      {
        category: "Backend Engine",
        technologies: ["Python", "FastAPI", "Celery", "Redis", "Node.js / TypeScript"],
      },
      {
        category: "Cloud & Ops",
        technologies: ["AWS Lambda", "Docker", "GCP Cloud Run", "Langfuse", "Helicone"],
      },
    ],
    process: [
      {
        number: "01",
        title: "Bottleneck Identification",
        timeframe: "Week 1",
        description: "Auditing your team's repetitive tasks, manual data entry points, and document volumes.",
        points: ["Task ROI calculation", "Data sample collection", "Accuracy metric definition"],
      },
      {
        number: "02",
        title: "Prompt Engineering & RAG Pipeline",
        timeframe: "Weeks 2–3",
        description: "Building vector embedding pipelines, fine-tuned prompts, and deterministic JSON extractors.",
        points: ["Vector database setup", "Few-shot prompt tuning", "Structured schema validation"],
      },
      {
        number: "03",
        title: "Tool Integration & Agent Logic",
        timeframe: "Weeks 4–6",
        description: "Connecting AI agents to your CRM, ERP, and communication channels with human-in-the-loop fallback.",
        points: ["API tool calling", "Human approval interface", "Error handling logic"],
      },
      {
        number: "04",
        title: "Deployment & Accuracy Optimization",
        timeframe: "Week 7+",
        description: "Continuous telemetry tracking, hallucination monitoring, and automated performance tuning.",
        points: ["Live traffic testing", "Latency optimization", "Accuracy monitoring dashboard"],
      },
    ],
    faq: [
      {
        question: "Is our proprietary company data safe when using AI models?",
        answer: "Yes. We configure zero-data-retention enterprise API endpoints and deploy vector databases in your isolated private VPC, ensuring data is never used for training.",
      },
      {
        question: "What happens if an AI agent is unsure of an answer?",
        answer: "We design human-in-the-loop confidence thresholds. If confidence drops below a set score (e.g. 95%), the task is instantly routed to a team member with full context.",
      },
    ],
  },
  {
    id: "mobile-apps",
    slug: "mobile-apps",
    category: "engineering",
    categoryLabel: "Mobile Engineering",
    title: "Mobile App Development",
    shortTitle: "Mobile Development",
    tagline: "High-performance, tactile native & cross-platform applications",
    heroHeadline: "Engaging iOS and Android apps built with",
    heroHighlight: "native speed, fluid gestures, and 60fps polish.",
    description:
      "We engineer performant mobile applications for iOS and Android utilizing React Native and Flutter. From consumer-facing marketplaces to enterprise field workforce tools, we guarantee offline-first architecture, instant sync, and 5-star app store experiences.",
    extendedDescription:
      "Mobile users demand lightning-fast launch times, buttery smooth scrolling, and reliable offline capabilities. We build cross-platform apps with native performance, integrating push notifications, biometrics, Bluetooth hardware, and in-app subscriptions flawlessly.",
    iconName: "Smartphone",
    primaryImage: "/services/mobile-abstract.jpg",
    secondaryImage: "/services/mobile-apps.jpg",
    imageCaption: "Fluid Sculptural Liquid Silver Ribbons & White Light Reflections",
    interactiveWidgetType: "mobile-preview",
    businessProblem: {
      problemTitle: "The User Drop-Off Caused by Clunky, Buggy Mobile Apps",
      problemDescription:
        "Building separate iOS and Android native apps costs double the engineering budget and doubles bug surface areas. Meanwhile, cheap web wrappers stutter at 20fps, crash during spotty network connections, and suffer terrible 2-star App Store ratings that destroy brand reputation.",
      painPoints: [
        "Double development & maintenance costs maintaining dual Swift and Kotlin codebases",
        "Apps that freeze or lose user data when internet connections drop unexpectedly",
        "Lengthy App Store review rejections delaying critical marketing campaigns",
        "High churn rates caused by sluggish startup times and laggy gesture animations",
      ],
    },
    solutionTransformation: {
      solutionTitle: "How Our Native-Feel Cross-Platform Engineering Wins Users",
      solutionDescription:
        "We build unified React Native and Flutter applications with offline-first SQLite databases, hardware-accelerated animations, and Over-The-Air (OTA) update pipelines. You get native 60fps performance across iOS and Android from a single battle-tested codebase.",
      keyAdvantages: [
        "50% reduction in development costs with unified React Native / Flutter codebases",
        "Offline-first architecture with automatic background data sync upon reconnection",
        "Instant Over-The-Air (OTA) bug fixes without waiting for App Store approvals",
        "Seamless native hardware integrations: FaceID, GPS geofencing, Camera, and Bluetooth",
      ],
    },
    businessImpact: {
      roiHeadline: "Driving Mobile Daily Active Engagement & Brand Loyalty",
      outcomes: [
        {
          label: "App Store Rating",
          value: "4.8★ Avg",
          desc: "Achieved through fluid 60fps gestures and friction-free onboarding",
        },
        {
          label: "Crash-Free Sessions",
          value: "99.8%",
          desc: "Strict type safety and automated regression test coverage",
        },
        {
          label: "Daily User Retention",
          value: "+64%",
          desc: "Driven by personalized push notifications and offline responsiveness",
        },
      ],
    },
    metrics: [
      {
        value: "60 FPS",
        label: "Fluid Native Gestures",
        detail: "Smooth frame rates with Reanimated 3 and hardware acceleration",
      },
      {
        value: "99.8%",
        label: "Crash-Free Rate",
        detail: "Strict type safety, automated UI tests, and real-time Sentry crash tracking",
      },
      {
        value: "4.8★",
        label: "Average Store Rating",
        detail: "Polished onboarding flows and intuitive UX design",
      },
    ],
    capabilities: [
      {
        title: "Cross-Platform React Native & Flutter",
        description: "Single codebase efficiency with 100% native platform feel, custom bridge modules, and rapid release cycles.",
        iconName: "Smartphone",
      },
      {
        title: "Offline-First Sync Engine",
        description: "Local SQLite / WatermelonDB storage with conflict-free replicated data types (CRDTs) that sync seamlessly when reconnected.",
        iconName: "Database",
      },
      {
        title: "Push Notifications & Deep Linking",
        description: "Personalized push messaging via OneSignal/Firebase with universal deep linking for frictionless user re-engagement.",
        iconName: "Zap",
      },
      {
        title: "Biometrics & Hardware Integrations",
        description: "Face ID / Touch ID authentication, camera barcode scanning, GPS geolocation tracking, and Bluetooth device connectivity.",
        iconName: "ShieldCheck",
      },
    ],
    deliverables: [
      "iOS and Android binary packages ready for App Store & Play Store",
      "Clean, modular React Native or Flutter codebase with TypeScript",
      "Offline-first local database sync implementation",
      "Push notification server integration and trigger hooks",
      "App Store & Google Play metadata, screenshots, and submission support",
      "Automated Fastlane build and continuous deployment pipeline",
    ],
    architectureOverview:
      "Client-side reactive state using Zustand/Redux Toolkit paired with local SQLite databases and optimistic UI updates for instant perceived performance.",
    architectureHighlights: [
      "Optimistic UI updates for zero perceptible network lag",
      "Automated CI/CD build distribution via Fastlane and GitHub Actions",
      "Secure key storage using iOS Keychain and Android Keystore",
      "Dynamic OTA (over-the-air) updates via Expo EAS / CodePush",
    ],
    techStack: [
      {
        category: "Mobile Frameworks",
        technologies: ["React Native", "Expo", "Flutter", "Swift", "Kotlin", "TypeScript"],
      },
      {
        category: "Local State & DB",
        technologies: ["WatermelonDB", "SQLite", "MMKV", "Zustand", "TanStack Query"],
      },
      {
        category: "Services & Push",
        technologies: ["Firebase Cloud Messaging", "OneSignal", "RevenueCat", "Mapbox"],
      },
      {
        category: "CI/CD & Analytics",
        technologies: ["Fastlane", "Expo EAS", "Sentry Mobile", "PostHog", "TestFlight"],
      },
    ],
    process: [
      {
        number: "01",
        title: "Mobile UX & Prototype",
        timeframe: "Weeks 1–2",
        description: "Designing tactile mobile wireframes, thumb-friendly navigation, and interactive Figma prototypes.",
        points: ["iOS/Android HIG alignment", "Interactive Figma prototype", "User test feedback"],
      },
      {
        number: "02",
        title: "Core Architecture & Screens",
        timeframe: "Weeks 3–6",
        description: "Scaffolding navigation stacks, design system components, local database, and API layers.",
        points: ["Component library", "Local SQLite schema", "Auth & onboarding flows"],
      },
      {
        number: "03",
        title: "Hardware & Native Integrations",
        timeframe: "Weeks 7–9",
        description: "Implementing push notifications, camera/biometrics, in-app purchases, and offline sync logic.",
        points: ["In-app purchase testing", "Biometric auth", "Push notification triggers"],
      },
      {
        number: "04",
        title: "Beta Testing & App Store Launch",
        timeframe: "Weeks 10+",
        description: "Distributing TestFlight / Google Play internal builds, crash profiling, and navigating store reviews.",
        points: ["TestFlight beta distribution", "App Store review approval", "Production release"],
      },
    ],
    faq: [
      {
        question: "Do you handle App Store and Google Play review submissions?",
        answer: "Yes, we handle the complete submission lifecycle including screenshot assets, privacy policies, review responses, and launch scheduling.",
      },
      {
        question: "Can we push bug fixes without waiting for App Store reviews?",
        answer: "Yes, by utilizing Over-The-Air (OTA) update engines like Expo EAS Update, JavaScript bug fixes can be delivered directly to users instantly.",
      },
    ],
  },
  {
    id: "cloud-devops",
    slug: "cloud-devops",
    category: "cloud_ai",
    categoryLabel: "Infrastructure",
    title: "Cloud Architecture & DevOps",
    shortTitle: "Cloud & DevOps",
    tagline: "Scalable cloud infrastructure, automated CI/CD, zero downtime",
    heroHeadline: "Production-grade cloud infrastructure engineered for",
    heroHighlight: "99.99% uptime, zero downtime, and instant scale.",
    description:
      "We design, build, and manage enterprise cloud ecosystems on AWS, Google Cloud, and Azure. Using Infrastructure as Code (Terraform), Kubernetes container orchestration, and automated CI/CD pipelines, we ensure your platforms remain secure, cost-optimized, and resilient.",
    extendedDescription:
      "Slow deployments, fragile servers, and unpredictable cloud bills kill engineering velocity. We implement modern GitOps pipelines, multi-region auto-scaling, comprehensive telemetry (Grafana, Prometheus, Datadog), and security hardening that let your development team ship with total confidence.",
    iconName: "Cloud",
    primaryImage: "/services/cloud-abstract.jpg",
    secondaryImage: "/services/cloud-devops.jpg",
    imageCaption: "Cyber White Crystalline Mesh & Distributed Cloud Topology",
    interactiveWidgetType: "devops-cluster",
    businessProblem: {
      problemTitle: "The Hidden Danger of Unmanaged Cloud Infrastructures",
      problemDescription:
        "Manual server configurations and missing deployment pipelines turn every code release into a high-risk event. Unmonitored cloud spending leads to massive surprise bills, while single points of failure risk devastating downtime that breaks customer trust and SLAs.",
      painPoints: [
        "Unscheduled downtime during traffic spikes costing thousands in lost revenue",
        "Spiraling AWS / GCP monthly bills with 30%+ wasted idle compute",
        "Fear of releasing new features due to manual, error-prone deployment scripts",
        "Lack of real-time distributed tracing to diagnose critical production bugs",
      ],
    },
    solutionTransformation: {
      solutionTitle: "How Production-Grade DevOps Delivers 99.99% Uptime & Speed",
      solutionDescription:
        "We codify your entire infrastructure with version-controlled Terraform (IaC) and deploy Kubernetes clusters with automatic horizontal pod scaling and zero-downtime rolling updates. Automated GitHub Actions run test gates and security scans on every pull request.",
      keyAdvantages: [
        "Zero-downtime blue/green deployments with instant automatic rollback triggers",
        "30%+ reduction in cloud hosting bills through automated right-sizing and spot instances",
        "Full GitOps reproducible staging and production environments in code",
        "24/7 observability with Prometheus, Grafana, and automated incident alerts",
      ],
    },
    businessImpact: {
      roiHeadline: "High Velocity, Zero Downtime, and Predictable Cloud Budgets",
      outcomes: [
        {
          label: "Uptime SLA",
          value: "99.99%",
          desc: "Multi-AZ high availability clusters with automated self-healing",
        },
        {
          label: "Deployment Speed",
          value: "< 5 Mins",
          desc: "From git commit to live production with automated CI/CD pipelines",
        },
        {
          label: "Cloud Cost Savings",
          value: "35% Lower",
          desc: "Achieved by optimizing compute instances, egress caches, and auto-scaling",
        },
      ],
    },
    metrics: [
      {
        value: "99.99%",
        label: "High Availability SLA",
        detail: "Multi-AZ redundant clusters with automated self-healing and failover",
      },
      {
        value: "< 5 Min",
        label: "Deployment Pipeline Time",
        detail: "Parallelized Docker container builds and automated rollback triggers",
      },
      {
        value: "35%",
        label: "Cloud Cost Optimization",
        detail: "Right-sizing instances, spot nodes, and aggressive caching architectures",
      },
    ],
    capabilities: [
      {
        title: "Infrastructure as Code (IaC)",
        description: "Deterministic, reproducible cloud environments managed entirely via version-controlled Terraform and AWS CDK configurations.",
        iconName: "Boxes",
      },
      {
        title: "Kubernetes & Container Orchestration",
        description: "Production Kubernetes (EKS, GKE) clusters with horizontal pod autoscaling, zero-downtime rolling updates, and ingress routing.",
        iconName: "Cloud",
      },
      {
        title: "Automated CI/CD GitOps Pipelines",
        description: "GitHub Actions / GitLab CI workflows running automated linting, security scanning, container builds, and staging previews.",
        iconName: "GitMerge",
      },
      {
        title: "24/7 Telemetry & Observability",
        description: "Full-stack monitoring with Prometheus, Grafana, OpenTelemetry, and PagerDuty alerts for instant incident resolution.",
        iconName: "BarChart3",
      },
    ],
    deliverables: [
      "Version-controlled Terraform codebase for complete cloud infrastructure",
      "Production-ready Kubernetes cluster configs (EKS/GKE) or ECS Fargate",
      "Automated CI/CD pipeline with staging and production environments",
      "Centralized logging, distributed tracing, and metric dashboards",
      "WAF security rules, SSL/TLS certificates, and DDoS protection",
      "Disaster recovery runbook with automated snapshot backups",
    ],
    architectureOverview:
      "Multi-Availability Zone cloud topology with private subnets, auto-scaling container workloads, managed database clusters, and Cloudflare edge WAF.",
    architectureHighlights: [
      "Zero-trust VPC network with bastion hosts and VPN access controls",
      "Automated zero-downtime blue/green or canary deployment strategy",
      "Secrets management via HashiCorp Vault or AWS Secrets Manager",
      "Daily automated database snapshots with cross-region replication",
    ],
    techStack: [
      {
        category: "Cloud Providers",
        technologies: ["AWS (Amazon Web Services)", "Google Cloud (GCP)", "Azure", "Cloudflare"],
      },
      {
        category: "IaC & Containers",
        technologies: ["Terraform", "Docker", "Kubernetes (EKS/GKE)", "Helm", "AWS CDK"],
      },
      {
        category: "CI/CD & GitOps",
        technologies: ["GitHub Actions", "GitLab CI", "ArgoCD", "Docker Hub", "AWS ECR"],
      },
      {
        category: "Observability & Security",
        technologies: ["Prometheus", "Grafana", "Datadog", "Sentry", "Vault", "Cloudflare WAF"],
      },
    ],
    process: [
      {
        number: "01",
        title: "Cloud Infrastructure Audit",
        timeframe: "Week 1",
        description: "Evaluating your current architecture, bottlenecks, security vulnerabilities, and monthly cloud expenditures.",
        points: ["Cost & capacity audit", "Security posture review", "Target architecture blueprint"],
      },
      {
        number: "02",
        title: "Terraform IaC Scaffolding",
        timeframe: "Weeks 2–3",
        description: "Writing modular Terraform scripts to provision VPCs, database clusters, security groups, and IAM policies.",
        points: ["VPC & networking setup", "Database cluster provisioning", "IAM least-privilege policies"],
      },
      {
        number: "03",
        title: "Kubernetes & CI/CD Pipeline",
        timeframe: "Weeks 4–5",
        description: "Containerizing services, deploying Kubernetes clusters, and setting up automated GitHub Actions pipelines.",
        points: ["Container optimization", "Automated deployment gates", "Preview environment triggers"],
      },
      {
        number: "04",
        title: "Monitoring, Chaos Tests & Cutover",
        timeframe: "Week 6+",
        description: "Simulating node failures, tuning auto-scaling parameters, and executing zero-downtime DNS cutover.",
        points: ["Telemetry dashboards", "Disaster recovery drills", "Zero-downtime DNS cutover"],
      },
    ],
    faq: [
      {
        question: "How do you achieve zero downtime during application deployments?",
        answer: "We utilize Kubernetes rolling updates or blue-green deployment strategies behind load balancers that verify pod health checks before routing user traffic.",
      },
      {
        question: "Can you help us reduce our AWS or GCP monthly bill?",
        answer: "Yes, we regularly perform cloud cost optimization audits, right-sizing underutilized compute, setting up spot instances, and optimizing egress caches to reduce costs by 30%+.",
      },
    ],
  },
  {
    id: "digital-growth",
    slug: "digital-growth",
    category: "growth",
    categoryLabel: "Growth & Acquisition",
    title: "Digital Growth & Strategy",
    shortTitle: "Digital Growth & SEO",
    tagline: "Data-backed acquisition, conversion rate optimization, and technical SEO",
    heroHeadline: "Accelerate revenue and pipeline with",
    heroHighlight: "high-converting funnels and technical SEO.",
    description:
      "Elevate your brand presence and drive predictable customer acquisition. We engineer data-backed growth funnels, precision technical SEO, conversion-optimized landing pages, and multi-channel paid acquisition attribution campaigns.",
    extendedDescription:
      "Great software deserves great distribution. We bridge the gap between engineering and marketing by building lightning-fast landing pages that convert at industry-leading rates, optimizing programmatic SEO architecture, and building closed-loop analytics dashboards.",
    iconName: "TrendingUp",
    primaryImage: "/services/growth-abstract.jpg",
    secondaryImage: "/services/digital-growth.jpg",
    imageCaption: "Ascending Luminous White Light Trails & Attribution Flow Matrix",
    interactiveWidgetType: "growth-attribution",
    businessProblem: {
      problemTitle: "The Revenue Loss from Inefficient Ad Spend & Invisible SEO",
      problemDescription:
        "Building great software means nothing if your target customers cannot find you. Pouring money into paid ads with slow, generic landing pages leads to exorbitant customer acquisition costs (CAC), while ignoring technical programmatic SEO leaves massive organic revenue on the table.",
      painPoints: [
        "High paid ad click costs with dismal 1-2% landing page conversion rates",
        "Inability to track which ad campaigns actually generate paid revenue vs tire-kickers",
        "Competitors dominating high-intent Google search keywords with programmatic content",
        "Ad blockers and iOS privacy updates breaking standard tracking pixels",
      ],
    },
    solutionTransformation: {
      solutionTitle: "How Technical Growth Engineering Compounds Inbound Pipeline",
      solutionDescription:
        "We build high-converting, sub-second landing pages paired with programmatic SEO engines that dynamically generate thousands of indexed, keyword-targeted pages. We implement server-side Conversion APIs (CAPI) and GA4/Mixpanel attribution to give you full clarity on customer acquisition ROI.",
      keyAdvantages: [
        "Programmatic SEO directory architectures driving hundreds of thousands of organic visits",
        "Server-side tracking (Meta CAPI & Google Ads) unaffected by browser ad blockers",
        "High-converting landing page templates with instant sub-second edge load speeds",
        "Scientific A/B split-testing frameworks on copy, layout, and CTA placement",
      ],
    },
    businessImpact: {
      roiHeadline: "Driving Predictable, Scalable Inbound Customer Acquisition",
      outcomes: [
        {
          label: "Organic Search Traffic",
          value: "3.5x Surge",
          desc: "Achieved through programmatic SEO directory pages and technical tuning",
        },
        {
          label: "Landing Page CRO",
          value: "+42%",
          desc: "Higher conversion rate from paid traffic to booked customer demos",
        },
        {
          label: "Customer CAC",
          value: "-38% Lower",
          desc: "Reduced acquisition cost through closed-loop attribution optimization",
        },
      ],
    },
    metrics: [
      {
        value: "3.5x",
        label: "Organic Traffic Growth",
        detail: "Driven by programmatic SEO architecture and technical optimizations",
      },
      {
        value: "42%",
        label: "Landing Page CRO Increase",
        detail: "Scientific A/B testing of copy, trust signals, and user flows",
      },
      {
        value: "100%",
        label: "Closed-Loop Attribution",
        detail: "Accurate tracking from initial ad click to final closed revenue",
      },
    ],
    capabilities: [
      {
        title: "Technical & Programmatic SEO",
        description: "Automated schema markup, dynamic sitemaps, edge-rendered content pages, and internal linking structures that dominate SERPs.",
        iconName: "Globe2",
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description: "High-converting design patterns, persuasive microcopy, multi-step interactive forms, and rigorous split-testing frameworks.",
        iconName: "TrendingUp",
      },
      {
        title: "Performance Paid Acquisition",
        description: "High-intent Google Search, Meta Ads, and LinkedIn campaign management calibrated for high lifetime value (LTV) customers.",
        iconName: "BarChart3",
      },
      {
        title: "Full-Funnel Analytics & Attribution",
        description: "Custom GA4, Mixpanel, and PostHog tracking implementations that reveal true customer acquisition costs (CAC) and conversion paths.",
        iconName: "Workflow",
      },
    ],
    deliverables: [
      "Comprehensive technical SEO audit and remediation roadmap",
      "High-converting landing page templates with instant load speeds",
      "Programmatic SEO generation engine for high-intent keywords",
      "Full-funnel GA4 & Mixpanel event tracking instrumentation",
      "Performance advertising ad copy, creative direction, and campaign structure",
      "Monthly executive reporting dashboard on traffic, leads, and CAC",
    ],
    architectureOverview:
      "Next.js edge-rendered landing pages with instant dynamic prerendering, integrated with server-side Google Tag Manager and conversion APIs.",
    architectureHighlights: [
      "Server-side tracking to bypass ad-blockers and browser privacy limits",
      "Programmatic dynamic page generation for thousands of keyword variations",
      "Automated open-graph image generation for maximum social CTR",
      "Zero-latency A/B testing executed directly on edge servers",
    ],
    techStack: [
      {
        category: "Analytics & Tracking",
        technologies: ["Google Analytics 4", "Mixpanel", "PostHog", "Google Tag Manager", "Segment"],
      },
      {
        category: "SEO & Content",
        technologies: ["SEMrush", "Ahrefs", "Google Search Console", "Schema.org", "Next.js SSR"],
      },
      {
        category: "Paid Advertising",
        technologies: ["Google Ads", "Meta Business Suite", "LinkedIn Campaign Manager", "Meta CAPI"],
      },
      {
        category: "Testing & CRO",
        technologies: ["Statsig", "PostHog Experiments", "Hotjar", "Vercel Edge Middleware"],
      },
    ],
    process: [
      {
        number: "01",
        title: "Growth & Funnel Audit",
        timeframe: "Week 1",
        description: "Analyzing current conversion bottlenecks, keyword gaps, competitor strategies, and analytics data.",
        points: ["SEO technical audit", "Funnel drop-off analysis", "Competitor positioning review"],
      },
      {
        number: "02",
        title: "Landing Page & Tracking Scaffolding",
        timeframe: "Weeks 2–3",
        description: "Building high-performance landing pages and wiring server-side conversion tracking.",
        points: ["Ultra-fast Next.js pages", "Server-side GTM setup", "Conversion goal tracking"],
      },
      {
        number: "03",
        title: "Campaign Launch & Programmatic SEO",
        timeframe: "Weeks 4–6",
        description: "Launching laser-targeted paid campaigns and rolling out programmatic content directory pages.",
        points: ["High-intent search ads", "Programmatic landing pages", "Automated lead ingestion"],
      },
      {
        number: "04",
        title: "A/B Testing & Scale",
        timeframe: "Week 7+",
        description: "Iterating on headline copy, CTA placement, bidding strategies, and scaling winning channels.",
        points: ["Statistical A/B tests", "Budget scale optimization", "Monthly ROI reporting"],
      },
    ],
    faq: [
      {
        question: "How long does it take to see results from technical SEO?",
        answer: "Technical fixes often show ranking improvements within 3 to 6 weeks as search engines re-crawl and recognize improved performance and indexing.",
      },
      {
        question: "Do you handle both B2B and B2C growth strategies?",
        answer: "Yes, our engineers and growth specialists tailor lead magnets and funnels specifically for high-ticket enterprise B2B sales as well as high-volume B2C applications.",
      },
    ],
  },
];

// Helper to look up an icon component dynamically
export const getServiceIcon = (iconName: string): React.ComponentType<{ className?: string }> => {
  switch (iconName) {
    case "Monitor":
      return Monitor;
    case "Layers":
      return Layers;
    case "Database":
      return Database;
    case "Building2":
      return Building2;
    case "Cpu":
      return Cpu;
    case "Smartphone":
      return Smartphone;
    case "Cloud":
      return Cloud;
    case "TrendingUp":
      return TrendingUp;
    case "Workflow":
      return Workflow;
    case "ShieldCheck":
      return ShieldCheck;
    case "Zap":
      return Zap;
    case "Boxes":
      return Boxes;
    case "Lock":
      return Lock;
    case "GitMerge":
      return GitMerge;
    case "BarChart3":
      return BarChart3;
    case "Globe2":
      return Globe2;
    default:
      return Monitor;
  }
};
