export const services = [
  // ─── 1. Web & Mobile Development ────────────────────────────────────
  {
    slug: 'web-mobile',
    title: 'Web & Mobile Development',
    tagline: 'Pixel-perfect experiences that perform across every screen.',
    iconName: 'Globe',
    color: '#8BACD9',
    heroImage: '/services/web-mobile.png',
    description:
      'We design and engineer high-performance web and mobile applications that delight users and drive measurable business outcomes. From progressive web apps to native iOS and Android experiences, our full-stack team delivers responsive, accessible products built for scale.',

    businessValue: [
      {
        title: 'Cross-Platform Reach',
        description:
          'Launch on web, iOS, and Android simultaneously with shared codebases—cutting time-to-market by up to 40% without compromising native feel.',
        iconName: 'MonitorSmartphone',
      },
      {
        title: 'Conversion-First Design',
        description:
          'Every interface is crafted around user journeys and validated with A/B testing to maximize engagement, retention, and revenue.',
        iconName: 'TrendingUp',
      },
      {
        title: 'Blazing Performance',
        description:
          'Sub-second load times, optimized Core Web Vitals, and offline-first architecture ensure users stay engaged even on slow networks.',
        iconName: 'Zap',
      },
      {
        title: 'Future-Proof Architecture',
        description:
          'Component-driven, modular codebases make it effortless to add features, swap integrations, or scale to millions of users.',
        iconName: 'RefreshCw',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Discovery & UX Research',
        description:
          'We map user personas, competitive landscapes, and key workflows to define the product vision and information architecture.',
      },
      {
        step: 2,
        title: 'Design System & Prototyping',
        description:
          'Interactive prototypes and a reusable design-system ensure pixel-perfect consistency and accelerate future iterations.',
      },
      {
        step: 3,
        title: 'Agile Development',
        description:
          'Two-week sprints with continuous integration, automated testing, and stakeholder demos keep quality high and timelines predictable.',
      },
      {
        step: 4,
        title: 'Launch & Growth',
        description:
          'We handle App Store submissions, performance monitoring, and post-launch analytics so you can focus on user acquisition.',
      },
    ],

    features: [
      {
        title: 'Progressive Web Apps',
        description:
          'Installable, offline-capable web experiences that rival native app performance and bypass app-store friction.',
        iconName: 'Globe',
      },
      {
        title: 'Native Mobile Apps',
        description:
          'Smooth 60 fps animations, biometric auth, and deep OS integration for iOS and Android using React Native or Flutter.',
        iconName: 'Smartphone',
      },
      {
        title: 'Responsive Interfaces',
        description:
          'Fluid layouts and adaptive components that look stunning on phones, tablets, laptops, and large-screen displays.',
        iconName: 'Palette',
      },
      {
        title: 'Real-Time Features',
        description:
          'WebSocket-powered chat, notifications, live dashboards, and collaborative editing out of the box.',
        iconName: 'Activity',
      },
      {
        title: 'Accessibility (WCAG 2.1)',
        description:
          'Semantic HTML, keyboard navigation, and screen-reader support ensure every user can interact with your product.',
        iconName: 'Eye',
      },
      {
        title: 'CI/CD & DevOps',
        description:
          'Automated build pipelines, staged deployments, and feature flags for safe, zero-downtime releases.',
        iconName: 'GitMerge',
      },
    ],

    techStack: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Flutter', slug: 'flutter' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'Vercel', slug: 'vercel' },
    ],

    useCases: [
      'FinTech companies launching mobile banking apps with biometric security and real-time transaction feeds.',
      'Healthcare startups building HIPAA-compliant patient portals accessible on any device.',
      'Media brands delivering content-rich PWAs that load instantly even on 3G connections.',
      'Retail chains rolling out customer-facing mobile apps with loyalty programs and in-store navigation.',
    ],

    stats: [
      { value: '60+', label: 'Apps Shipped' },
      { value: '<0.8s', label: 'Avg. Load Time' },
      { value: '4.8★', label: 'Avg. Store Rating' },
    ],
  },

  // ─── 2. SaaS Platforms ──────────────────────────────────────────────
  {
    slug: 'saas',
    title: 'SaaS Platforms',
    tagline: 'Scalable software products built to grow with your revenue.',
    iconName: 'Layers',
    color: '#B09ED6',
    heroImage: '/services/saas.png',
    description:
      'We architect and build multi-tenant SaaS platforms from the ground up—subscription billing, role-based access, tenant isolation, and analytics baked in from day one. Whether you\'re validating an MVP or scaling to enterprise, we deliver production-ready platforms that convert users into paying customers.',

    businessValue: [
      {
        title: 'Recurring Revenue Engine',
        description:
          'Built-in subscription management, metered billing, and upgrade flows turn your software into a predictable MRR machine.',
        iconName: 'TrendingUp',
      },
      {
        title: 'Enterprise-Grade Security',
        description:
          'SOC 2-ready architecture with tenant isolation, SSO, audit logs, and encrypted data at rest and in transit.',
        iconName: 'Shield',
      },
      {
        title: 'Elastic Scalability',
        description:
          'Auto-scaling infrastructure handles traffic spikes seamlessly—serve 100 or 100,000 tenants without re-architecting.',
        iconName: 'Server',
      },
      {
        title: 'Rapid Feature Velocity',
        description:
          'Feature flags, modular microservices, and trunk-based development let you ship new capabilities weekly.',
        iconName: 'Rocket',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Market & Architecture Fit',
        description:
          'We validate your pricing model, define tenant isolation strategy, and design the data architecture for multi-tenancy.',
      },
      {
        step: 2,
        title: 'Core Platform Build',
        description:
          'Authentication, billing, dashboards, and the first feature module ship in a single milestone—ready for beta users.',
      },
      {
        step: 3,
        title: 'Growth Engineering',
        description:
          'Onboarding flows, in-app analytics, and self-serve upgrade paths are optimized through data-driven experimentation.',
      },
      {
        step: 4,
        title: 'Scale & Harden',
        description:
          'Load testing, compliance audits, and observability tooling prepare the platform for enterprise customers and SOC 2.',
      },
    ],

    features: [
      {
        title: 'Multi-Tenant Architecture',
        description:
          'Isolated data, shared infrastructure—each customer gets a secure, performant experience without duplicated costs.',
        iconName: 'Layers',
      },
      {
        title: 'Subscription & Billing',
        description:
          'Stripe-powered billing with free trials, usage-based pricing, invoicing, and dunning management.',
        iconName: 'CreditCard',
      },
      {
        title: 'Role-Based Access Control',
        description:
          'Granular permissions, team workspaces, and SSO integrations for secure, collaborative usage.',
        iconName: 'Lock',
      },
      {
        title: 'Analytics Dashboards',
        description:
          'Embedded analytics give your customers real-time insights and give you churn and engagement metrics.',
        iconName: 'BarChart3',
      },
      {
        title: 'API-First Design',
        description:
          'RESTful and GraphQL APIs with versioning, rate limiting, and developer documentation from day one.',
        iconName: 'Plug',
      },
      {
        title: 'White-Label Ready',
        description:
          'Custom domains, branding, and theme engines let partners and resellers make the platform their own.',
        iconName: 'Paintbrush',
      },
    ],

    techStack: [
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Redis', slug: 'redis' },
      { name: 'Stripe', slug: 'stripe' },
      { name: 'Docker', slug: 'docker' },
    ],

    useCases: [
      'HR-tech startups launching employee engagement platforms with per-seat pricing and team analytics.',
      'EdTech companies building course marketplaces with instructor dashboards and student progress tracking.',
      'Project management tools with real-time collaboration, Gantt charts, and third-party integrations.',
    ],

    stats: [
      { value: '99.95%', label: 'Platform Uptime' },
      { value: '3M+', label: 'End Users Served' },
      { value: '<6 weeks', label: 'MVP to Launch' },
    ],
  },

  // ─── 3. E-Commerce Solutions ────────────────────────────────────────
  {
    slug: 'ecommerce',
    title: 'E-Commerce Solutions',
    tagline: 'Online stores engineered to convert browsers into buyers.',
    iconName: 'ShoppingBag',
    color: '#E8A598',
    heroImage: '/services/ecommerce.png',
    description:
      'We build high-converting e-commerce experiences—from headless storefronts and marketplace platforms to custom checkout flows and inventory systems. Whether you sell 50 SKUs or 500,000, our solutions are optimized for speed, SEO, and seamless payments.',

    businessValue: [
      {
        title: 'Higher Conversion Rates',
        description:
          'Optimized checkout flows, one-click payments, and personalized product recommendations lift AOV and reduce cart abandonment.',
        iconName: 'ShoppingCart',
      },
      {
        title: 'Omnichannel Commerce',
        description:
          'Unified inventory, pricing, and order management across web, mobile, social, and in-store POS systems.',
        iconName: 'Store',
      },
      {
        title: 'SEO & Performance',
        description:
          'Server-rendered product pages, structured data, and edge caching drive organic traffic and sub-second page loads.',
        iconName: 'Search',
      },
      {
        title: 'Secure Transactions',
        description:
          'PCI DSS-compliant payment processing with fraud detection, 3D Secure, and multi-currency support.',
        iconName: 'Shield',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Commerce Strategy',
        description:
          'We audit your catalog, pricing model, and customer journey to define the optimal platform architecture and integration map.',
      },
      {
        step: 2,
        title: 'Storefront Design',
        description:
          'Conversion-focused UI design with mobile-first layouts, quick-view modals, and persuasive product storytelling.',
      },
      {
        step: 3,
        title: 'Platform Engineering',
        description:
          'Headless commerce backend, payment gateway integration, shipping APIs, and real-time inventory sync.',
      },
      {
        step: 4,
        title: 'Optimize & Scale',
        description:
          'A/B testing, heatmap analysis, and performance tuning ensure continuous improvement in revenue per visitor.',
      },
    ],

    features: [
      {
        title: 'Headless Storefront',
        description:
          'Decoupled frontend delivers lightning-fast, fully customizable shopping experiences on any device.',
        iconName: 'Globe',
      },
      {
        title: 'Smart Product Search',
        description:
          'AI-powered search with typo tolerance, faceted filters, and personalized autocomplete suggestions.',
        iconName: 'Search',
      },
      {
        title: 'Payment Processing',
        description:
          'Stripe, PayPal, Apple Pay, and local payment methods with automatic tax calculation and invoicing.',
        iconName: 'CreditCard',
      },
      {
        title: 'Inventory Management',
        description:
          'Real-time stock tracking across warehouses, automated reorder alerts, and multi-location fulfillment.',
        iconName: 'Package',
      },
      {
        title: 'Order & Shipping',
        description:
          'Automated order workflows, carrier rate comparison, label printing, and live tracking notifications.',
        iconName: 'Truck',
      },
      {
        title: 'Promotions Engine',
        description:
          'Flexible discount rules, coupon codes, flash sales, bundle pricing, and loyalty point systems.',
        iconName: 'Tag',
      },
    ],

    techStack: [
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'React', slug: 'react' },
      { name: 'Shopify', slug: 'shopify' },
      { name: 'Stripe', slug: 'stripe' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Redis', slug: 'redis' },
    ],

    useCases: [
      'D2C fashion brands launching headless storefronts with lookbook-style product pages and virtual try-on.',
      'B2B distributors building wholesale ordering portals with tiered pricing and volume discounts.',
      'Marketplace operators connecting thousands of vendors with unified checkout and split payments.',
      'Subscription box companies automating recurring orders, box curation, and customer self-service.',
    ],

    stats: [
      { value: '35%', label: 'Avg. Conversion Lift' },
      { value: '$120M+', label: 'GMV Processed' },
      { value: '<1.2s', label: 'Page Load (p95)' },
    ],
  },

  // ─── 4. Cloud & Enterprise Solutions ────────────────────────────────
  {
    slug: 'cloud-enterprise',
    title: 'Cloud & Enterprise Solutions',
    tagline: 'Resilient infrastructure and APIs that power mission-critical operations.',
    iconName: 'Cloud',
    color: '#9CC4D8',
    heroImage: '/services/cloud-enterprise.png',
    description:
      'We design cloud-native architectures, enterprise-grade backend systems, and robust API platforms that handle millions of requests per day. From microservices migration to serverless orchestration, we help organizations modernize their technology stack with confidence.',

    businessValue: [
      {
        title: 'Zero-Downtime Operations',
        description:
          'Multi-region deployments, auto-failover, and blue-green rollouts keep your services available around the clock.',
        iconName: 'Server',
      },
      {
        title: 'Cost Optimization',
        description:
          'Right-sized infrastructure, spot instances, and serverless functions reduce cloud spend by up to 45% without sacrificing performance.',
        iconName: 'TrendingUp',
      },
      {
        title: 'Regulatory Compliance',
        description:
          'SOC 2, HIPAA, and GDPR-aligned architectures with encryption, audit trails, and access controls baked in.',
        iconName: 'Shield',
      },
      {
        title: 'Seamless Integration',
        description:
          'Connect legacy ERP, CRM, and third-party SaaS tools through well-documented, versioned APIs.',
        iconName: 'Plug',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Architecture Assessment',
        description:
          'We audit existing systems, identify bottlenecks, and design a target-state architecture with a phased migration roadmap.',
      },
      {
        step: 2,
        title: 'Foundation & IaC',
        description:
          'Infrastructure as Code, CI/CD pipelines, and container orchestration establish a repeatable, auditable deployment foundation.',
      },
      {
        step: 3,
        title: 'Service Development',
        description:
          'Domain-driven microservices, event-driven messaging, and API gateways are built and tested in parallel workstreams.',
      },
      {
        step: 4,
        title: 'Observability & Ops',
        description:
          'Distributed tracing, centralized logging, and alerting dashboards give your ops team full visibility from day one.',
      },
    ],

    features: [
      {
        title: 'Microservices Architecture',
        description:
          'Independently deployable services with clear domain boundaries, contract testing, and graceful degradation.',
        iconName: 'GitMerge',
      },
      {
        title: 'API Gateway & Management',
        description:
          'Centralized routing, rate limiting, authentication, and developer portal for internal and external consumers.',
        iconName: 'Plug',
      },
      {
        title: 'Container Orchestration',
        description:
          'Kubernetes-managed workloads with auto-scaling, rolling updates, and self-healing capabilities.',
        iconName: 'Server',
      },
      {
        title: 'Event-Driven Messaging',
        description:
          'Asynchronous communication via message queues and event streams for decoupled, resilient systems.',
        iconName: 'Activity',
      },
      {
        title: 'Data Pipeline Engineering',
        description:
          'ETL/ELT pipelines, data lakes, and real-time streaming for analytics and machine learning workloads.',
        iconName: 'Database',
      },
      {
        title: 'Security & Compliance',
        description:
          'Secrets management, network policies, vulnerability scanning, and automated compliance reporting.',
        iconName: 'Lock',
      },
    ],

    techStack: [
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Redis', slug: 'redis' },
      { name: 'GraphQL', slug: 'graphql' },
    ],

    useCases: [
      'Financial institutions migrating monolithic core-banking systems to cloud-native microservices.',
      'Logistics companies building real-time fleet tracking and route optimization APIs.',
      'Healthcare networks deploying HIPAA-compliant data exchange platforms across hospital systems.',
    ],

    stats: [
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '10M+', label: 'Daily API Calls' },
      { value: '45%', label: 'Avg. Cost Reduction' },
    ],
  },

  // ─── 5. CRM Solutions ──────────────────────────────────────────────
  {
    slug: 'crm',
    title: 'CRM Solutions',
    tagline: 'Turn every customer interaction into a growth opportunity.',
    iconName: 'Users',
    color: '#8CBCA8',
    heroImage: '/services/crm.png',
    description:
      'We build custom CRM platforms and extend industry-leading tools to give your sales, marketing, and support teams a single source of truth. From lead scoring to lifecycle automation, our CRM solutions help you close deals faster and keep customers longer.',

    businessValue: [
      {
        title: '360° Customer View',
        description:
          'Unify contact data, communication history, purchase records, and support tickets in one intelligent profile.',
        iconName: 'UserCheck',
      },
      {
        title: 'Sales Pipeline Acceleration',
        description:
          'Visual deal stages, automated follow-ups, and AI-driven lead scoring help reps focus on high-value opportunities.',
        iconName: 'TrendingUp',
      },
      {
        title: 'Marketing Alignment',
        description:
          'Campaign attribution, segmentation, and email automation close the loop between marketing spend and revenue.',
        iconName: 'Target',
      },
      {
        title: 'Actionable Analytics',
        description:
          'Real-time dashboards track win rates, sales cycle length, customer lifetime value, and team performance.',
        iconName: 'PieChart',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Process Mapping',
        description:
          'We document your sales funnel, support workflows, and data sources to design a CRM architecture that fits how your team actually works.',
      },
      {
        step: 2,
        title: 'Data Migration & Cleansing',
        description:
          'Existing contacts, deals, and history are deduplicated, enriched, and imported with zero data loss.',
      },
      {
        step: 3,
        title: 'Custom Development',
        description:
          'Tailored modules for quoting, territory management, or partner portals extend the CRM beyond off-the-shelf limits.',
      },
      {
        step: 4,
        title: 'Training & Adoption',
        description:
          'Role-based training, in-app guidance, and adoption dashboards ensure your team uses the CRM consistently.',
      },
    ],

    features: [
      {
        title: 'Contact & Lead Management',
        description:
          'Capture, score, and route leads automatically with enrichment from email, web forms, and social channels.',
        iconName: 'UserPlus',
      },
      {
        title: 'Pipeline Visualization',
        description:
          'Drag-and-drop deal boards with weighted forecasting, activity timelines, and stale-deal alerts.',
        iconName: 'BarChart3',
      },
      {
        title: 'Email & Communication Hub',
        description:
          'Two-way email sync, templates, open tracking, and scheduled sequences—all logged against the contact record.',
        iconName: 'Mail',
      },
      {
        title: 'Workflow Automation',
        description:
          'Trigger tasks, notifications, and field updates based on deal stage changes, dates, or custom conditions.',
        iconName: 'Workflow',
      },
      {
        title: 'Customer Support Module',
        description:
          'Ticketing, SLA tracking, and a self-service knowledge base integrated directly with customer profiles.',
        iconName: 'Headphones',
      },
      {
        title: 'Reporting & Forecasting',
        description:
          'Custom report builder with scheduled exports, executive summaries, and AI-assisted revenue forecasting.',
        iconName: 'LineChart',
      },
    ],

    techStack: [
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Redis', slug: 'redis' },
      { name: 'GraphQL', slug: 'graphql' },
      { name: 'Docker', slug: 'docker' },
    ],

    useCases: [
      'Real estate agencies managing property listings, buyer journeys, and agent performance from a single platform.',
      'B2B SaaS companies automating outbound sequences, demo scheduling, and deal-room collaboration.',
      'Financial advisors tracking client portfolios, compliance milestones, and meeting notes in one system.',
    ],

    stats: [
      { value: '28%', label: 'Faster Deal Closure' },
      { value: '50K+', label: 'Contacts Managed' },
      { value: '3.2×', label: 'ROI in Year One' },
    ],
  },

  // ─── 6. ERP Systems ─────────────────────────────────────────────────
  {
    slug: 'erp',
    title: 'ERP Systems',
    tagline: 'Unified operations from procurement to payroll—one platform.',
    iconName: 'Building2',
    color: '#D4B078',
    heroImage: '/services/erp.png',
    description:
      'We design and implement custom ERP solutions that connect finance, HR, supply chain, and manufacturing into a single, real-time operating system for your business. Our modular approach means you start with what you need and expand as you grow.',

    businessValue: [
      {
        title: 'Operational Visibility',
        description:
          'Real-time dashboards across departments eliminate data silos and give leadership a single source of truth for decision-making.',
        iconName: 'Eye',
      },
      {
        title: 'Process Standardization',
        description:
          'Codify best practices into automated workflows that reduce manual errors and enforce compliance across all locations.',
        iconName: 'CheckCircle',
      },
      {
        title: 'Cost Control',
        description:
          'Automated purchase orders, budget tracking, and variance analysis surface savings opportunities in real time.',
        iconName: 'Receipt',
      },
      {
        title: 'Scalable Growth',
        description:
          'Add new entities, currencies, and regulatory frameworks without re-platforming—built for multi-location, multi-country operations.',
        iconName: 'Rocket',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Business Process Analysis',
        description:
          "We map every department's workflows, pain points, and data flows to design an ERP blueprint that mirrors your operations.",
      },
      {
        step: 2,
        title: 'Modular Development',
        description:
          'Core modules—finance, inventory, HR—are built and validated independently, then integrated through a unified data layer.',
      },
      {
        step: 3,
        title: 'Data Migration & Testing',
        description:
          'Historical data is migrated, reconciled, and stress-tested in staging environments before go-live.',
      },
      {
        step: 4,
        title: 'Rollout & Change Management',
        description:
          'Phased department rollouts with training, hyper-care support, and feedback loops minimize disruption.',
      },
    ],

    features: [
      {
        title: 'Financial Management',
        description:
          'General ledger, accounts payable/receivable, multi-currency, and automated reconciliation with audit trails.',
        iconName: 'Receipt',
      },
      {
        title: 'Inventory & Supply Chain',
        description:
          'Real-time stock levels, purchase order automation, vendor management, and warehouse location tracking.',
        iconName: 'Package',
      },
      {
        title: 'Human Resources',
        description:
          'Employee records, payroll processing, leave management, performance reviews, and org-chart visualization.',
        iconName: 'Users',
      },
      {
        title: 'Manufacturing & BOM',
        description:
          'Bill of materials, production scheduling, quality checks, and shop-floor tracking for discrete and process manufacturing.',
        iconName: 'Settings',
      },
      {
        title: 'Procurement Workflows',
        description:
          'Requisition-to-PO automation, three-way matching, approval hierarchies, and vendor scorecards.',
        iconName: 'FileText',
      },
      {
        title: 'Business Intelligence',
        description:
          'Cross-module reporting, KPI scorecards, and drill-down analytics for executive and operational users.',
        iconName: 'BarChart3',
      },
    ],

    techStack: [
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Redis', slug: 'redis' },
      { name: 'Docker', slug: 'docker' },
      { name: 'AWS', slug: 'amazonwebservices' },
    ],

    useCases: [
      'Mid-market manufacturers replacing spreadsheets with integrated production planning and cost accounting.',
      'Multi-location retail chains unifying POS, inventory, and finance across dozens of stores.',
      'Construction firms tracking project budgets, subcontractor payments, and equipment allocation in real time.',
    ],

    stats: [
      { value: '40%', label: 'Fewer Manual Processes' },
      { value: '12 weeks', label: 'Avg. Core Go-Live' },
      { value: '99.9%', label: 'System Uptime' },
    ],
  },

  // ─── 7. Business Portals & Dashboards ───────────────────────────────
  {
    slug: 'portals',
    title: 'Business Portals & Dashboards',
    tagline: 'Intelligent dashboards and self-service portals your teams will actually use.',
    iconName: 'LayoutDashboard',
    color: '#A8C8A8',
    heroImage: '/services/portals.png',
    description:
      'We create role-based business portals, admin dashboards, customer self-service hubs, and analytics platforms that surface the right data to the right people. From internal operations tools to client-facing portals, every interface is designed for clarity and speed.',

    businessValue: [
      {
        title: 'Self-Service Efficiency',
        description:
          'Empower customers and partners to manage accounts, track orders, and resolve issues without contacting your team.',
        iconName: 'UserCheck',
      },
      {
        title: 'Data-Driven Decisions',
        description:
          'Interactive dashboards with real-time KPIs, drill-down charts, and scheduled reports replace static spreadsheets.',
        iconName: 'BarChart3',
      },
      {
        title: 'Operational Control',
        description:
          'Admin panels with audit logs, approval workflows, and granular permissions keep internal processes secure and efficient.',
        iconName: 'Settings',
      },
      {
        title: 'Reduced Support Costs',
        description:
          'Knowledge bases, FAQ search, and guided workflows deflect up to 60% of repetitive support tickets.',
        iconName: 'HeartHandshake',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Stakeholder & Role Analysis',
        description:
          'We identify every user role, their key tasks, and the metrics they need to see—then prioritize by business impact.',
      },
      {
        step: 2,
        title: 'Information Architecture',
        description:
          'Navigation hierarchies, widget layouts, and data source mapping are designed and validated with wireframes.',
      },
      {
        step: 3,
        title: 'Dashboard Development',
        description:
          'Component-driven dashboards with real-time data connectors, caching, and responsive layouts are built in sprints.',
      },
      {
        step: 4,
        title: 'Feedback & Iteration',
        description:
          'Usage analytics and user feedback drive continuous refinement of widgets, filters, and navigation patterns.',
      },
    ],

    features: [
      {
        title: 'Real-Time Analytics',
        description:
          'Live-updating charts, gauges, and data tables powered by WebSocket connections and server-sent events.',
        iconName: 'Gauge',
      },
      {
        title: 'Customer Self-Service',
        description:
          'Account management, billing history, support tickets, and document downloads in a branded portal.',
        iconName: 'UserCheck',
      },
      {
        title: 'Admin Control Panel',
        description:
          'User management, content moderation, system configuration, and audit logging in a secure interface.',
        iconName: 'Settings',
      },
      {
        title: 'Custom Report Builder',
        description:
          'Drag-and-drop report creation with filters, grouping, export to PDF/Excel, and scheduled email delivery.',
        iconName: 'FileText',
      },
      {
        title: 'Role-Based Views',
        description:
          "Personalized dashboards that show only the data and actions relevant to each user's role and permissions.",
        iconName: 'Key',
      },
      {
        title: 'Notification Center',
        description:
          'In-app alerts, email digests, and push notifications triggered by thresholds, deadlines, or workflow events.',
        iconName: 'MessageSquare',
      },
    ],

    techStack: [
      { name: 'React', slug: 'react' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Redis', slug: 'redis' },
      { name: 'GraphQL', slug: 'graphql' },
      { name: 'Docker', slug: 'docker' },
    ],

    useCases: [
      'Insurance companies building policyholder portals with claims tracking, document upload, and renewal management.',
      'Logistics firms deploying operations dashboards with live shipment maps, carrier performance, and exception alerts.',
      'SaaS companies creating admin panels for tenant management, feature flagging, and usage analytics.',
      'Universities launching student portals with course enrollment, grade tracking, and faculty communication tools.',
    ],

    stats: [
      { value: '60%', label: 'Support Tickets Deflected' },
      { value: '<200ms', label: 'Dashboard Render Time' },
      { value: '15+', label: 'Portals Delivered' },
    ],
  },

  // ─── 8. AI & Automation ─────────────────────────────────────────────
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    tagline: 'Intelligent systems that learn, adapt, and automate at scale.',
    iconName: 'Sparkles',
    color: '#D4A0B8',
    heroImage: '/services/ai-automation.png',
    description:
      'We integrate artificial intelligence and workflow automation into your products and operations—from computer-vision quality inspection and NLP-powered chatbots to end-to-end process orchestration. Our solutions turn repetitive tasks into automated workflows and raw data into strategic insights.',

    businessValue: [
      {
        title: 'Eliminate Manual Work',
        description:
          'Automate data entry, document processing, approvals, and report generation—freeing your team for high-value work.',
        iconName: 'Workflow',
      },
      {
        title: 'Intelligent Insights',
        description:
          'Machine learning models surface patterns, anomalies, and predictions that human analysis would miss.',
        iconName: 'Brain',
      },
      {
        title: 'Always-On Support',
        description:
          'AI chatbots and virtual assistants handle customer inquiries 24/7 with context-aware, multi-turn conversations.',
        iconName: 'Bot',
      },
      {
        title: 'Competitive Advantage',
        description:
          'AI-native features—smart search, personalization, predictive analytics—differentiate your product in crowded markets.',
        iconName: 'Award',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Use-Case Identification',
        description:
          'We assess your data assets, operational bottlenecks, and strategic goals to identify AI and automation opportunities with the highest ROI.',
      },
      {
        step: 2,
        title: 'Data & Model Development',
        description:
          'Data pipelines are built, models are trained and validated, and accuracy benchmarks are established before integration.',
      },
      {
        step: 3,
        title: 'Integration & Orchestration',
        description:
          'AI models are deployed as APIs, embedded into products, and connected to workflow engines for end-to-end automation.',
      },
      {
        step: 4,
        title: 'Monitor & Retrain',
        description:
          'Model performance is tracked in production, with automated retraining pipelines to prevent accuracy drift over time.',
      },
    ],

    features: [
      {
        title: 'Conversational AI',
        description:
          'GPT-powered chatbots with RAG, tool-calling, and multi-turn memory for customer support and internal knowledge access.',
        iconName: 'MessageSquare',
      },
      {
        title: 'Document Intelligence',
        description:
          'Automated extraction, classification, and summarization of invoices, contracts, and legal documents using OCR and NLP.',
        iconName: 'FileText',
      },
      {
        title: 'Predictive Analytics',
        description:
          'Churn prediction, demand forecasting, and anomaly detection models that improve decision-making with real data.',
        iconName: 'LineChart',
      },
      {
        title: 'Workflow Orchestration',
        description:
          'Visual workflow builders with conditional logic, human-in-the-loop approvals, and third-party API connectors.',
        iconName: 'Workflow',
      },
      {
        title: 'Computer Vision',
        description:
          'Image classification, object detection, and quality inspection pipelines for manufacturing, retail, and healthcare.',
        iconName: 'Eye',
      },
      {
        title: 'AI Agent Development',
        description:
          'Autonomous agents that plan, reason, and execute multi-step tasks using LLMs, function calling, and tool integrations.',
        iconName: 'Cpu',
      },
    ],

    techStack: [
      { name: 'Python', slug: 'python' },
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Docker', slug: 'docker' },
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Redis', slug: 'redis' },
    ],

    useCases: [
      'E-commerce platforms deploying AI-powered product recommendations that lift average order value by 25%.',
      'Insurance companies automating claims processing with document OCR, fraud scoring, and adjudication workflows.',
      'Manufacturing firms running computer-vision quality inspection on production lines, reducing defect rates by 90%.',
      'Customer success teams using predictive churn models to trigger proactive retention campaigns.',
    ],

    stats: [
      { value: '85%', label: 'Task Automation Rate' },
      { value: '3×', label: 'Faster Processing' },
      { value: '< 4 weeks', label: 'First Model to Production' },
    ],
  },

  // ─── 9. Bespoke Digital Wedding Invitations ─────────────────────────
  {
    slug: 'wedding-invitation',
    title: 'Wedding Invitations',
    tagline: 'Bespoke interactive digital wedding invitations crafted like couture art.',
    iconName: 'Sparkles',
    color: '#C89565',
    heroImage: '/services/wedding-invitation.jpg',
    description:
      'We design and engineer luxury digital wedding invitations and interactive celebration microsites that turn your special announcement into an unforgettable cinematic experience. Blending fine-art typography, smooth scroll choreography, custom illustrations, and effortless RSVP management across every device.',

    businessValue: [
      {
        title: 'Couture First Impression',
        description:
          'Set the tone for your celebration with bespoke animations, custom monograms, ambient music, and editorial storytelling tailored to your love story.',
        iconName: 'Sparkles',
      },
      {
        title: 'Effortless RSVP & Guest Tracking',
        description:
          'Collect attendance, meal preferences, plus-ones, travel details, and song requests in real time with an intuitive dashboard.',
        iconName: 'UserCheck',
      },
      {
        title: 'Instant Global Sharing',
        description:
          'Share personalized invitation links instantly via WhatsApp, iMessage, or email—complete with custom social preview cards for each guest.',
        iconName: 'Globe',
      },
      {
        title: 'Multi-Event Hub',
        description:
          'Guide guests seamlessly through Haldi, Mehendi, Sangeet, Ceremony, and Reception schedules with interactive maps, dress codes, and calendar sync.',
        iconName: 'Layers',
      },
    ],

    elixorApproach: [
      {
        step: 1,
        title: 'Story & Aesthetic Curation',
        description:
          'We collaborate with you to capture your wedding theme, color palette, cultural traditions, and couple story into a bespoke moodboard.',
      },
      {
        step: 2,
        title: 'Couture Visual & Motion Design',
        description:
          'Our designers craft custom monograms, 3D/glass envelope reveals, floral motifs, and fluid scroll transitions.',
      },
      {
        step: 3,
        title: 'Interactive Engineering & RSVP Setup',
        description:
          'We build your custom domain microsite with instant load speeds, background audio controls, venue maps, and live RSVP sheets.',
      },
      {
        step: 4,
        title: 'Personalized Launch & Guest Concierge',
        description:
          'We launch your invitation on a custom URL, configure WhatsApp preview cards, and support live updates right through your wedding day.',
      },
    ],

    features: [
      {
        title: '3D Envelope & Wax Seal Reveal',
        description:
          'Interactive opening animations featuring personalized wax seals, silk ribbons, and motion-choreographed card reveals.',
        iconName: 'Award',
      },
      {
        title: 'Smart RSVP & Guest Portal',
        description:
          'Event-specific RSVP forms that dynamically show only the ceremonies each guest is invited to, synced directly to Google Sheets or Notion.',
        iconName: 'Users',
      },
      {
        title: 'Multi-Ceremony Itinerary & Maps',
        description:
          'Interactive timelines for every ceremony with dress-code palettes, one-tap Google/Apple Maps directions, and Add-to-Calendar buttons.',
        iconName: 'Globe',
      },
      {
        title: 'Personalized Guest Links',
        description:
          'Greet every family or guest by name ("Dear Sharma Family") automatically using personalized invitation links.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Ambient Soundtrack & Gallery',
        description:
          'Curated background music toggle, pre-wedding film embeds, and high-resolution editorial couple portrait galleries.',
        iconName: 'Palette',
      },
      {
        title: 'Live Photo Wall & Digital Blessings',
        description:
          'Allow guests to leave heartfelt wishes and upload celebration photos directly to your digital keepsake album.',
        iconName: 'MessageSquare',
      },
    ],

    techStack: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Framer Motion', slug: 'framermotion' },
      { name: 'Three.js', slug: 'threedotjs' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Vercel', slug: 'vercel' },
    ],

    useCases: [
      'Destination weddings requiring comprehensive travel, hotel booking, flight itinerary, and multi-day event coordination for global guests.',
      'Luxury Indian & multicultural weddings featuring personalized event invites for Mehendi, Sangeet, Baraat, and Reception.',
      'Intimate modern celebrations seeking an eco-friendly, couture digital alternative to traditional paper stationery.',
      'Post-wedding digital keepsake albums and live QR-code photo sharing walls at the reception venue.',
    ],

    stats: [
      { value: '100+', label: 'Couples Celebrated' },
      { value: '< 5 days', label: 'Turnaround Time' },
      { value: '100%', label: 'Mobile & WhatsApp Ready' },
    ],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);

export default services;
