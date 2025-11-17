import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  views: number;
  published: boolean;
  sanitizedHtml: string;
  html?: string;
}

interface ApiResponse {
  success: boolean;
  total: number;
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const skip = (page - 1) * POSTS_PER_PAGE;
      const response = await fetch(
        `http://localhost:3001/api/posts/published?skip=${skip}&limit=${POSTS_PER_PAGE}`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      if (data.success) {
        setPosts(data.posts || []);
        setTotalPosts(data.total);
        setError(null);
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load posts";
      setError(message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const getExcerpt = (html: string, maxLength = 120) => {
    const plain = html.replace(/<[^>]*>/g, "").trim();
    return plain.length > maxLength
      ? plain.substring(0, maxLength) + "..."
      : plain;
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0B1120] text-white overflow-hidden pt-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.075] grid-noise" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-[42rem] w-[42rem] rounded-full blur-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            Engineering & Growth Insights
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Deep dives into product development, digital marketing, and scaling
            strategies.
          </p>
        </motion.header>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-cyan-400 border-t-transparent rounded-full" />
            </div>
            <p className="mt-4 text-white/60">Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <p className="text-red-400 mb-2">⚠️ Error loading posts:</p>
              <p className="text-white/60 text-sm mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                {error}
              </p>
              <p className="text-white/60 text-sm mb-6">
                The blog API endpoint ({`/api/posts`}) is not configured yet.
                Please set up your backend to return JSON data.
              </p>
              <button
                onClick={() => fetchPosts(currentPage)}
                className="px-4 py-2 bg-cyan-400 text-black rounded-lg font-medium hover:bg-cyan-300 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No posts found.</p>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <>
            {/* Posts Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="h-full rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition p-6 flex flex-col"
                  >
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-cyan-300 transition line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-white/60 text-sm mb-4 flex-grow line-clamp-3">
                      {getExcerpt(post.sanitizedHtml || post.html || "")}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/50 border-t border-white/10 pt-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        👁️ {post.views}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition ${
                          currentPage === page
                            ? "bg-cyan-400 text-black font-medium"
                            : "border border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
