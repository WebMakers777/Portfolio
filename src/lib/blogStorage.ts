// src/lib/blogStorage.ts

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  coverImage?: string;
  content: string; // Rich Markdown/HTML with embedded :::quiz {...} ::: blocks
  published: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface CloudDbConfig {
  provider: "supabase" | "googlesheet" | "custom";
  supabaseUrl?: string;
  supabaseKey?: string;
  sheetWebhookUrl?: string;
  customApiUrl?: string;
}

const STORAGE_KEY = "vincie_portfolio_blogs_v2";
const CLOUD_CONFIG_KEY = "vincie_cloud_db_config_v1";

export const INITIAL_SAMPLE_POSTS: BlogPost[] = [
  {
    _id: "post_autonomous_ai_systems_2026",
    slug: "engineering-autonomous-ai-agents-edge-systems",
    title: "Engineering Autonomous AI Agents & Real-Time Edge Systems at Scale",
    excerpt: "A deep architectural analysis into building production-grade autonomous agent systems, event-driven streaming pipelines, and low-latency edge architectures.",
    author: "Nikhil Mittal",
    category: "Engineering",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 124,
    content: `Modern software engineering is undergoing an epochal transformation. The paradigm has shifted from imperative code execution to orchestrating autonomous, cognitive agentic systems that perceive context, synthesize execution plans, and dynamically self-heal across distributed edge networks.

![Modern AI Architecture|wide](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

![Neural Processing Grid|wide](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80)

## 1. The Autonomous Agent Execution Paradigm

Rather than relying on brittle, static microservices, autonomous AI agents operate through continuous loop cycles of **observation**, **reflection**, **tool selection**, and **stateful verification**. 

> The ultimate frontier of modern software is not merely executing static routines, but orchestrating autonomous cognitive agents that reason, plan, and self-correct across distributed edge networks.

When deploying high-throughput agent swarms in production, maintaining ==sub-50ms execution latency== and ==zero-drift state determinism== are non-negotiable requirements.

---

### Core Architectural Guardrails

> [!TIP]
> Always implement bounded retry budgets with exponential jitter backoff when orchestrating recursive multi-agent loops to prevent cascading API saturation.

> [!NOTE]
> Edge runtimes execute within isolated V8 memory spaces, ensuring cold-start boot times remain consistently under 5 milliseconds worldwide.

> [!WARNING]
> Unconstrained tool execution without JSON-schema validation can lead to silent schema regressions and runtime desynchronization.

> [!IMPORTANT]
> Deterministic state persistence across agent steps requires event-sourcing with append-only vector write logs.

---

## 2. Multi-Stage Pipeline Execution

Building enterprise-grade agentic platforms requires decomposing complex user intents into an orchestrated series of deterministic phases:

1. Semantic Intent Parsing & Input Embeddings Generation
2. Vector Similarity Lookup & Ephemeral Context Retrieval
3. Tool Selection, Plan Synthesis & Dry-Run Validation
4. Edge Action Execution & Distributed State Synchronization
5. Post-Action Validation, Guardrail Verification & Metric Logging

Each phase executes within a sandbox runtime where memory limits and CPU budgets are strictly enforced.

---

## 3. High-Performance Infrastructure Metrics

Our distributed infrastructure benchmark measurements demonstrate the advantages of edge-native execution:

✓ Automated regression self-healing pipelines with 99.98% reliability
✦ Distributed vector clustering across 300+ edge Points of Presence
★ Real-time cryptographic session verification and automated token rotation
→ Direct streaming WebSocket protocol over HTTP/3 QUIC transport
⚡ Sub-millisecond Redis cluster memory caching for hot agent execution contexts

![Component Island Isolation|left](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80 "Figure 1: High-dimensional vector space clustering and semantic KNN indexing.")

By keeping inference and orchestration geographically co-located with the end user, round-trip serialization overhead drops from hundreds of milliseconds to near-zero.

---

## 4. Production Orchestration Implementation

Below is a reference TypeScript implementation showing how we initialize a fault-tolerant multi-agent mesh running on edge runtimes:

\`\`\`typescript
import { EdgeRuntime, AgentMesh, VectorStore } from "@vincie/agents-sdk";

export async function orchestratePipeline(userPrompt: string) {
  // 1. Initialize isolated edge runtime session
  const mesh = new AgentMesh({
    region: "auto",
    maxConcurrency: 8,
    timeoutMs: 4500,
  });

  const session = await mesh.initiateSession({
    strictTypes: true,
    telemetryEnabled: true,
  });

  // 2. Stream execution plan with active tool calling
  const stream = await session.streamExecution({
    input: userPrompt,
    tools: ["database_sync", "code_verifier", "metric_audit"],
    onStep: (step) => {
      console.log(\`[Edge Step \${step.index}]: \${step.actionName}\`);
    },
  });

  return stream.toReadableStream();
}
\`\`\`

---

## 5. Architectural Knowledge Verification

Test your understanding of edge runtime performance and agent design:

:::quiz
{
  "id": "q-agents-1",
  "question": "Which architecture delivers the lowest cold-start latency for autonomous AI agent tool execution at the edge?",
  "options": [
    "V8 Isolated Micro-Runtimes (<5ms startup)",
    "Traditional Heavyweight Docker Containers (500ms - 2s startup)",
    "Monolithic Centralized VM Clusters",
    "Cold Java Virtual Machines"
  ],
  "correctIndex": 0,
  "explanation": "Correct! V8 Isolates spin up in less than 5ms within existing thread memory pools, completely eliminating container provisioning overhead."
}
:::

---

## Architectural Synthesis

As AI models evolve from passive autocomplete engines to active autonomous contributors, the underlying web infrastructure must match their velocity. Combining **isolated edge runtimes**, **semantic vector caching**, and **structured schema guardrails** provides the foundation for the next decade of resilient software engineering.`
  }
];

