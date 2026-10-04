import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ExternalLink,
    Code2,
    Layers,
    Globe,
    Zap,
    Sparkles,
    ArrowUpRight
} from 'lucide-react';
import MagneticIcon from '../Common/MagneticIcon';
import BlurText from '../Common/BlurText';
import './Projects.css';

/* ==========================================================================
   DATA — 4 PILLAR CARDS (INTRO MERGE) & 4 STICKY CATEGORY SECTIONS
   Order requested:
   1. Websites    (Left: Text Info, Right: Sticky Overlay Project Stack)
   2. Softwares   (Left: Sticky Overlay Project Stack, Right: Text Info)
   3. Automations (Left: Text Info, Right: Sticky Overlay Project Stack)
   4. SaaS        (Left: Sticky Overlay Project Stack, Right: Text Info)
   ========================================================================== */

const PILLAR_CARDS = [
    {
        id: 'websites',
        number: '01',
        title: 'Websites',
        subtitle: 'Web & Mobile Development',
        description: 'High-converting, WebGL-enhanced digital flagships and ultra-fast enterprise web platforms.',
        count: '03 Case Studies',
        icon: <Globe size={22} />,
        image: '/hansha.webp',
        colorTheme: 'blue',
        serviceSlug: '/features/web-mobile',
        accent: '#8BACD9',
    },
    {
        id: 'softwares',
        number: '02',
        title: 'Softwares',
        subtitle: 'CRM, ERP & Custom Systems',
        description: 'Bespoke CRMs, ERP portals, and mission-critical internal software architectures.',
        count: '03 Case Studies',
        icon: <Layers size={22} />,
        image: '/actts-crm.webp',
        colorTheme: 'emerald',
        serviceSlug: '/features/crm',
        accent: '#8CBCA8',
    },
    {
        id: 'automations',
        number: '03',
        title: 'Automations',
        subtitle: 'AI & Workflow Automation',
        description: 'Autonomous billing, AI lead triage, and zero-latency multi-system synchronization.',
        count: '03 Case Studies',
        icon: <Zap size={22} />,
        image: '/services/ai-automation.jpg',
        colorTheme: 'pink',
        serviceSlug: '/features/ai-automation',
        accent: '#D4A0B8',
    },
    {
        id: 'saas',
        number: '04',
        title: 'SaaS',
        subtitle: 'Scalable Cloud Platforms',
        description: 'Multi-tenant cloud products engineered from zero-to-one with recurring billing & scale.',
        count: '03 Case Studies',
        icon: <Sparkles size={22} />,
        image: '/bookmyca.webp',
        colorTheme: 'purple',
        serviceSlug: '/features/saas',
        accent: '#B09ED6',
    },
];

