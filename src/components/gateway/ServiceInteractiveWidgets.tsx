import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Play,
  RefreshCw,
  Terminal,
  Zap,
  Activity,
  Server,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Shield,
  Smartphone,
  Layers,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  Boxes,
} from "lucide-react";

interface WidgetProps {
  type: string;
  serviceTitle: string;
}

export default function ServiceInteractiveWidget({ type, serviceTitle }: WidgetProps) {
  // 1. Web Speed Simulator State
  const [speedUrl, setSpeedUrl] = useState("https://app.vincie.com");
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [speedScore, setSpeedScore] = useState(99);

  const runSpeedTest = () => {
    setIsTestingSpeed(true);
    setTimeout(() => {
      setSpeedScore(Math.floor(Math.random() * 2) + 98);
      setIsTestingSpeed(false);
    }, 900);
  };

  // 2. SaaS Multi-Tenant Switcher State
  const [selectedTenant, setSelectedTenant] = useState<"acme" | "stripe_partner" | "fintech">("acme");
  const [seatCount, setSeatCount] = useState(250);

  // 3. CRM Pipeline State
  const [dealStage, setDealStage] = useState<"inbound" | "demo" | "proposal" | "won">("proposal");
  const [chatSent, setChatSent] = useState(false);

  // 4. ERP Inventory State
  const [stockLevel, setStockLevel] = useState(140);
  const [poTriggered, setPoTriggered] = useState(false);

  // 5. AI Stream State
  const [aiPromptType, setAiPromptType] = useState<"invoice" | "contract" | "agent">("invoice");
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // 6. Mobile Preview State
  const [mobileTab, setMobileTab] = useState<"home" | "orders" | "chat">("home");

  // 7. DevOps Cluster State
  const [podScale, setPodScale] = useState(8);
  const [clusterRegion, setClusterRegion] = useState("us-east-1");

  // 8. Growth Attribution State
  const [adSpend, setAdSpend] = useState(5000);

  return (
    <div className="relative rounded-3xl bg-[#0D0D0D] border border-white/[0.12] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden font-inter">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-[11px] font-mono text-[#888] ml-2">
            live-software-preview :: {type}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
            Simulated Interactive Engine
          </span>
        </div>
      </div>

      {/* ──────────────── 1. WEB SPEED SIMULATOR ──────────────── */}
      {type === "web-speed" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full flex items-center bg-[#151515] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white">
              <span className="text-[#666] mr-2">GET</span>
              <input
                type="text"
                value={speedUrl}
                onChange={(e) => setSpeedUrl(e.target.value)}
                className="bg-transparent text-white focus:outline-none flex-1 font-mono"
              />
            </div>
            <button
              onClick={runSpeedTest}
              disabled={isTestingSpeed}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E5E5E5] transition-all shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              {isTestingSpeed ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Profiling...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Test Edge Latency</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06] text-center">
              <div className="text-3xl font-black text-emerald-400 font-mono mb-1">
                {speedScore}/100
              </div>
              <span className="text-[11px] font-semibold text-[#888]">Lighthouse Performance</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06] text-center">
              <div className="text-3xl font-black text-white font-mono mb-1">
                42ms
              </div>
              <span className="text-[11px] font-semibold text-[#888]">TTFB (Edge Cache)</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06] text-center">
              <div className="text-3xl font-black text-white font-mono mb-1">
                0.28s
              </div>
              <span className="text-[11px] font-semibold text-[#888]">Largest Contentful Paint</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06] text-center">
              <div className="text-3xl font-black text-emerald-400 font-mono mb-1">
                0.00
              </div>
              <span className="text-[11px] font-semibold text-[#888]">Cumulative Layout Shift</span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 2. SAAS MULTI-TENANT MRR SIMULATOR ──────────────── */}
      {type === "saas-mrr" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888]">Active Tenant:</span>
              <div className="flex rounded-xl bg-[#151515] p-1 border border-white/[0.08]">
                <button
                  onClick={() => setSelectedTenant("acme")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    selectedTenant === "acme" ? "bg-white text-black" : "text-[#888] hover:text-white"
                  }`}
                >
                  Acme Corp (Enterprise)
                </button>
                <button
                  onClick={() => setSelectedTenant("stripe_partner")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    selectedTenant === "stripe_partner" ? "bg-white text-black" : "text-[#888] hover:text-white"
                  }`}
                >
                  Stripe Partner (Growth)
                </button>
                <button
                  onClick={() => setSelectedTenant("fintech")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    selectedTenant === "fintech" ? "bg-white text-black" : "text-[#888] hover:text-white"
                  }`}
                >
                  Fintech Scale (Tier 1)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Monthly Recurring Revenue
              </span>
              <div className="text-2xl font-black text-white font-mono mt-1">
                ${(seatCount * 45 + (selectedTenant === "acme" ? 5000 : 2200)).toLocaleString()}/mo
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                +24.6% QoQ Growth
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                  Active Metered Seats
                </span>
                <span className="text-xs font-bold text-white">{seatCount} Seats</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={seatCount}
                onChange={(e) => setSeatCount(Number(e.target.value))}
                className="w-full mt-3 accent-white"
              />
              <span className="text-[10px] text-[#888] mt-1 block">
                PostgreSQL RLS Isolated Tenant Schema
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                SAML SSO & Auth Status
              </span>
              <div className="flex items-center gap-2 mt-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Okta / Azure SAML 2.0</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                Strict RBAC Enforced
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 3. CRM PIPELINE SIMULATOR ──────────────── */}
      {type === "crm-pipeline" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#888]">Interactive Deal Pipeline Stages:</span>
            <div className="flex flex-wrap rounded-xl bg-[#151515] p-1 border border-white/[0.08] gap-1">
              {(["inbound", "demo", "proposal", "won"] as const).map((stage) => (
                <button
                  key={stage}
                  onClick={() => setDealStage(stage)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors ${
                    dealStage === stage
                      ? "bg-white text-black shadow-sm"
                      : "text-[#888] hover:text-white"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-7 p-5 rounded-2xl bg-[#141414] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-xs">
                    AG
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Atlas Global Holdings</h5>
                    <span className="text-[10px] text-[#888]">$68,500 Contract Value</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.08] text-white">
                  Stage: {dealStage.toUpperCase()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0B0B] border border-white/[0.04] text-xs text-[#A3A3A3] space-y-1.5 font-mono">
                <div>Lead Source: <span className="text-white">Google Inbound Search</span></div>
                <div>Assigned Rep: <span className="text-white">Senior Solutions Engineer</span></div>
                <div>Next Action: <span className="text-emerald-400">Automated WhatsApp Follow-Up</span></div>
              </div>
            </div>

            <div className="sm:col-span-5 p-5 rounded-2xl bg-[#141414] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#888] block mb-2">
                  Omnichannel Integration
                </span>
                <div className="flex items-center gap-2 text-xs text-white">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Cloud API Sync</span>
                </div>
                <p className="text-[11px] text-[#888] mt-1.5">
                  1-click quote PDF dispatch with real-time digital read receipts.
                </p>
              </div>

              <button
                onClick={() => setChatSent(!chatSent)}
                className={`mt-4 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  chatSent
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                    : "bg-white text-black hover:bg-[#E5E5E5]"
                }`}
              >
                {chatSent ? "✓ WhatsApp Quote Sent" : "Send WhatsApp Quote Proposal"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 4. ERP INVENTORY SIMULATOR ──────────────── */}
      {type === "erp-inventory" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                SKU-9921 Stock Level (Warehouse A)
              </span>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {stockLevel} Units
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => setStockLevel(Math.max(20, stockLevel - 30))}
                  className="px-2.5 py-1 rounded bg-[#222] text-xs font-bold text-white hover:bg-[#333]"
                >
                  - Dispatch 30 Units
                </button>
                <button
                  onClick={() => setStockLevel(stockLevel + 50)}
                  className="px-2.5 py-1 rounded bg-[#222] text-xs font-bold text-white hover:bg-[#333]"
                >
                  + Restock 50
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Reorder Trigger Status
              </span>
              <div className="mt-2">
                {stockLevel <= 80 ? (
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Low Stock! Auto-PO Generating</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Healthy Inventory Level</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-[#888] mt-2">
                Threshold set at 80 units with tiered supplier quotation matching.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Double-Entry Accounting Sync
              </span>
              <div className="text-xs font-mono text-[#D4D4D4] mt-2 space-y-1">
                <div>Dr: Inventory Assets (+${stockLevel * 24})</div>
                <div>Cr: Accounts Payable (-${stockLevel * 24})</div>
              </div>
              <span className="text-[10px] text-emerald-400 mt-2 block">
                Instant Trial Balance Reconciled
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 5. AI STREAM SIMULATOR ──────────────── */}
      {type === "ai-stream" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#888]">Select Agent Workload:</span>
            <div className="flex rounded-xl bg-[#151515] p-1 border border-white/[0.08]">
              {(["invoice", "contract", "agent"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAiPromptType(mode)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                    aiPromptType === mode ? "bg-white text-black" : "text-[#888] hover:text-white"
                  }`}
                >
                  {mode === "invoice" ? "PDF Invoice OCR" : mode === "contract" ? "Contract RAG" : "Autonomous Bot"}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-4 text-xs font-mono text-[#D4D4D4] leading-relaxed space-y-2">
            <div className="flex items-center justify-between text-[#888] border-b border-white/[0.06] pb-2">
              <span>MODEL: Claude 3.5 Sonnet + pgvector RAG</span>
              <span className="text-emerald-400">99.8% Deterministic Confidence</span>
            </div>
            {aiPromptType === "invoice" && (
              <>
                <div className="text-purple-400">&gt; Ingesting invoice_48102.pdf (14 pages)...</div>
                <div className="text-sky-400">&gt; Extracted Vendor: "Acme Industrial Corp" (Tax ID: US-991203)</div>
                <div className="text-emerald-400">&gt; Line Items: 8 parsed | Total Amount: $14,280.00 USD</div>
                <div className="text-amber-300">&gt; Action: Auto-reconciled with ERP Purchase Order #PO-88192</div>
              </>
            )}
            {aiPromptType === "contract" && (
              <>
                <div className="text-purple-400">&gt; Querying enterprise knowledge base (84,000 vector embeddings)...</div>
                <div className="text-sky-400">&gt; Matching clause: "Indemnification & SLA Uptime Commitments"</div>
                <div className="text-emerald-400">&gt; Citation: master_service_agreement_v4.pdf #Section 8.2</div>
                <div className="text-amber-300">&gt; Response generated with zero hallucination constraints</div>
              </>
            )}
            {aiPromptType === "agent" && (
              <>
                <div className="text-purple-400">&gt; Agent triggered by incoming webhook from CRM</div>
                <div className="text-sky-400">&gt; Executing Tool: `verify_customer_credit_score()`</div>
                <div className="text-emerald-400">&gt; Tool Result: Approved (Credit Score: 785)</div>
                <div className="text-amber-300">&gt; Dispatched confirmation email & Slack channel alert</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ──────────────── 6. MOBILE APP PREVIEW ──────────────── */}
      {type === "mobile-preview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Native Frame Rate
              </span>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                60.0 FPS
              </div>
              <span className="text-[10px] text-[#888] mt-1 block">
                Hardware Accelerated Reanimated 3
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Offline SQLite Storage
              </span>
              <div className="flex items-center gap-2 mt-2">
                <Database className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white">WatermelonDB Local Sync</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                Instant UI without network waiting
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Instant OTA Updates
              </span>
              <div className="flex items-center gap-2 mt-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Expo EAS / CodePush</span>
              </div>
              <span className="text-[10px] text-[#888] mt-1 block">
                Push bug fixes directly to devices
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 7. DEVOPS CLUSTER SIMULATOR ──────────────── */}
      {type === "devops-cluster" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888]">AWS Multi-AZ Region:</span>
              <span className="text-xs font-mono font-bold text-white bg-[#181818] px-3 py-1 rounded-lg border border-white/[0.08]">
                us-east-1 (N. Virginia)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888]">Kubernetes HPA Pods:</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                {podScale} Running Pods
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: podScale }).map((_, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#121212] border border-white/[0.06] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-xs font-mono text-white">pod-node-{i + 1}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#888]">
            <span>Auto-scaling Pod Range: 4 - 32 pods</span>
            <span className="text-emerald-400 font-bold">99.99% Uptime Verified</span>
          </div>
        </div>
      )}

      {/* ──────────────── 8. GROWTH ATTRIBUTION SIMULATOR ──────────────── */}
      {type === "growth-attribution" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Monthly Paid Ad Budget
              </span>
              <div className="text-2xl font-black text-white font-mono mt-1">
                ${adSpend.toLocaleString()}
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="1000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full mt-3 accent-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Attributed Revenue (3.8x ROAS)
              </span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                ${(adSpend * 3.8).toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                Server-Side Meta CAPI & GA4 Tracked
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                Programmatic SEO Indexed
              </span>
              <div className="text-2xl font-black text-white font-mono mt-1">
                4,280 Pages
              </div>
              <span className="text-[10px] text-[#888] mt-1 block">
                Top 3 Ranking for High-Intent Keywords
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
