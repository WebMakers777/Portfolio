// src/pages/blog.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Search,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { blogStorage, BlogPost } from "@/lib/blogStorage";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;
const POSTS_PER_PAGE = 7;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = () => {
    setLoading(true);
    try {
      const stored = blogStorage.getPublishedPosts();
      setPosts(stored);
    } catch (e) {
      console.error("Error loading articles", e);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
  ];

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost =
    filteredPosts.length > 0 &&
    currentPage === 1 &&
    !searchQuery &&
    selectedCategory === "All"
      ? filteredPosts[0]
      : null;

  const gridPosts = featuredPost
    ? filteredPosts.slice(1, POSTS_PER_PAGE)
    : filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
      );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-white/20 selection:text-white">
      <Navbar />

      <main className="relative flex-1 w-full bg-[#0A0A0A] text-white overflow-hidden pt-32 pb-24">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-white/[0.02] blur-[140px] rounded-full" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
          {/* Header */}
          <motion.header
            className="text-center mb-14 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutQuint }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#94A3B8] text-[11px] font-mono font-semibold uppercase tracking-[0.2em] mb-5">
              The Vincie Journal • Dispatches & Case Studies
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight bg-gradient-to-r from-white via-[#EEEEEE] to-[#999999] bg-clip-text text-transparent mb-5">
              Engineering, Architecture & Strategy
            </h1>
            <p className="text-base sm:text-lg text-[#94A3B8] font-light max-w-[55ch] mx-auto leading-relaxed">
              In-depth essays on distributed systems, enterprise product architecture, high-converting digital growth, and interactive technical breakdowns.
            </p>
          </motion.header>

          {/* Search & Category Filter Bar */}
          <div className="mb-14 flex flex-col md:flex-row items-center justify-between gap-4 p-2.5 rounded-2xl bg-[#0D0D0D] border border-white/[0.08]">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs uppercase font-mono tracking-wider transition-all ${
                    selectedCategory === cat
                      ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search articles & topics..."
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] pl-10 pr-4 py-2 text-xs md:text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-28">
              <div className="inline-block animate-spin">
                <div className="h-7 w-7 border-2 border-white/60 border-t-transparent rounded-full" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-[#94A3B8] font-mono">
                Loading Articles...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-20 rounded-3xl border border-white/[0.08] bg-[#0D0D0D]">
              <BookOpen className="w-10 h-10 mx-auto text-white/30 mb-3" />
              <h3 className="text-base font-bold text-white mb-1 font-sans">
                No matching articles
              </h3>
              <p className="text-xs text-[#94A3B8] font-light">
                {searchQuery
                  ? `No posts matched "${searchQuery}".`
                  : "No published posts yet."}
              </p>
            </div>
          )}

          {/* Featured Hero Post */}
          {!loading && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutQuint }}
              className="mb-14"
            >
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group block rounded-3xl border border-white/[0.08] bg-[#0D0D0D] hover:bg-[#111111] hover:border-white/[0.2] transition-all duration-300 p-6 sm:p-10 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                          Lead Editorial
                        </span>
                        <span className="text-xs text-[#94A3B8] font-mono uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-bold font-sans bg-gradient-to-r from-white via-white/95 to-[#999999] bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all mb-4 leading-tight">
                        {featuredPost.title}
                      </h2>

                      <p className="text-[#94A3B8] text-sm sm:text-base font-light leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-white/[0.06] text-xs text-[#64748B] font-mono">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-white/40" />
                          {new Date(featuredPost.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                        {featuredPost.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-white/40" />
                            {featuredPost.readTime}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-semibold text-white flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform uppercase tracking-wider">
                        Read Dispatch <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {featuredPost.coverImage && (
                    <div className="lg:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden bg-black/40 border border-white/[0.08]">
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid of Remaining Posts */}
          {!loading && gridPosts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {gridPosts.map((post) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: easeOutQuint }}
                    className="flex"
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="w-full rounded-3xl border border-white/[0.08] bg-[#0D0D0D] hover:bg-[#121212] hover:border-white/[0.2] transition-all duration-300 p-6 flex flex-col justify-between shadow-xl group hover:-translate-y-1"
                    >
                      <div>
                        {post.coverImage && (
                          <div className="w-full h-48 rounded-2xl overflow-hidden mb-5 bg-black/40 border border-white/[0.06] relative">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/[0.1] text-white text-[10px] font-mono font-semibold uppercase tracking-wider">
                              {post.category}
                            </div>
                          </div>
                        )}

                        {!post.coverImage && (
                          <div className="mb-4">
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80">
                              {post.category}
                            </span>
                          </div>
                        )}

                        <h2 className="text-xl font-bold font-sans mb-3 bg-gradient-to-r from-white via-[#F5F5F5] to-[#A1A1AA] bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all line-clamp-2 leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-[#94A3B8] text-xs sm:text-sm mb-6 line-clamp-3 leading-relaxed font-light">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#64748B] font-mono">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 font-light">
                            <Calendar className="w-3.5 h-3.5 text-white/40" />
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                          {post.readTime && (
                            <span className="flex items-center gap-1 font-light">
                              <Clock className="w-3.5 h-3.5 text-white/40" />
                              {post.readTime}
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-semibold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 font-mono">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-xs uppercase tracking-wider font-medium transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>

                  <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 rounded-xl text-xs font-semibold transition ${
                            currentPage === page
                              ? "bg-white text-black font-bold"
                              : "border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-[#94A3B8]"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-xs uppercase tracking-wider font-medium transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