const CATEGORY_SECTIONS = [
    {
        id: 'websites',
        number: '01',
        label: 'Websites & Digital Flagships',
        tagline: 'High-velocity web experiences engineered for brand authority and conversion.',
        placement: 'text-left', // Left: Text, Right: Sticky Overlay Project Cards
        colorTheme: 'blue',
        serviceSlug: '/features/web-mobile',
        icon: <Globe size={20} />,
        projects: [
            {
                title: 'Hansha Pharmaceuticals',
                subtitle: 'Global Healthcare & Pharmaceutical Web Platform',
                description:
                    'Leading pharmaceutical company website focused on manufacturing and supplying high-quality medicines and healthcare products. Features an interactive product catalogue, responsive architecture, and sub-second page performance.',
                tech: ['Next.js', 'React', 'Tailwind CSS', 'SEO Architecture'],
                image: '/hansha.webp',
                demoUrl: 'https://www.hanshapharmaceuticals.in',
                metrics: '99+ Lighthouse Score • 2.4x Inquiry Growth',
                altText: 'Hansha Pharmaceuticals — High performance corporate website built by Vincie Studios',
            },
            {
                title: 'Vincie Studios Flagship',
                subtitle: 'Interactive WebGL & Motion Design Showcase',
                description:
                    'A bespoke creative engineering showcase built with custom Three.js fluid shaders, hardware-accelerated scroll choreography, and zero-jitter Lenis physics tailored for forward-thinking founders.',
                tech: ['React', 'Three.js WebGL', 'Framer Motion', 'Lenis'],
                image: '/services/web-app.jpg',
                demoUrl: 'https://www.vinciestudios.com',
                metrics: '60fps WebGL Fluid • Full Semantic SEO',
                altText: 'Vincie Studios — Interactive WebGL agency website built by Vincie Studios',
            },
            {
                title: 'AuraLuxe Headless Storefront',
                subtitle: 'Editorial E-Commerce & Brand Experience',
                description:
                    'High-conversion headless storefront combining editorial storytelling with instant edge-cached product filtering, localized multi-currency checkout, and fluid page transitions.',
                tech: ['Next.js', 'Headless Commerce', 'Tailwind', 'Edge CDN'],
                image: '/services/ecommerce.png',
                metrics: '0.4s Page Transitions • +68% Checkout Completion',
                altText: 'AuraLuxe Headless Storefront — E-commerce website built by Vincie Studios',
            },
        ],
    },
    {
        id: 'softwares',
        number: '02',
        label: 'Custom Softwares & Systems',
        tagline: 'Enterprise-grade internal tools, CRMs, and ERPs tailored to your exact operations.',
        placement: 'text-right', // Left: Sticky Overlay Project Cards, Right: Text
        colorTheme: 'emerald',
        serviceSlug: '/features/crm',
        icon: <Layers size={20} />,
        projects: [
            {
                title: 'ACTTS CRM',
                subtitle: 'Custom Customer Relationship & Pipeline Engine',
                description:
                    'A bespoke customer relationship management system designed to help businesses manage high-volume customer interactions. Features contact management, automated lead tracking, and real-time sales analytics.',
                tech: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
                image: '/actts-crm.webp',
                metrics: '100k+ Records Indexed • Real-Time Pipeline Sync',
                altText: 'ACTTS CRM — Custom customer relationship management software engineered by Vincie Studios',
            },
            {
                title: 'Enterprise Resource Planning Portal',
                subtitle: 'Full-Stack Operations, Finance & Role Management',
                description:
                    'A comprehensive enterprise management software designed to streamline project tracking, financial calculations, and automated invoicing. Features interactive data grids, secure role-based employee permissions, and executive reporting.',
                tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
                image: '/erp.webp',
                metrics: 'Role-Based Access • Automated Ledger & Invoicing',
                altText: 'ERP Portal — Enterprise software built by Vincie Studios',
            },
            {
                title: 'MedCore Operations & Inventory Suite',
                subtitle: 'Multi-Branch Supply Chain & Compliance Software',
                description:
                    'Centralized desktop and web operational software enabling real-time batch tracking, automated regulatory audit trails, and instant multi-warehouse stock reconciliation.',
                tech: ['TypeScript', 'Node.js', 'Redis', 'Docker'],
                image: '/services/erp-snapshot.jpg',
                metrics: 'Zero-Downtime Sync • 99.98% Inventory Accuracy',
                altText: 'MedCore Operations Suite — Custom enterprise software by Vincie Studios',
            },
        ],
    },
    {
        id: 'automations',
        number: '03',
        label: 'AI & Workflow Automations',
        tagline: 'Autonomous pipelines that eliminate manual bottlenecks and scale operations 24/7.',
        placement: 'text-left', // Left: Text, Right: Sticky Overlay Project Cards
        colorTheme: 'pink',
        serviceSlug: '/features/ai-automation',
        icon: <Zap size={20} />,
        projects: [
            {
                title: 'Autonomous Invoice & Reconciliation Engine',
                subtitle: 'Zero-Touch Financial Billing & Webhook Pipeline',
                description:
                    'An automated billing pipeline that generates branded PDF invoices, reconciles incoming Razorpay payment webhooks in real time, updates accounting ledgers, and dispatches monthly executive summaries.',
                tech: ['Node.js', 'Razorpay Webhooks', 'Puppeteer', 'SendGrid'],
                image: '/services/ai-automation.jpg',
                metrics: '40+ Hrs Saved/Mo • 100% Webhook Reconciliation',
                altText: 'Invoice & Reconciliation Automation built by Vincie Studios',
            },
            {
                title: 'AI Lead Triage & Omni-Channel Nurture',
                subtitle: 'LLM-Powered Prospect Scoring & Instant Routing',
                description:
                    'Multi-step intelligent automation that enriches inbound leads, scores buyer intent using custom AI prompts, triggers personalized email sequences, and alerts sales reps on Slack in under 3 seconds.',
                tech: ['OpenAI API', 'n8n Workflows', 'PostgreSQL', 'Slack SDK'],
                image: '/services/ai-snapshot.jpg',
                metrics: '< 3s Lead Response • 3.1x Qualified Meetings',
                altText: 'AI Lead Triage Automation built by Vincie Studios',
            },
            {
                title: 'Multi-Warehouse Order & ERP Sync',
                subtitle: 'Event-Driven Inventory & Fulfillment Automation',
                description:
                    'Real-time bidirectional synchronization between storefront orders and warehouse ERP systems, automating SKU deduction, courier waybill generation, and predictive low-stock alerts.',
                tech: ['Python', 'Event Queues', 'REST Webhooks', 'Cloud Cron'],
                image: '/services/devops-snapshot.jpg',
                metrics: '50k+ Daily Events • Zero Manual Data Entry',
                altText: 'Multi-Warehouse ERP Sync Automation by Vincie Studios',
            },
        ],
    },
    {
        id: 'saas',
        number: '04',
        label: 'SaaS Platforms & Cloud Products',
        tagline: 'Full-scale multi-tenant software-as-a-service platforms built for recurring revenue.',
        placement: 'text-right', // Left: Sticky Overlay Project Cards, Right: Text
        colorTheme: 'purple',
        serviceSlug: '/features/saas',
        icon: <Sparkles size={20} />,
        projects: [
            {
                title: 'Book My CA',
                subtitle: 'End-to-End Financial & Compliance SaaS Platform',
                description:
                    'BookMyCA is a financial services SaaS platform providing end-to-end solutions including tax filing, GST workflows, accounting, company registration, compliance, audits, and CA advisory for individuals, startups, and enterprises.',
                tech: ['Next.js', 'Razorpay', 'MongoDB', 'Multi-Tenant Auth'],
                image: '/bookmyca.webp',
                demoUrl: 'https://www.bookmyca.in',
                metrics: 'End-to-End Tax & GST • Integrated Razorpay Billing',
                altText: 'BookMyCA — Financial SaaS platform built by Vincie Studios',
            },
            {
                title: 'PulseMetrics Cloud Analytics SaaS',
                subtitle: 'Multi-Tenant Revenue & Cohort Intelligence Platform',
                description:
                    'A B2B SaaS platform offering real-time cohort retention tracking, usage-based subscription billing, customizable team workspaces, and embeddable white-label analytics dashboards.',
                tech: ['Next.js', 'TypeScript', 'Stripe Billing', 'WebSockets'],
                image: '/saas-dashboard.jpg',
                metrics: 'Sub-100ms Queries • Multi-Workspace RBAC',
                altText: 'PulseMetrics Analytics SaaS built by Vincie Studios',
            },
            {
                title: 'NexusFlow Client Portal SaaS',
                subtitle: 'Collaborative Retainer & Deliverable Cloud Suite',
                description:
                    'A white-label SaaS product enabling agencies and consulting firms to onboard clients, automate recurring retainers, manage milestone approvals, and share encrypted document vaults.',
                tech: ['React', 'Node.js', 'GraphQL', 'AWS S3'],
                image: '/services/saas-snapshot.jpg',
                metrics: 'White-Label Domains • Automated Retainer Billing',
                altText: 'NexusFlow Client Portal SaaS built by Vincie Studios',
            },
        ],
    },
];

