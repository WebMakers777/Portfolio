// src/pages/BlogPost.tsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  User,
  Compass,
} from "lucide-react";
import { blogStorage, BlogPost as BlogPostType } from "@/lib/blogStorage";
import BlogContentRenderer from "@/components/blog/BlogContentRenderer";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";
import { toast } from "sonner";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

export default function BlogPost() {
  const { slug, postSlug } = useParams();
  const activeSlug = slug || postSlug || "";
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [recentPosts, setRecentPosts] = useState<BlogPostType[]>([]);

  // Top Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!activeSlug) return;
    setLoading(true);
    try {
      const found = blogStorage.getPostBySlug(activeSlug);
      if (found) {
        setPost(found);
        blogStorage.incrementViews(found._id);

        const all = blogStorage.getPublishedPosts();
        setRecentPosts(all.filter((p) => p._id !== found._id).slice(0, 3));
      } else {
        setPost(null);
      }
    } catch (err) {
      console.error("Failed to load article", err);
      setPost(null);
    } finally {
      setLoading(false);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [activeSlug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-white z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="relative flex-1 w-full bg-[#0A0A0A] text-white overflow-hidden pt-28 sm:pt-32 pb-20 sm:pb-24">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-white/[0.02] blur-[140px] rounded-full" />

        {/* Responsive Container: Fills wide monitors pleasantly, stacks cleanly on mobile */}
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10 lg:px-12">
          {/* Top Return & Share Bar */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-white/[0.08]">
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#94A3B8] hover:text-white transition group font-mono"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>All Dispatches</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-xs font-medium text-[#E2E8F0] transition font-mono"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-white/70" /> Share Dispatch
                </>
              )}
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-28">
              <div className="inline-block animate-spin">
                <div className="h-7 w-7 border-2 border-white/60 border-t-transparent rounded-full" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-[#94A3B8] font-mono">
                Opening Dispatch...
              </p>
            </div>
          )}

          {/* Error / Not Found */}
          {!loading && !post && (
            <div className="text-center py-20 rounded-3xl border border-white/[0.08] bg-[#0D0D0D] max-w-xl mx-auto">
              <BookOpen className="w-10 h-10 mx-auto text-white/30 mb-3" />
              <h2 className="text-lg font-bold text-white mb-2 font-serif">
                Article Not Found
              </h2>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                The requested article does not exist or has been relocated.
              </p>
              <Link
                to="/blog"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition font-mono"
              >
                Return to Articles
              </Link>
            </div>
          )}

          {/* Article View */}
          {!loading && post && (
            <motion.article
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutQuint }}
            >
              {/* Newspaper Masthead Banner */}
              <div className="border-t border-b border-white/[0.18] py-2 sm:py-2.5 mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] sm:tracking-[0.2em] text-[#94A3B8] uppercase">
                <span className="font-semibold text-white/90">
                  The Vincie Journal
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{post.category || "Engineering"}</span>
                <span className="hidden sm:inline">•</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {post.readTime && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/40" />
                      {post.readTime}
                    </span>
                  </>
                )}
              </div>

              {/* Main Headline */}
              <header className="mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold font-sans tracking-tight bg-gradient-to-r from-white via-[#FAFAFA] to-[#94A3B8] bg-clip-text text-transparent mb-5 sm:mb-6 leading-[1.14]">
                  {post.title}
                </h1>

                {/* Subtitle / Lead Deck */}
                {post.excerpt && (
                  <p className="text-base sm:text-lg md:text-xl font-sans text-[#CBD5E1] font-light leading-relaxed mb-6 sm:mb-8 border-l-2 border-white/30 pl-4 py-1">
                    {post.excerpt}
                  </p>
                )}

                {/* Byline Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4 border-t border-b border-white/[0.08] text-xs font-mono tracking-wider text-[#94A3B8] uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/60"></span>
                    <span>By {post.author || "Vincie Studios Editorial"}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-light">
                    <Calendar className="w-3.5 h-3.5 text-white/40" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </header>

              {/* 2-Column Desktop Grid to Balance Left/Right Screen Space */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Sticky Editorial Meta Sidebar (Visible on Desktop) */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6">
                  {/* Author Card */}
                  <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0D0D0D]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#181818] border border-white/[0.1] flex items-center justify-center font-bold text-white text-sm">
                        {post.author ? post.author.charAt(0) : "V"}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white font-sans">
                          {post.author || "Vincie Studios"}
                        </h4>
                        <span className="text-[10px] text-[#94A3B8] font-mono block">
                          Editorial Team
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Engineering insights, distributed architectures, and product strategies.
                    </p>
                  </div>

                  {/* Dispatch Meta */}
                  <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0D0D0D] space-y-3.5 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[#64748B] uppercase tracking-wider block mb-1">
                        Topic Area
                      </span>
                      <span className="text-white/90 font-medium">
                        {post.category || "Engineering"}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06]">
                      <span className="text-[10px] text-[#64748B] uppercase tracking-wider block mb-1">
                        Estimated Read
                      </span>
                      <span className="text-white/90 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white/40" />
                        {post.readTime || "5 min"}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06]">
                      <span className="text-[10px] text-[#64748B] uppercase tracking-wider block mb-1">
                        Format
                      </span>
                      <span className="text-white/90 font-medium">
                        Interactive Dispatch
                      </span>
                    </div>
                  </div>

                  {/* Share Action Button */}
                  <button
                    onClick={handleShare}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono font-semibold text-white transition flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share Dispatch
                  </button>
                </aside>

                {/* Main Article Content Column */}
                <div className="lg:col-span-9 w-full">
                  <div className="article-newspaper-content w-full mb-16">
                    <BlogContentRenderer content={post.content} />
                  </div>

                  {/* Editorial Sign-off Box */}
                  <div className="my-10 sm:my-14 p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-[#0D0D0D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#181818] border border-white/[0.1] flex items-center justify-center font-bold text-white text-base flex-shrink-0">
                        {post.author ? post.author.charAt(0) : "V"}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-sans text-white">
                          Dispatched by {post.author || "Vincie Studios Team"}
                        </h4>
                        <p className="text-xs text-[#94A3B8] font-light">
                          Published on Vincie Studios Knowledge Base & Case Dispatches
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleShare}
                      className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono font-semibold text-white transition flex items-center gap-1.5 flex-shrink-0"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share Article
                    </button>
                  </div>
                </div>
              </div>

              {/* Recommended Dispatches */}
              {recentPosts.length > 0 && (
                <div className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-white/[0.1]">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg sm:text-xl font-bold font-sans text-white">
                      Further Reading & Related Dispatches
                    </h3>
                    <Link
                      to="/blog"
                      className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] hover:text-white transition flex items-center gap-1"
                    >
                      View all <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {recentPosts.map((rec) => (
                      <Link
                        key={rec._id}
                        to={`/blog/${rec.slug}`}
                        className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0D0D0D] hover:bg-[#121212] hover:border-white/[0.2] transition-all flex flex-col justify-between group shadow-lg"
                      >
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#94A3B8]">
                            {rec.category}
                          </span>
                          <h4 className="text-sm font-semibold font-sans text-[#F8FAFC] mt-2 group-hover:text-white transition line-clamp-2 leading-snug">
                            {rec.title}
                          </h4>
                        </div>
                        <span className="text-xs text-[#64748B] font-mono mt-4 block">
                          {rec.readTime}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
