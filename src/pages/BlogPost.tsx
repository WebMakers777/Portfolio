import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import DOMPurify from "dompurify";

interface BlogPostDetail {
  _id: string;
  slug: string;
  title: string;
  sanitizedHtml: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
  views: number;
  images?: string[];
  published: boolean;
  html?: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/posts/slug/${slug}`
      );
      if (!response.ok) throw new Error("Post not found");
      const data = await response.json();
      let payload: any = null;
      if (data == null) {
        throw new Error("Empty response from server");
      }
      if (data.post) payload = data.post;
      else if (data.data && data.data.post) payload = data.data.post;
      else if (data.posts && Array.isArray(data.posts) && data.posts.length === 1) payload = data.posts[0];
      else if (data.posts && Array.isArray(data.posts) && data.posts.length > 1) payload = data.posts[0];
      else payload = data;

      if (!payload || typeof payload !== "object") {
        throw new Error("Post data not found in response");
      }

      const rawHtml = payload.sanitizedHtml || payload.html || "";
      if (!payload.sanitizedHtml && rawHtml) {
        payload.sanitizedHtml = DOMPurify.sanitize(rawHtml);
      }

      setPost(payload as BlogPostDetail);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load post");
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  const sanitizedHTML = post ? post.sanitizedHtml || post.html || "" : "";

  const getDisplayDate = (p?: BlogPostDetail | null) => {
    if (!p) return "Unknown Date";
    const dateStr = p.publishedAt || p.createdAt || p.updatedAt || "";
    const parsed = Date.parse(dateStr);
    if (isNaN(parsed)) return "Unknown Date";
    return new Date(parsed).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0B1120] text-white overflow-hidden pt-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.075] grid-noise" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-[42rem] w-[42rem] rounded-full blur-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-white/70 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-cyan-400 border-t-transparent rounded-full" />
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <Link to="/blog" className="text-cyan-400 hover:text-cyan-300">
              Return to Blog
            </Link>
          </div>
        )}

        {post && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <header className="mb-12">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {post.title}
              </motion.h1>

              {/* Meta */}
              <motion.div
                className="flex flex-wrap items-center gap-6 text-white/60 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(
                    post.publishedAt || post.createdAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  👁️ {post.views} views
                </div>
              </motion.div>

              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{ originX: 0 }}
              />
            </header>

            {/* Content */}
            <motion.div
              className="prose prose-invert max-w-none mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-white/80 leading-relaxed space-y-6">
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                  className="prose-style"
                />
              </div>
            </motion.div>

            {/* Share */}
            <motion.div
              className="flex items-center gap-4 py-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-white/60">Share this post:</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }}
                className="p-2 rounded-lg border border-white/10 hover:bg-white/[0.05] transition"
                title="Copy link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.article>
        )}
      </div>

      {/* CSS for prose styling */}
      <style>{`
        .prose-style p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .prose-style h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose-style h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose-style ul,
        .prose-style ol {
          margin-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .prose-style li {
          margin-bottom: 0.5rem;
        }
        .prose-style strong {
          font-weight: 600;
          color: #06b6d4;
        }
        .prose-style em {
          font-style: italic;
          color: #e879f9;
        }
        .prose-style a {
          color: #06b6d4;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .prose-style a:hover {
          color: #22d3ee;
        }
        .prose-style blockquote {
          border-left: 4px solid #06b6d4;
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: #a1a1aa;
          font-style: italic;
        }
        .prose-style code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #86e1a0;
        }
        .prose-style pre {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1.25rem;
        }
        .prose-style img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
      `}</style>
    </main>
  );
}