/* ==========================================================================
   HELPERS — MATH & HERO-STYLE BLUR TEXT
   ========================================================================== */

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const smoothstep = (edge0, edge1, x) => {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
};

// Blended smoothstep + cubic ease-out for cushioned start & silky landing
const smoothOverlayEase = (x) => {
    const t = clamp(x, 0, 1);
    const s = t * t * (3 - 2 * t);
    const c = 1 - Math.pow(1 - t, 3);
    return s * 0.32 + c * 0.68;
};

/**
 * Renders words that appear and disappear in-place with the Hero section
 * blur + opacity + y-offset wave animation.
 * For long paragraphs (>8 words), blur is applied on the parent container while
 * words stagger y + opacity to avoid running 30 concurrent GPU blur filters.
 */
const HeroAnimatedWords = ({ text, className = '', wordDelay = 0.022, baseDelay = 0, as = 'div' }) => {
    const words = text.split(' ');
    const isLongCopy = words.length > 8;
    const MotionTag = motion[as] || motion.div;

    return (
        <MotionTag
            className={`hero-blur-words ${className}`.trim()}
            initial={isLongCopy ? { filter: 'blur(8px)' } : undefined}
            animate={isLongCopy ? { filter: 'blur(0px)' } : undefined}
            exit={
                isLongCopy
                    ? { filter: 'blur(8px)', transition: { duration: 0.2, ease: 'easeIn' } }
                    : undefined
            }
            transition={isLongCopy ? { duration: 0.42, delay: baseDelay, ease: 'easeOut' } : undefined}
        >
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    className="hero-blur-word"
                    initial={
                        isLongCopy
                            ? { opacity: 0, y: 18 }
                            : { filter: 'blur(10px)', opacity: 0, y: 24 }
                    }
                    animate={
                        isLongCopy
                            ? { opacity: 1, y: 0 }
                            : {
                                  filter: ['blur(10px)', 'blur(3px)', 'blur(0px)'],
                                  opacity: [0, 0.65, 1],
                                  y: [24, -2, 0],
                              }
                    }
                    exit={
                        isLongCopy
                            ? {
                                  opacity: 0,
                                  y: -12,
                                  transition: { duration: 0.18, delay: Math.min(i * 0.004, 0.06), ease: 'easeIn' },
                              }
                            : {
                                  filter: 'blur(8px)',
                                  opacity: 0,
                                  y: -18,
                                  transition: { duration: 0.2, delay: Math.min(i * 0.008, 0.08), ease: 'easeIn' },
                              }
                    }
                    transition={{
                        duration: isLongCopy ? 0.38 : 0.48,
                        times: isLongCopy ? undefined : [0, 0.62, 1],
                        delay: baseDelay + i * wordDelay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {word}
                    {i < words.length - 1 ? '\u00A0' : ''}
                </motion.span>
            ))}
        </MotionTag>
    );
};

/* ==========================================================================
   STATIONARY TEXT PANEL (APPEARS & DISAPPEARS LIKE HERO SECTION TEXT)
   ========================================================================== */