function normalizePostFromDb(raw: any): BlogPost {
  return {
    _id: raw._id || raw.id || "post_" + Math.random().toString(36).slice(2),
    slug: raw.slug || "",
    title: raw.title || "Untitled Article",
    excerpt: raw.excerpt || "",
    author: raw.author || "Vincie Studios",
    category: raw.category || "Engineering",
    readTime: raw.readTime || raw.read_time || "4 min read",
    coverImage: raw.coverImage || raw.cover_image || "",
    content: raw.content || "",
    published: raw.published !== undefined ? Boolean(raw.published) : true,
    createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
    updatedAt: raw.updatedAt || raw.updated_at || new Date().toISOString(),
    views: Number(raw.views) || 0,
  };
}

export const blogStorage = {
  // ─── Cloud Database Configuration ──────────────────────────

  getCloudConfig: (): CloudDbConfig => {
    const defaultUrl =
      import.meta.env.VITE_SUPABASE_URL || "https://wwpfvdxejvzxddimnmqy.supabase.co";
    const defaultKey =
      import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_KprphVTPbGNBaopWaiH_8w_0vlkeB3q";

    try {
      const stored = localStorage.getItem(CLOUD_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        let sUrl = (parsed.supabaseUrl || defaultUrl).trim();
        // Auto-correct previous typo if missing 'x'
        if (sUrl.includes("wwpfvdxejvzddimnmqy")) {
          sUrl = sUrl.replace("wwpfvdxejvzddimnmqy", "wwpfvdxejvzxddimnmqy");
        }
        const updatedConfig: CloudDbConfig = {
          provider: parsed.provider || "supabase",
          supabaseUrl: sUrl,
          supabaseKey: parsed.supabaseKey || defaultKey,
          sheetWebhookUrl: parsed.sheetWebhookUrl || import.meta.env.VITE_CONTACT_SHEET_URL || "",
        };
        localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(updatedConfig));
        return updatedConfig;
      }
    } catch {
      // ignore
    }

    // Default configuration (configured with your Supabase credentials)
    return {
      provider: "supabase",
      supabaseUrl: defaultUrl,
      supabaseKey: defaultKey,
      sheetWebhookUrl: import.meta.env.VITE_CONTACT_SHEET_URL || "",
    };
  },

  saveCloudConfig: (config: CloudDbConfig): void => {
    try {
      localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Could not save cloud DB config", e);
    }
  },

  // ─── Local Storage Cache (0ms Instant Load) ─────────────────

  getPosts: (): BlogPost[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_POSTS));
        return INITIAL_SAMPLE_POSTS;
      }
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SAMPLE_POSTS;
    } catch (e) {
      console.error("Error reading blog posts from storage", e);
      return INITIAL_SAMPLE_POSTS;
    }
  },

  getPublishedPosts: (): BlogPost[] => {
    const posts = blogStorage.getPosts();
    return posts
      .filter((p) => p.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getPostBySlug: (slug: string): BlogPost | null => {
    const posts = blogStorage.getPosts();
    return posts.find((p) => p.slug === slug) || null;
  },

  getPostById: (id: string): BlogPost | null => {
    const posts = blogStorage.getPosts();
    return posts.find((p) => p._id === id) || null;
  },

  // ─── Save Post (Optimistic Local + Async Cloud) ─────────────

  savePost: (
    post: Omit<BlogPost, "_id" | "createdAt" | "updatedAt" | "views"> & {
      _id?: string;
      createdAt?: string;
      views?: number;
    }
  ): BlogPost => {
    const posts = blogStorage.getPosts();
    const now = new Date().toISOString();
    let saved: BlogPost;

    if (post._id) {
      const index = posts.findIndex((p) => p._id === post._id);
      if (index !== -1) {
        saved = {
          ...posts[index],
          ...post,
          _id: post._id,
          updatedAt: now,
          views: post.views !== undefined ? post.views : posts[index].views,
          createdAt: post.createdAt || posts[index].createdAt,
        };
        posts[index] = saved;
      } else {
        saved = {
          ...post,
          _id: post._id,
          views: post.views || 0,
          createdAt: post.createdAt || now,
          updatedAt: now,
        };
        posts.unshift(saved);
      }
    } else {
      saved = {
        ...post,
        _id: "post_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        views: post.views || 0,
        createdAt: now,
        updatedAt: now,
      };
      posts.unshift(saved);
    }

    // Save to local cache immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

    // Asynchronously save to cloud database in background
    blogStorage.savePostToCloud(saved).catch((err) => {
      console.warn("Background cloud save note:", err);
    });

    return saved;
  },

  deletePost: (id: string): boolean => {
    const posts = blogStorage.getPosts();
    const filtered = posts.filter((p) => p._id !== id);
    if (filtered.length !== posts.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      blogStorage.deletePostFromCloud(id).catch((err) => {
        console.warn("Background cloud delete note:", err);
      });
      return true;
    }
    return false;
  },

  incrementViews: (slugOrId: string): void => {
    try {
      const posts = blogStorage.getPosts();
      const index = posts.findIndex((p) => p._id === slugOrId || p.slug === slugOrId);
      if (index !== -1) {
        posts[index].views = (posts[index].views || 0) + 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      }
    } catch (e) {
      console.warn("Could not increment post views", e);
    }
  },

  // ─── Cloud Database Operations ──────────────────────────────

  fetchCloudPosts: async (): Promise<BlogPost[]> => {
    const config = blogStorage.getCloudConfig();

    try {
      // 1. Supabase REST API (Fastest Edge PostgreSQL)
      if (config.supabaseUrl && config.supabaseKey) {
        const cleanUrl = config.supabaseUrl.replace(/\/+$/, "");
        const res = await fetch(`${cleanUrl}/rest/v1/blogs?select=*&order=created_at.desc`, {
          method: "GET",
          headers: {
            apikey: config.supabaseKey,
            Authorization: `Bearer ${config.supabaseKey}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const normalized = data.map(normalizePostFromDb);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
            return normalized;
          }
        }
      }

      // 2. Google Apps Script Webhook API
      if (config.sheetWebhookUrl) {
        const url = new URL(config.sheetWebhookUrl);
        url.searchParams.set("action", "getBlogs");
        const res = await fetch(url.toString(), { method: "GET" });
        if (res.ok) {
          const json = await res.json();
          if (json && Array.isArray(json.blogs) && json.blogs.length > 0) {
            const normalized = json.blogs.map(normalizePostFromDb);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
            return normalized;
          }
        }
      }
    } catch (err) {
      console.warn("Cloud posts fetch note:", err);
    }

    // Fallback to local storage if cloud is unreachable or empty
    return blogStorage.getPosts();
  },

  savePostToCloud: async (post: BlogPost): Promise<{ success: boolean; error?: string }> => {
    const config = blogStorage.getCloudConfig();

    try {
      // 1. Supabase REST API
      if (config.supabaseUrl && config.supabaseKey) {
        const cleanUrl = config.supabaseUrl.replace(/\/+$/, "");
        
        // Match exact column names in Postgres blogs table
        const payload = {
          _id: post._id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt || "",
          author: post.author || "Vincie Studios",
          category: post.category || "Engineering",
          read_time: post.readTime || "4 min read",
          cover_image: post.coverImage || "",
          content: post.content || "",
          published: post.published !== undefined ? post.published : true,
          views: post.views || 0,
          created_at: post.createdAt || new Date().toISOString(),
          updated_at: post.updatedAt || new Date().toISOString(),
        };

        const res = await fetch(`${cleanUrl}/rest/v1/blogs?on_conflict=_id`, {
          method: "POST",
          headers: {
            apikey: config.supabaseKey,
            Authorization: `Bearer ${config.supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates",
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          return { success: true };
        } else {
          const errText = await res.text().catch(() => "");
          console.warn("Supabase save returned status:", res.status, errText);
          if (res.status === 404 || errText.includes("relation") || errText.includes("does not exist") || errText.includes("PGRST205")) {
            return {
              success: false,
              error: "Table 'blogs' not found in Supabase. Please run the SQL table setup in your Supabase SQL Editor.",
            };
          }
          return { success: false, error: `Supabase error (${res.status}): ${errText || res.statusText}` };
        }
      }

      // 2. Google Apps Script Webhook API
      if (config.sheetWebhookUrl) {
        const res = await fetch(config.sheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "saveBlog", post }),
        });
        if (res.ok) return { success: true };
        return { success: false, error: "Google Apps Script error: " + res.status };
      }
    } catch (err: any) {
      console.warn("Cloud save post note:", err);
      return { success: false, error: err?.message || "Network request failed." };
    }

    return { success: false, error: "No cloud database configured." };
  },

  deletePostFromCloud: async (id: string): Promise<boolean> => {
    const config = blogStorage.getCloudConfig();

    try {
      // 1. Supabase REST API
      if (config.supabaseUrl && config.supabaseKey) {
        const cleanUrl = config.supabaseUrl.replace(/\/+$/, "");
        const res = await fetch(`${cleanUrl}/rest/v1/blogs?_id=eq.${id}`, {
          method: "DELETE",
          headers: {
            apikey: config.supabaseKey,
            Authorization: `Bearer ${config.supabaseKey}`,
          },
        });
        if (res.ok) return true;
      }

      // 2. Google Apps Script Webhook API
      if (config.sheetWebhookUrl) {
        const res = await fetch(config.sheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "deleteBlog", id }),
        });
        if (res.ok) return true;
      }
    } catch (err) {
      console.warn("Cloud delete post note:", err);
    }

    return false;
  },

  testCloudConnection: async (): Promise<{ success: boolean; message: string }> => {
    const config = blogStorage.getCloudConfig();

    if (config.provider === "supabase") {
      if (!config.supabaseUrl || !config.supabaseKey) {
        return { success: false, message: "Please enter both Supabase URL and Anon Key." };
      }
      try {
        const cleanUrl = config.supabaseUrl.replace(/\/+$/, "");
        const res = await fetch(`${cleanUrl}/rest/v1/blogs?select=_id,slug&limit=1`, {
          method: "GET",
          headers: {
            apikey: config.supabaseKey,
            Authorization: `Bearer ${config.supabaseKey}`,
          },
        });

        if (res.ok) {
          return { success: true, message: "Connected to Supabase PostgreSQL successfully! Blogs will be live for everyone." };
        } 
        
        const errText = await res.text().catch(() => "");
        if (res.status === 404 || errText.includes("does not exist") || errText.includes("PGRST205") || errText.includes("relation")) {
          return { success: false, message: "Connected to Supabase, but the 'blogs' table has not been created yet. Copy and run the SQL table setup in Supabase SQL Editor." };
        } else if (res.status === 401 || res.status === 403) {
          return { success: false, message: "Supabase authorization failed. Please check your Anon Key." };
        } else {
          return { success: false, message: `Supabase returned status ${res.status}: ${errText || "Check your credentials."}` };
        }
      } catch (e: any) {
        return { success: false, message: `Connection failed: ${e?.message || "Check your Supabase URL."}` };
      }
    }

    if (config.provider === "googlesheet") {
      if (!config.sheetWebhookUrl) {
        return { success: false, message: "Please enter your Google Apps Script Webhook URL." };
      }
      try {
        const res = await fetch(config.sheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "ping" }),
        });
        if (res.ok) {
          return { success: true, message: "Connected to Google Apps Script successfully!" };
        }
        return { success: false, message: "Webhook returned status " + res.status };
      } catch (e: any) {
        return { success: false, message: "Could not reach Google Apps Script webhook." };
      }
    }

    return { success: false, message: "Please configure a database provider." };
  },

  syncAllToCloud: async (): Promise<{ success: boolean; count: number; error?: string }> => {
    const posts = blogStorage.getPosts();
    let successCount = 0;
    let lastError: string | undefined;

    for (const post of posts) {
      const res = await blogStorage.savePostToCloud(post);
      if (res.success) {
        successCount++;
      } else if (res.error) {
        lastError = res.error;
      }
    }

    return {
      success: successCount > 0,
      count: successCount,
      error: lastError,
    };
  },

  // ─── Backup & Migration ─────────────────────────────────────

  exportData: (): string => {
    const posts = blogStorage.getPosts();
    return JSON.stringify(posts, null, 2);
  },

  importData: (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Invalid JSON for blog import", e);
      return false;
    }
  },

  resetToDefaults: (): BlogPost[] => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_POSTS));
    return INITIAL_SAMPLE_POSTS;
  },
};
