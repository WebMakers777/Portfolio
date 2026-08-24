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

const STORAGE_KEY = "vincie_portfolio_blogs_v1";

export const INITIAL_SAMPLE_POSTS: BlogPost[] = [
  {
    _id: "post-1",
    slug: "mastering-modern-web-architecture-2026",
    title: "The Architecture of Resilience: Scaling Micro-Frontends & Distributed Edge Systems",
    excerpt: "An architectural examination into edge execution runtimes, selective island hydration, and distributed cache invalidation for sub-50ms web applications.",
    author: "Nikhil Mittal",
    category: "Engineering",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    published: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views: 842,
    content: `Modern software engineering is confronting a fundamental shift. For years, client-side heavy single-page applications dominated the landscape, trading initial page load speed and battery efficiency for dynamic client-side interactions.

![Distributed Edge Network|wide](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80 "Figure 1: Global Edge nodes executing isolated V8 instances across 300+ PoPs worldwide.")

## The Paradigm of Edge Compute

Rather than routing every HTTP request back to a centralized origin server located thousands of miles away, modern platforms push execution logic to global Points of Presence (PoPs). Running lightweight JavaScript runtimes (such as Cloudflare Workers or Vercel Edge Functions) allows dynamic HTML generation within 15 milliseconds of the user.

> The most resilient distributed system is one where compute lives at the edge of the network and state is lazily synchronized.

### Core Architectural Advantages:
- **Instantaneous Time to First Byte (TTFB)**: Sub-50ms worldwide response times.
- **Zero Cold-Start Latency**: V8 Isolates boot in less than 5 milliseconds compared to container-based serverless functions.
- **DDoS Mitigation**: Geographically dispersed traffic dampening.

:::quiz
{
  "id": "q1",
  "question": "What is the primary architectural benefit of V8 Isolates at the Edge over traditional containerized lambdas?",
  "options": [
    "Near-instant boot times (<5ms) with ultra-low memory overhead per request",
    "They eliminate the need for any frontend code",
    "They only serve static files without executing code",
    "They require heavy Docker virtualization"
  ],
  "correctIndex": 0,
  "explanation": "Correct! V8 Isolates share a single process and spin up lightweight execution contexts in under 5ms, avoiding container cold starts."
}
:::

## Selective Hydration and Island Topologies

Traditional React architectures mandate full-tree DOM hydration, freezing the main thread during critical initial page interactions. Island Architecture isolates interactive components, hydrating only what is necessary when it scrolls into the viewport.

![Component Island Isolation|right](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80 "Fig. 2 — Island isolation isolating UI widgets from static HTML.")

By rendering the main body text, headers, and images as pure static HTML on the server, the browser avoids parsing hundreds of kilobytes of unneeded JavaScript.

\`\`\`typescript
// Selective Progressive Hydration Observer
export function observeAndHydrate(elementId: string, loader: () => Promise<void>) {
  const target = document.getElementById(elementId);
  if (!target) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loader();
      observer.disconnect();
    }
  }, { rootMargin: "100px" });

  observer.observe(target);
}
\`\`\`

---

## Architectural Synthesis

As applications continue to scale toward millions of concurrent users, the boundary between frontend presentation and distributed backend logic will continue to blur. Designing for resilience requires picking the right execution boundary for each feature.

:::quiz
{
  "id": "q2",
  "question": "In an Island Architecture, what happens to the static HTML content during client page load?",
  "options": [
    "It remains pure HTML and skips the expensive JavaScript hydration phase",
    "It is deleted and re-rendered entirely from scratch",
    "It cannot display any styled typography",
    "It requires a complete browser reboot"
  ],
  "correctIndex": 0,
  "explanation": "Spot on! The static parts remain pure HTML, ensuring zero JavaScript execution overhead for non-interactive content."
}
:::`
  },
  {
    _id: "post-2",
    slug: "principles-of-high-converting-interface-engineering",
    title: "The Anatomy of High-Converting Digital Interfaces: Typography, Contrast & Micro-Interactions",
    excerpt: "A deep dive into visual ergonomics, cognitive load reduction, and the physics of tactile interface feedback for elite software products.",
    author: "Vincie Studios Editorial",
    category: "Design",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    published: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    views: 1210,
    content: `Great digital design is not merely decorative styling—it is visual ergonomics and cognitive choreography. When a user interacts with software, every microsecond of feedback, every contrast ratio, and every typographic line height communicates brand authority.

![High Contrast Design Canvas|left](https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80 "Fig. 1 — Matte black foundation with high-contrast typography.")

## The Physics of Tactile Feedback

Physical objects obey laws of inertia, acceleration, and friction. When digital UI elements snap rigidly without transitional easing, the brain perceives the interface as robotic and unpolished.

> Interfaces that feel natural adhere to physical spring kinetics rather than linear timing.

### Essential Rules for Motion Design:
1. **Response Time**: UI must acknowledge input within 100ms.
2. **Animation Duration**: Micro-interactions should complete within 180ms to 260ms.
3. **Organic Easing**: Utilize cubic bezier curves that decelerate smoothly at the terminus.

:::quiz
{
  "id": "q3",
  "question": "What is the recommended duration for user interface hover and button micro-transitions?",
  "options": [
    "180ms to 260ms (responsive, natural, and snappy)",
    "2 seconds (slow cinematic transition)",
    "0ms (instant snapping without easing)",
    "500ms to 800ms (dramatic fade)"
  ],
  "correctIndex": 0,
  "explanation": "Exactly right! Transitions between 180ms and 260ms feel instantaneous while still giving the user a subconscious sense of kinetic fluidity."
}
:::

---

## Typographic Hierarchy in Long-Form Reading

Reading on backlit screens causes eye strain when line lengths exceed 80 characters or when contrast ratios are too harsh. By locking editorial column widths to a golden 65–75 character span with generous 1.8x line height, comprehension and reading retention increase significantly.`
  }
];