const CategoryTextPanel = ({
    section,
    activeIndex,
    isSectionVisible,
    onSelectProject,
    progressBarRef,
}) => {
    const project = section.projects[activeIndex] || section.projects[0];

    return (
        <div className="proj-split-text-col">
            {/* Stationary Category Header Bar */}
            <motion.div
                className="proj-cat-header-bar"
                initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
                animate={
                    isSectionVisible
                        ? { filter: 'blur(0px)', opacity: 1, y: 0 }
                        : { filter: 'blur(10px)', opacity: 0, y: -16 }
                }
                transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="proj-cat-pill">
                    <span className="proj-cat-pill-num">{section.number}</span>
                    <span className="proj-cat-pill-divider" />
                    <span className="proj-cat-pill-icon">{section.icon}</span>
                    <span className="proj-cat-pill-label">{section.label}</span>
                </div>

                {/* Step Selector Dots (01 / 02 / 03) */}
                <div className="proj-step-indicators" role="tablist" aria-label={`${section.label} project steps`}>
                    {section.projects.map((p, idx) => (
                        <button
                            key={p.title}
                            type="button"
                            onClick={() => onSelectProject(idx)}
                            className={`proj-step-dot ${idx === activeIndex ? 'active' : ''} ${idx < activeIndex ? 'passed' : ''}`}
                            aria-label={`View ${p.title}`}
                            aria-selected={idx === activeIndex}
                        >
                            <span>0{idx + 1}</span>
                        </button>
                    ))}
                </div>

                {/* Smooth Section Progress Line */}
                <div className="proj-cat-progress-rail" aria-hidden="true">
                    <div className="proj-cat-progress-fill" ref={progressBarRef} />
                </div>
            </motion.div>

            {/* Active Project Text — Appears & Disappears in-place like Hero text */}
            <div className="proj-active-text-stage">
                <AnimatePresence mode="wait">
                    {isSectionVisible && (
                        <motion.div
                            key={`${section.id}-proj-${activeIndex}`}
                            className="proj-active-text-inner"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.14 }}
                        >
                            {/* Subtitle / Counter */}
                            <motion.div
                                className="proj-active-kicker"
                                initial={{ filter: 'blur(8px)', opacity: 0, y: 16 }}
                                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                                exit={{ filter: 'blur(8px)', opacity: 0, y: -12, transition: { duration: 0.18 } }}
                                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="proj-kicker-index">
                                    PROJECT 0{activeIndex + 1} / 0{section.projects.length}
                                </span>
                                <span className="proj-kicker-sep">•</span>
                                <span className="proj-kicker-sub">{project.subtitle}</span>
                            </motion.div>

                            {/* Project Title — Hero Word-by-Word Blur Appear/Disappear */}
                            <HeroAnimatedWords
                                as="h3"
                                text={project.title}
                                className="proj-active-title"
                                wordDelay={0.032}
                                baseDelay={0.02}
                            />

                            {/* Project Description — Hero Blur Appear/Disappear */}
                            <HeroAnimatedWords
                                as="p"
                                text={project.description}
                                className="proj-active-desc"
                                wordDelay={0.01}
                                baseDelay={0.06}
                            />

                            {/* Impact Metric Highlight */}
                            {project.metrics && (
                                <motion.div
                                    className="proj-active-metric"
                                    initial={{ filter: 'blur(6px)', opacity: 0, y: 14, scale: 0.97 }}
                                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
                                    exit={{ filter: 'blur(6px)', opacity: 0, y: -10, transition: { duration: 0.18 } }}
                                    transition={{ duration: 0.4, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <span className="proj-metric-dot" />
                                    <span>{project.metrics}</span>
                                </motion.div>
                            )}

                            {/* Tech Tags & Consistent Action Row */}
                            <motion.div
                                className="proj-active-footer"
                                initial={{ filter: 'blur(8px)', opacity: 0, y: 16 }}
                                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                                exit={{ filter: 'blur(8px)', opacity: 0, y: -12, transition: { duration: 0.18 } }}
                                transition={{ duration: 0.42, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="proj-tags-row">
                                    {project.tech.map((t) => (
                                        <span key={t} className="proj-gold-tag">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="proj-cta-row">
                                    {project.demoUrl ? (
                                        <MagneticIcon>
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="proj-live-cta"
                                                aria-label={`Visit ${project.title} live website`}
                                            >
                                                <span>Visit Live Project</span>
                                                <ArrowUpRight size={16} />
                                            </a>
                                        </MagneticIcon>
                                    ) : (
                                        <a
                                            href="/contact"
                                            className="proj-live-cta proj-live-cta-secondary"
                                            aria-label={`Request architecture walkthrough for ${project.title}`}
                                        >
                                            <span>Request Case Study</span>
                                            <ArrowUpRight size={15} />
                                        </a>
                                    )}

                                    {section.serviceSlug && (
                                        <a
                                            href={section.serviceSlug}
                                            className="proj-service-link"
                                            aria-label={`Explore ${section.label} service details`}
                                        >
                                            <span>Explore Service</span>
                                            <ArrowUpRight size={14} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ==========================================================================
   MAIN PROJECTS COMPONENT
   ========================================================================== */

const Projects = () => {
    // Refs for Stage 1: 4 Category Cards Merging on Scroll
    const mergeTrackRef = useRef(null);
    const mergeGridRef = useRef(null);
    const mergeHeaderRef = useRef(null);
    const mergeAuraRef = useRef(null);
    const scrollHintRef = useRef(null);
    const pillarCardRefs = useRef([]);
    const pillarDeltaXRef = useRef([0, 0, 0, 0]);
    const pillarDeltaYRef = useRef([0, 0, 0, 0]);
    const mergeMetricsRef = useRef({ top: 0, scrollable: 1 });

    // Refs for Stage 2: 4 Sticky Category Sections
    const sectionTrackRefs = useRef([]);
    const sectionMetricsRef = useRef([]);
    const sectionCardRefs = useRef(CATEGORY_SECTIONS.map(() => []));
    const sectionProgressRefs = useRef([]);

    // Active project index per category section (triggers Hero blur text transition)
    const [activeIndices, setActiveIndices] = useState([0, 0, 0, 0]);
    const activeIndicesRef = useRef([0, 0, 0, 0]);

    // Whether each category section is currently active in viewport
    const [sectionVisible, setSectionVisible] = useState([true, false, false, false]);
    const sectionVisibleRef = useRef([true, false, false, false]);

    // Smooth damped scroll state for zero-jitter 60/120fps choreography
    const rafIdRef = useRef(null);
    const targetScrollYRef = useRef(0);
    const smoothScrollYRef = useRef(0);

    const getDocTop = useCallback((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
    }, []);

    /* ── Measure layout offsets on mount & resize (zero layout reads per scroll frame) ── */
    const measureAll = useCallback(() => {
        const vh = window.innerHeight;

        // 1. Measure 4-card merge track
        if (mergeTrackRef.current) {
            const top = getDocTop(mergeTrackRef.current);
            const height = mergeTrackRef.current.offsetHeight;
            mergeMetricsRef.current = {
                top,
                scrollable: Math.max(1, height - vh),
            };
        }

        // Measure horizontal & vertical distance from each of the 4 pillar cards to the stage center
        // Using offsetLeft/offsetTop avoids layout thrashing and is unaffected by active CSS transforms
        if (mergeGridRef.current && pillarCardRefs.current.length === 4) {
            const gridEl = mergeGridRef.current;
            const gridCenterX = gridEl.clientWidth / 2;
            const gridCenterY = gridEl.clientHeight / 2;

            const nextDeltaX = [0, 0, 0, 0];
            const nextDeltaY = [0, 0, 0, 0];

            pillarCardRefs.current.forEach((cardEl, idx) => {
                if (!cardEl) return;
                const cardCenterX = cardEl.offsetLeft + cardEl.offsetWidth / 2;
                const cardCenterY = cardEl.offsetTop + cardEl.offsetHeight / 2;
                nextDeltaX[idx] = gridCenterX - cardCenterX;
                nextDeltaY[idx] = gridCenterY - cardCenterY;
            });

            pillarDeltaXRef.current = nextDeltaX;
            pillarDeltaYRef.current = nextDeltaY;
        }

        // 2. Measure each of the 4 sticky category tracks
        sectionMetricsRef.current = sectionTrackRefs.current.map((trackEl) => {
            if (!trackEl) return { top: 0, scrollable: 1, height: vh };
            const top = getDocTop(trackEl);
            const height = trackEl.offsetHeight;
            return {
                top,
                height,
                scrollable: Math.max(1, height - vh),
            };
        });
    }, [getDocTop]);

    /* ── Per-frame GPU transform update ── */
    const renderAtScroll = useCallback((scrollY) => {
        const vh = window.innerHeight;
        const isCompact = window.innerWidth <= 900;

        /* =========================================================
           1. STAGE 1: FOUR CATEGORY CARDS COME CLOSER & MERGE
           ========================================================= */
        const { top: mergeTop, scrollable: mergeScrollable } = mergeMetricsRef.current;
        const mergeProgress = clamp((scrollY - mergeTop) / mergeScrollable, 0, 1);

        // Convergence phase (0.0 -> 0.68): cards glide toward center with gradual momentum
        const convergeT = smoothstep(0.0, 0.68, mergeProgress);
        // Merge lock & handoff phase (0.68 -> 1.0): cards compress into unified stack
        const lockT = smoothstep(0.68, 1.0, mergeProgress);

        // Optical centering lift: as header dissolves, lift converging deck toward true viewport center
        const centerLiftY = -convergeT * (isCompact ? 24 : 46);

        // Header blurs & fades out like Hero text as cards come closer
        if (mergeHeaderRef.current) {
            const headerFade = smoothstep(0.14, 0.56, mergeProgress);
            const blurPx = (headerFade * 10).toFixed(1);
            const opacity = (1 - headerFade).toFixed(3);
            const ty = (-headerFade * (isCompact ? 20 : 32)).toFixed(1);
            mergeHeaderRef.current.style.transform = `translate3d(0, ${ty}px, 0)`;
            mergeHeaderRef.current.style.opacity = opacity;
            mergeHeaderRef.current.style.filter = headerFade > 0.01 ? `blur(${blurPx}px)` : 'none';
        }

        // Scroll hint fades out cleanly once scrolling starts
        if (scrollHintRef.current) {
            const hintFade = smoothstep(0.03, 0.25, mergeProgress);
            scrollHintRef.current.style.opacity = (0.85 * (1 - hintFade)).toFixed(3);
            scrollHintRef.current.style.transform = `translate3d(0, ${(hintFade * 12).toFixed(1)}px, 0)`;
        }

        // Golden aura intensifies as the 4 cards merge in the center
        if (mergeAuraRef.current) {
            const auraOpacity = smoothstep(0.32, 0.76, mergeProgress) * (1 - lockT * 0.3);
            const auraScale = 0.75 + convergeT * 0.45;
            mergeAuraRef.current.style.opacity = auraOpacity.toFixed(3);
            mergeAuraRef.current.style.transform = `translate3d(-50%, calc(-50% + ${centerLiftY.toFixed(1)}px), 0) scale(${auraScale.toFixed(3)})`;
        }

        const fanY = isCompact ? [0, 0, 0, 0] : [16, 0, 0, 16];
        const fanRot = isCompact ? [-1.8, 1.8, -1.8, 1.8] : [-3.8, -1.2, 1.2, 3.8];

        pillarCardRefs.current.forEach((cardEl, i) => {
            if (!cardEl) return;
            const deltaX = pillarDeltaXRef.current[i] || 0;
            const deltaY = pillarDeltaYRef.current[i] || 0;

            // Move horizontally & vertically toward center so all 4 cards meet at center on any grid layout
            const tx = deltaX * convergeT;

            // Initial slight arc straightens out, then forms a tight stacked cascade at optical center
            const stackOffsetY = (i - 1.5) * (isCompact ? 6 : 9) * convergeT * (1 - lockT * 0.6);
            const ty = deltaY * convergeT + fanY[i] * (1 - convergeT) + stackOffsetY + centerLiftY;

            // Fan rotation straightens to 0deg as they merge
            const rot = fanRot[i] * (1 - convergeT);

            // Depth scale in merged stack (Websites card 0 on top)
            const mergedScale = 1 - i * 0.03 * convergeT - lockT * 0.035;

            // Subtle opacity dimming for back cards once merged so Websites (card 0) leads into Section 1
            const mergedOpacity = i === 0 ? 1 : 1 - lockT * (0.16 * i);

            cardEl.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${mergedScale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
            cardEl.style.opacity = mergedOpacity.toFixed(3);
            cardEl.style.zIndex = String(10 - i);
        });

        /* =========================================================
           2. STAGE 2: FOUR STICKY CATEGORY SECTIONS
              Screen stays sticky while project cards overlay on each
              other on scroll; text stays stationary and appears /
              disappears like Hero section text.
           ========================================================= */
        let indicesChanged = false;
        let visibleChanged = false;
        const nextIndices = [...activeIndicesRef.current];
        const nextVisible = [...sectionVisibleRef.current];

        const slideDistance = isCompact ? Math.min(vh * 0.5, 310) : vh * 0.78;
        const peekShift = isCompact ? 10 : 18;
        const card1RestOffset = isCompact ? 10 : 16;
        const card2RestOffset = isCompact ? 20 : 32;

        CATEGORY_SECTIONS.forEach((section, secIdx) => {
            const metrics = sectionMetricsRef.current[secIdx];
            if (!metrics) return;

            const rawProgress = (scrollY - metrics.top) / metrics.scrollable;
            const progress = clamp(rawProgress, 0, 1);

            // Update real-time section progress bar fill
            const progressBarEl = sectionProgressRefs.current[secIdx];
            if (progressBarEl) {
                const fillPct = clamp(0.12 + progress * 0.88, 0.12, 1);
                progressBarEl.style.transform = `scaleX(${fillPct.toFixed(3)})`;
            }

            // Is this section currently in the active viewport window?
            const isInWindow =
                scrollY + vh * 0.65 >= metrics.top &&
                scrollY <= metrics.top + metrics.height - vh * 0.2;

            if (nextVisible[secIdx] !== isInWindow) {
                nextVisible[secIdx] = isInWindow;
                visibleChanged = true;
            }

            let activeProj = 0;
            if (progress >= 0.66) {
                activeProj = 2;
            } else if (progress >= 0.26) {
                activeProj = 1;
            } else {
                activeProj = 0;
            }

            if (nextIndices[secIdx] !== activeProj) {
                nextIndices[secIdx] = activeProj;
                indicesChanged = true;
            }

            // Compute sticky overlay transforms for the 3 project cards in this section
            const cards = sectionCardRefs.current[secIdx] || [];
            const enter1 = smoothOverlayEase((progress - 0.1) / (0.44 - 0.1)); // Card 1 overlay entrance
            const enter2 = smoothOverlayEase((progress - 0.5) / (0.84 - 0.5)); // Card 2 overlay entrance

            // Card 0 (Base card in the sticky stack — stays crisp and steps back in depth)
            if (cards[0]) {
                const scale0 = 1 - enter1 * 0.048 - enter2 * 0.042;
                const ty0 = -enter1 * peekShift - enter2 * (peekShift * 0.85);
                cards[0].style.transform = `translate3d(0, ${ty0.toFixed(2)}px, 0) scale(${scale0.toFixed(4)})`;
                cards[0].style.opacity = '1';
                cards[0].style.zIndex = '1';
            }

            // Card 1 (Second card — slides up from bottom and overlays on Card 0)
            if (cards[1]) {
                const slideY1 = (1 - enter1) * slideDistance;
                const stackShift1 = -enter2 * peekShift;
                const ty1 = slideY1 + card1RestOffset * enter1 + stackShift1;
                const scale1 = (0.96 + 0.04 * enter1) * (1 - enter2 * 0.048);
                const opacity1 = smoothstep(0.09, 0.2, progress);
                cards[1].style.transform = `translate3d(0, ${ty1.toFixed(2)}px, 0) scale(${scale1.toFixed(4)})`;
                cards[1].style.opacity = String(opacity1.toFixed(3));
                cards[1].style.zIndex = '2';
                cards[1].style.pointerEvents = enter1 > 0.5 ? 'auto' : 'none';
            }

            // Card 2 (Third card — slides up from bottom and overlays on Card 1 & Card 0)
            if (cards[2]) {
                const slideY2 = (1 - enter2) * slideDistance;
                const ty2 = slideY2 + card2RestOffset * enter2;
                const scale2 = 0.96 + 0.04 * enter2;
                const opacity2 = smoothstep(0.49, 0.6, progress);
                cards[2].style.transform = `translate3d(0, ${ty2.toFixed(2)}px, 0) scale(${scale2.toFixed(4)})`;
                cards[2].style.opacity = String(opacity2.toFixed(3));
                cards[2].style.zIndex = '3';
                cards[2].style.pointerEvents = enter2 > 0.5 ? 'auto' : 'none';
            }
        });

        if (indicesChanged) {
            activeIndicesRef.current = nextIndices;
            setActiveIndices(nextIndices);
        }
        if (visibleChanged) {
            sectionVisibleRef.current = nextVisible;
            setSectionVisible(nextVisible);
        }
    }, []);

    /* ── Damped RAF loop for silky-smooth scroll choreography across wheel & touch ── */
    const tickScroll = useCallback(() => {
        const target = targetScrollYRef.current;
        const current = smoothScrollYRef.current;
        const diff = target - current;

        // Higher lerp when Lenis is already smoothing; softer lerp for native wheel/touch
        const lerpFactor = window.lenis ? 0.34 : 0.24;

        if (Math.abs(diff) > 0.15) {
            smoothScrollYRef.current = current + diff * lerpFactor;
            renderAtScroll(smoothScrollYRef.current);
            rafIdRef.current = requestAnimationFrame(tickScroll);
        } else {
            smoothScrollYRef.current = target;
            renderAtScroll(target);
            rafIdRef.current = null;
        }
    }, [renderAtScroll]);

    const onScroll = useCallback(() => {
        targetScrollYRef.current = window.scrollY;
        if (!rafIdRef.current) {
            rafIdRef.current = requestAnimationFrame(tickScroll);
        }
    }, [tickScroll]);

    useEffect(() => {
        targetScrollYRef.current = window.scrollY;
        smoothScrollYRef.current = window.scrollY;
        measureAll();
        renderAtScroll(window.scrollY);

        const handleResize = () => {
            targetScrollYRef.current = window.scrollY;
            smoothScrollYRef.current = window.scrollY;
            measureAll();
            renderAtScroll(window.scrollY);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        // Re-measure after images & fonts settle
        const timer = setTimeout(() => {
            measureAll();
            renderAtScroll(window.scrollY);
        }, 350);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', handleResize);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, [measureAll, onScroll, renderAtScroll]);

    /* ── Helper to scroll smoothly to a specific category or project step ── */
    const scrollToCategory = (secIdx, projIdx = 0) => {
        const metrics = sectionMetricsRef.current[secIdx];
        if (!metrics) return;
        const targetRatios = [0.04, 0.45, 0.86];
        const targetY = metrics.top + metrics.scrollable * (targetRatios[projIdx] ?? 0);
        if (window.lenis) {
            window.lenis.scrollTo(targetY, { duration: 1.15 });
        } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    };

    return (
        <section className="projects-showcase-root" id="projects" aria-label="Vincie Studios Portfolio Showcase">
            {/* =================================================================
                STAGE 1: 4 PILLAR CARDS CONVERGING & MERGING ON SCROLL
                ================================================================= */}
            <div className="proj-merge-track" ref={mergeTrackRef}>
                <div className="proj-merge-sticky">
                    <div className="proj-ambient-orb" />
                    <div className="proj-section-lines" aria-hidden="true" />

                    {/* Intro Header — Appears & Disappears like Hero Section Text */}
                    <div className="proj-merge-header" ref={mergeHeaderRef}>
                        <div className="liquid-badge-wrapper section-badge">
                            <div className="liquid-badge">
                                <span className="badge-content-text">Our Portfolio • 4 Core Domains</span>
                            </div>
                        </div>

                        <h1 className="proj-merge-headline">
                            <BlurText
                                as="span"
                                text="Engineered Across "
                                delay={45}
                                direction="top"
                                animateBy="words"
                            />
                            <span className="proj-gold-gradient-text">Four Pillars</span>
                        </h1>

                        <BlurText
                            className="proj-merge-subtext"
                            text="Scroll to watch our four disciplines converge — then explore our Websites, Softwares, Automations, and SaaS platforms."
                            delay={22}
                            direction="top"
                            animateBy="words"
                        />
                    </div>

                    {/* 4 Category Cards that Come Closer & Merge on Scroll */}
                    <div className="proj-merge-stage-wrap">
                        <div className="proj-merge-aura" ref={mergeAuraRef} />

                        <div className="proj-merge-grid" ref={mergeGridRef}>
                            {PILLAR_CARDS.map((card, i) => (
                                <div
                                    key={card.id}
                                    ref={(el) => {
                                        pillarCardRefs.current[i] = el;
                                    }}
                                    className={`proj-pillar-card proj-pillar-card-${i} color-${card.colorTheme}`}
                                    onClick={() => scrollToCategory(i, 0)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') scrollToCategory(i, 0);
                                    }}
                                    aria-label={`Explore ${card.title} projects`}
                                >
                                    <div className="proj-pillar-card-image">
                                        <img
                                            src={card.image}
                                            alt={`${card.title} portfolio category — Vincie Studios`}
                                            loading="eager"
                                            width="400"
                                            height="250"
                                        />
                                        <div className="proj-pillar-card-img-overlay" />
                                        <span className="proj-pillar-num">{card.number}</span>
                                    </div>

                                    <div className="proj-pillar-card-body">
                                        <div className="proj-pillar-top">
                                            <div className="proj-pillar-icon">{card.icon}</div>
                                            <span className="proj-pillar-count">{card.count}</span>
                                        </div>
                                        <h2 className="proj-pillar-title">{card.title}</h2>
                                        <span className="proj-pillar-subtitle">{card.subtitle}</span>
                                        <p className="proj-pillar-desc">{card.description}</p>
                                        <div className="proj-pillar-explore">
                                            <span>Explore Domain</span>
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="proj-scroll-hint" ref={scrollHintRef}>
                        <span className="proj-scroll-line" />
                        <span>Scroll to merge &amp; explore</span>
                        <span className="proj-scroll-line proj-scroll-line-right" />
                    </div>
                </div>
            </div>

            {/* =================================================================
                STAGE 2: 4 STICKY CATEGORY SECTIONS WITH ALTERNATING PLACEMENT
                1. Websites    -> Text Left,  Image Stack Right (Blue)
                2. Softwares   -> Image Stack Left, Text Right (Emerald)
                3. Automations -> Text Left,  Image Stack Right (Pink)
                4. SaaS        -> Image Stack Left, Text Right (Purple)
                ================================================================= */}
            {CATEGORY_SECTIONS.map((section, secIdx) => {
                const isTextLeft = section.placement === 'text-left';
                const activeProjIdx = activeIndices[secIdx] ?? 0;
                const isVis = sectionVisible[secIdx] ?? true;

                return (
                    <div
                        key={section.id}
                        id={`projects-${section.id}`}
                        className={`proj-cat-track proj-cat-track-${section.id} theme-${section.colorTheme}`}
                        ref={(el) => {
                            sectionTrackRefs.current[secIdx] = el;
                        }}
                    >
                        <div className="proj-cat-sticky">
                            <div className="proj-section-lines" aria-hidden="true" />
                            <div
                                className={`proj-cat-split ${
                                    isTextLeft ? 'layout-text-left' : 'layout-text-right'
                                }`}
                            >
                                {/* Stationary Text Side (Appears & Disappears like Hero Text) */}
                                <CategoryTextPanel
                                    section={section}
                                    activeIndex={activeProjIdx}
                                    isSectionVisible={isVis}
                                    onSelectProject={(projIdx) => scrollToCategory(secIdx, projIdx)}
                                    progressBarRef={(el) => {
                                        sectionProgressRefs.current[secIdx] = el;
                                    }}
                                />

                                {/* Sticky Overlay Project Image Stack Side */}
                                <div className="proj-split-stack-col">
                                    <div className="proj-overlay-stack-stage">
                                        {section.projects.map((project, projIdx) => (
                                            <article
                                                key={project.title}
                                                ref={(el) => {
                                                    if (!sectionCardRefs.current[secIdx]) {
                                                        sectionCardRefs.current[secIdx] = [];
                                                    }
                                                    sectionCardRefs.current[secIdx][projIdx] = el;
                                                }}
                                                className={`proj-overlay-card proj-overlay-card-${projIdx}`}
                                            >
                                                <div className="proj-overlay-card-glow" />

                                                {/* Top Browser / Window Chrome Bar */}
                                                <div className="proj-overlay-card-chrome">
                                                    <div className="chrome-dots">
                                                        <span className="dot dot-gold-1" />
                                                        <span className="dot dot-gold-2" />
                                                        <span className="dot dot-gold-3" />
                                                    </div>
                                                    <span className="chrome-title">
                                                        {section.label} — 0{projIdx + 1}
                                                    </span>
                                                    {project.demoUrl ? (
                                                        <a
                                                            href={project.demoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="chrome-live-badge"
                                                            aria-label={`Open ${project.title} live`}
                                                        >
                                                            Live <ExternalLink size={12} />
                                                        </a>
                                                    ) : (
                                                        <span className="chrome-tag-badge">Case Study</span>
                                                    )}
                                                </div>

                                                {/* Project Visual Image */}
                                                <div className="proj-overlay-card-media">
                                                    <img
                                                        src={project.image}
                                                        alt={project.altText || project.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        width="860"
                                                        height="540"
                                                    />
                                                    <div className="proj-overlay-card-gradient" />

                                                    {/* Bottom Floating Caption inside Image Card */}
                                                    <div className="proj-overlay-card-caption">
                                                        <div>
                                                            <span className="caption-step">
                                                                0{projIdx + 1} / 0{section.projects.length}
                                                            </span>
                                                            <h4 className="caption-title">{project.title}</h4>
                                                        </div>
                                                        <div className="caption-tags">
                                                            {project.tech.slice(0, 3).map((t) => (
                                                                <span key={t} className="caption-pill">
                                                                    {t}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Structured Data for SEO */}
                                                <script
                                                    type="application/ld+json"
                                                    dangerouslySetInnerHTML={{
                                                        __html: JSON.stringify({
                                                            '@context': 'https://schema.org',
                                                            '@type': 'SoftwareApplication',
                                                            name: project.title,
                                                            operatingSystem: 'Web',
                                                            applicationCategory: 'BusinessApplication',
                                                            description: project.description,
                                                            creator: {
                                                                '@type': 'Organization',
                                                                name: 'Vincie Studios',
                                                            },
                                                        }),
                                                    }}
                                                />
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default Projects;