export const blogStorage = {
  getPosts: (): BlogPost[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_POSTS));
        return INITIAL_SAMPLE_POSTS;
      }
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_POSTS;
    } catch (e) {
      console.error("Error reading blog posts from storage", e);
      return INITIAL_SAMPLE_POSTS;
    }
  },

  getPublishedPosts: (): BlogPost[] => {
    const posts = blogStorage.getPosts();
    return posts
      .filter((p) => p.published)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },

  getPostBySlug: (slug: string): BlogPost | null => {
    const posts = blogStorage.getPosts();
    return posts.find((p) => p.slug === slug) || null;
  },

  getPostById: (id: string): BlogPost | null => {
    const posts = blogStorage.getPosts();
    return posts.find((p) => p._id === id) || null;
  },

  savePost: (
    post: Omit<BlogPost, "_id" | "createdAt" | "updatedAt" | "views"> & {
      _id?: string;
      createdAt?: string;
      views?: number;
    }
  ): BlogPost => {
    const posts = blogStorage.getPosts();
    const now = new Date().toISOString();

    if (post._id) {
      const index = posts.findIndex((p) => p._id === post._id);
      if (index !== -1) {
        const updated: BlogPost = {
          ...posts[index],
          ...post,
          _id: post._id,
          updatedAt: now,
          views: post.views !== undefined ? post.views : posts[index].views,
          createdAt: post.createdAt || posts[index].createdAt,
        };
        posts[index] = updated;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        return updated;
      }
    }

    const newPost: BlogPost = {
      ...post,
      _id:
        "post_" +
        Date.now() +
        "_" +
        Math.random().toString(36).substring(2, 7),
      views: post.views || 0,
      createdAt: now,
      updatedAt: now,
    };
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  },

  deletePost: (id: string): boolean => {
    const posts = blogStorage.getPosts();
    const filtered = posts.filter((p) => p._id !== id);
    if (filtered.length !== posts.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  },

  incrementViews: (slugOrId: string): void => {
    try {
      const posts = blogStorage.getPosts();
      const index = posts.findIndex(
        (p) => p._id === slugOrId || p.slug === slugOrId
      );
      if (index !== -1) {
        posts[index].views = (posts[index].views || 0) + 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      }
    } catch (e) {
      console.warn("Could not increment post views", e);
    }
  },

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
