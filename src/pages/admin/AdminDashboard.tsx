// src/pages/admin/AdminDashboard.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Eye,
  LogOut,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Code,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Search,
  Lock,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Columns,
  Layers,
  HelpCircle,
  Inbox,
  Mail,
  Table,
  Send,
  Copy,
  Check,
  Database,
  BarChart3,
  CheckCircle,
  Clock,
  Settings,
  PenTool,
  Sparkles,
} from "lucide-react";
import { adminAuth } from "@/lib/adminAuth";
import { blogStorage, BlogPost } from "@/lib/blogStorage";
import { contactService, ContactInquiry } from "@/lib/contactService";
import AdminLogin from "./AdminLogin";
import QuizBuilderModal from "./QuizBuilderModal";
import ImageUploadModal from "./ImageUploadModal";
import BlogContentRenderer from "@/components/blog/BlogContentRenderer";
import { toast } from "sonner";

type TabKey = "posts" | "editor" | "leads" | "settings";
type EditorViewMode = "split" | "editor" | "preview";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>("posts");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [leads, setLeads] = useState<ContactInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Post Editor State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("Nikhil Mittal");
  const [category, setCategory] = useState("Engineering");
  const [readTime, setReadTime] = useState("5 min read");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);

  const [editorView, setEditorView] = useState<EditorViewMode>("split");
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Settings & Sheet Webhook State
  const [sheetWebhookUrl, setSheetWebhookUrl] = useState("");
  const [isTestingSheet, setIsTestingSheet] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [newAdminId, setNewAdminId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileImportRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isAuth = adminAuth.isAuthenticated();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadPosts();
      loadLeads();
      setSheetWebhookUrl(contactService.getSheetWebhookUrl());
    }
  }, []);

  const loadPosts = () => {
    const data = blogStorage.getPosts();
    setPosts(data);
  };

  const loadLeads = () => {
    const leadData = contactService.getLeads();
    setLeads(leadData);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingPostId) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    const words = newContent.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    setReadTime(`${minutes} min read`);
  };

  const insertTextAtCursor = (textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setContent((prev) => prev + textToInsert);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    const updated =
      currentVal.substring(0, start) + textToInsert + currentVal.substring(end);
    setContent(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + textToInsert.length,
        start + textToInsert.length
      );
    }, 50);
  };

  const wrapSelectedText = (
    before: string,
    after: string = "",
    placeholder: string = ""
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;
    const selected = currentVal.substring(start, end) || placeholder;

    const replacement = `${before}${selected}${after}`;
    const updated =
      currentVal.substring(0, start) + replacement + currentVal.substring(end);
    setContent(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 50);
  };

  const handleStartNewPost = () => {
    setEditingPostId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setAuthor("Nikhil Mittal");
    setCategory("Engineering");
    setReadTime("4 min read");
    setCoverImage("");
    setContent(
      `Write your article dispatch here...\n\n![Figure 1|wide](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80 "Figure 1: Architecture Pipeline")\n\n## Core Principles\n\nDetail the architecture, system design, or engineering strategies with code snippets, quotes, and interactive quizzes in between.`
    );
    setPublished(true);
    setActiveTab("editor");
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPostId(post._id);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || "");
    setAuthor(post.author || "Nikhil Mittal");
    setCategory(post.category || "Engineering");
    setReadTime(post.readTime || "5 min read");
    setCoverImage(post.coverImage || "");
    setContent(post.content || "");
    setPublished(post.published);
    setActiveTab("editor");
  };

  const handleSavePost = (publishStatus: boolean = published) => {
    if (!title.trim()) {
      toast.error("Please enter an article title.");
      return;
    }

    const finalSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const finalExcerpt =
      excerpt.trim() ||
      content
        .replace(/:::quiz[\s\S]*?:::/g, "")
        .replace(/[#*`_![\]()>-]/g, "")
        .trim()
        .substring(0, 140) + "...";

    const saved = blogStorage.savePost({
      _id: editingPostId || undefined,
      title: title.trim(),
      slug: finalSlug,
      excerpt: finalExcerpt,
      author: author.trim() || "Vincie Studios",
      category: category.trim() || "Engineering",
      readTime: readTime || "4 min read",
      coverImage: coverImage.trim() || undefined,
      content: content,
      published: publishStatus,
    });

    setEditingPostId(saved._id);
    setPublished(publishStatus);
    loadPosts();

    toast.success(
      publishStatus
        ? "Article published successfully."
        : "Draft saved successfully."
    );
  };

  const handleDeletePost = (id: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      blogStorage.deletePost(id);
      loadPosts();
      if (editingPostId === id) {
        handleStartNewPost();
        setActiveTab("posts");
      }
      toast.success("Post removed.");
    }
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm("Remove this client inquiry?")) {
      contactService.deleteLead(id);
      loadLeads();
      toast.success("Lead removed.");
    }
  };

  const handleClearAllLeads = () => {
    if (window.confirm("Clear all lead records from local inbox?")) {
      contactService.clearAllLeads();
      loadLeads();
      toast.info("Leads inbox cleared.");
    }
  };

  const handleSaveSheetWebhook = () => {
    if (!sheetWebhookUrl.trim()) {
      toast.error("Please enter a valid Google Apps Script Webhook URL.");
      return;
    }
    contactService.setSheetWebhookUrl(sheetWebhookUrl.trim());
    toast.success("Google Sheet Webhook URL saved!");
  };

  const handleSendTestLead = async () => {
    setIsTestingSheet(true);
    try {
      await contactService.submitInquiry({
        name: "Test Client",
        email: "test.lead@vincie.com",
        service: "Enterprise Architecture",
        budget: "$25,000+",
        message: "This is a test lead sent from the Admin Console to verify Excel / Google Drive Sheet synchronization.",
        source: "admin-test",
      });
      loadLeads();
      toast.success("Test lead sent! Check your Google Sheet now.");
    } catch {
      toast.error("Failed to send test lead. Check webhook URL.");
    } finally {
      setIsTestingSheet(false);
    }
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminId.trim() || !newPassword.trim()) {
      toast.error("Both Identifier and Password are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const updated = adminAuth.updateCredentials({
      adminId: newAdminId.trim(),
      password: newPassword.trim(),
    });

    if (updated) {
      toast.success("Security credentials updated.");
      setNewAdminId("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error("Failed to update credentials.");
    }
  };

  const handleExportData = () => {
    const dataStr = blogStorage.exportData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vincie_blog_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Articles backup downloaded.");
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const success = blogStorage.importData(content);
      if (success) {
        loadPosts();
        toast.success("Articles successfully restored.");
      } else {
        toast.error("Invalid JSON format.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        "Reset all articles to default samples? Custom posts will be replaced."
      )
    ) {
      blogStorage.resetToDefaults();
      loadPosts();
      handleStartNewPost();
      toast.info("Articles reset to default samples.");
    }
  };

  const handleLogout = () => {
    adminAuth.logout();
    setIsAuthenticated(false);
    toast.info("Signed out of Admin Console.");
  };

  const copyGoogleScript = () => {
    const scriptCode = `// Your exact Google Sheet ID
var SPREADSHEET_ID = "1OzMvPZJcFy5k3UvZ4ADaYZv2h-wAX9OGIZxHxB3vU8g";

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getActiveSheet() || spreadsheet.getSheets()[0];
    var data = {};
    
    // Support JSON, FormData, and URL parameters
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    var name = data.name || (e && e.parameter && e.parameter.name) || '';
    var email = data.email || (e && e.parameter && e.parameter.email) || '';
    var service = data.service || (e && e.parameter && e.parameter.service) || '';
    var budget = data.budget || (e && e.parameter && e.parameter.budget) || '';
    var message = data.message || (e && e.parameter && e.parameter.message) || '';
    var source = data.source || (e && e.parameter && e.parameter.source) || 'Website';
    
    sheet.appendRow([timestamp, name, email, service, budget, message, source]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(scriptCode);
      setCopiedScript(true);
      toast.success("Apps Script code copied to clipboard!");
      setTimeout(() => setCopiedScript(false), 2500);
    }
  };

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          loadPosts();
          loadLeads();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans selection:bg-white/20">
      <QuizBuilderModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onInsert={(quizMarkdown) => insertTextAtCursor(quizMarkdown)}
      />

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsert={(imageMarkdown) => insertTextAtCursor(imageMarkdown)}
      />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 border-b border-[#27272A] bg-[#09090B]/90 backdrop-blur-md px-4 sm:px-8 py-2.5">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/vinciestudio.png"
              alt="Vincie Studios"
              className="h-7 w-auto object-contain"
            />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white tracking-tight hidden sm:inline-block">
                Vincie Studios
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#18181B] border border-[#27272A] text-[#A1A1AA]">
                Dashboard
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "posts"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Articles</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === "posts" ? "bg-black/10 text-black font-bold" : "bg-[#27272A] text-[#A1A1AA]"
              }`}>
                {posts.length}
              </span>
            </button>

            <button
              onClick={() => {
                if (!editingPostId && !title) {
                  handleStartNewPost();
                }
                setActiveTab("editor");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "editor"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{editingPostId ? "Editor" : "Composer"}</span>
            </button>

            <button
              onClick={() => {
                loadLeads();
                setActiveTab("leads");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "leads"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Leads</span>
              {leads.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === "leads" ? "bg-black/10 text-black font-bold" : "bg-[#27272A] text-[#A1A1AA]"
                }`}>
                  {leads.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === "settings"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            <div className="h-4 w-px bg-[#27272A] mx-1 hidden sm:block" />

            <Link
              to="/blog"
              target="_blank"
              className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
              title="Open Live Blog"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-rose-400 hover:bg-rose-500/10 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
        {/* TAB 1: ALL POSTS */}
        {activeTab === "posts" && (
          <div className="space-y-6">
            {/* Metric Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-xl border border-[#27272A] bg-[#121214]">
                <div className="flex items-center justify-between text-[#A1A1AA] mb-2">
                  <span className="text-xs font-medium">Total Articles</span>
                  <FileText className="w-4 h-4 text-[#71717A]" />
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {posts.length}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-[#27272A] bg-[#121214]">
                <div className="flex items-center justify-between text-[#A1A1AA] mb-2">
                  <span className="text-xs font-medium">Published</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-emerald-400 tracking-tight">
                  {publishedCount}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-[#27272A] bg-[#121214]">
                <div className="flex items-center justify-between text-[#A1A1AA] mb-2">
                  <span className="text-xs font-medium">Drafts</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-amber-400 tracking-tight">
                  {draftCount}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-[#27272A] bg-[#121214]">
                <div className="flex items-center justify-between text-[#A1A1AA] mb-2">
                  <span className="text-xs font-medium">Total Reads</span>
                  <BarChart3 className="w-4 h-4 text-[#71717A]" />
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {totalViews.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full rounded-lg bg-[#18181B] border border-[#27272A] pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-[#A1A1AA] focus:border-white/40 focus:outline-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleStartNewPost}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white text-black font-medium text-xs sm:text-sm hover:bg-[#E4E4E7] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" /> New Article
              </button>
            </div>

            {/* Articles Table / List */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#27272A] rounded-xl bg-[#121214]/50">
                <FileText className="w-8 h-8 mx-auto text-[#71717A] mb-2" />
                <p className="text-sm font-medium text-[#A1A1AA]">No articles found.</p>
                <p className="text-xs text-[#71717A] mt-0.5">Create your first article dispatch to get started.</p>
              </div>
            ) : (
              <div className="rounded-xl border border-[#27272A] bg-[#121214] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#27272A] bg-[#18181B]/50 text-[#A1A1AA] font-medium">
                        <th className="py-3 px-4 sm:px-6">Title & Summary</th>
                        <th className="py-3 px-4 hidden sm:table-cell">Category</th>
                        <th className="py-3 px-4 hidden md:table-cell">Status</th>
                        <th className="py-3 px-4 hidden lg:table-cell">Reads</th>
                        <th className="py-3 px-4 hidden md:table-cell">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272A]">
                      {filteredPosts.map((post) => (
                        <tr
                          key={post._id}
                          className="hover:bg-[#18181B]/40 transition group"
                        >
                          <td className="py-3.5 px-4 sm:px-6 max-w-xs sm:max-w-md">
                            <div className="font-semibold text-sm text-white group-hover:text-white line-clamp-1">
                              {post.title}
                            </div>
                            <div className="text-xs text-[#71717A] line-clamp-1 mt-0.5">
                              {post.excerpt}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 hidden sm:table-cell">
                            <span className="px-2 py-0.5 rounded-md bg-[#18181B] border border-[#27272A] text-[#A1A1AA] text-[11px] font-medium">
                              {post.category}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 hidden md:table-cell">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                                post.published
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-emerald-400" : "bg-amber-400"}`} />
                              {post.published ? "Published" : "Draft"}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 hidden lg:table-cell text-[#A1A1AA]">
                            {post.views}
                          </td>

                          <td className="py-3.5 px-4 hidden md:table-cell text-[#71717A]">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Link
                                to={`/blog/${post.slug}`}
                                target="_blank"
                                className="p-1.5 rounded-md text-[#71717A] hover:text-white hover:bg-[#18181B] transition"
                                title="View Live"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleEditPost(post)}
                                className="p-1.5 rounded-md text-[#71717A] hover:text-white hover:bg-[#18181B] transition"
                                title="Edit"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post._id, post.title)}
                                className="p-1.5 rounded-md text-[#71717A] hover:text-rose-400 hover:bg-rose-500/10 transition"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: POST COMPOSER / EDITOR */}
        {activeTab === "editor" && (
          <div className="space-y-5">
            {/* Top Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272A]">
              <div>
                <h2 className="text-base font-semibold text-white">
                  {editingPostId ? "Edit Article Dispatch" : "Compose Article Dispatch"}
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Write in Markdown with custom headings, in-between visuals, and interactive quizzes
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-[#18181B] p-0.5 rounded-lg border border-[#27272A] flex items-center">
                  <button
                    onClick={() => setEditorView("editor")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                      editorView === "editor"
                        ? "bg-[#27272A] text-white"
                        : "text-[#71717A] hover:text-white"
                    }`}
                  >
                    <Layers className="w-3 h-3" /> Code
                  </button>
                  <button
                    onClick={() => setEditorView("split")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                      editorView === "split"
                        ? "bg-[#27272A] text-white"
                        : "text-[#71717A] hover:text-white"
                    }`}
                  >
                    <Columns className="w-3 h-3" /> Split
                  </button>
                  <button
                    onClick={() => setEditorView("preview")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                      editorView === "preview"
                        ? "bg-[#27272A] text-white"
                        : "text-[#71717A] hover:text-white"
                    }`}
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </button>
                </div>

                <button
                  onClick={() => handleSavePost(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#27272A] bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-medium transition flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save Draft
                </button>

                <button
                  onClick={() => handleSavePost(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-white text-black font-medium text-xs hover:bg-[#E4E4E7] transition flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Publish
                </button>
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 p-4 sm:p-5 rounded-xl bg-[#121214] border border-[#27272A]">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                  Article Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Distributed State & Edge Runtimes at Scale"
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-slug"
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white/90 placeholder-[#71717A] focus:border-white/40 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                  Author Byline
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author Name"
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Engineering, Design, Architecture"
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                  Read Time Estimate
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                  Card Thumbnail Image URL (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
                  />
                  {coverImage && (
                    <button
                      type="button"
                      onClick={() => setCoverImage("")}
                      className="px-2.5 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-xs text-[#A1A1AA] hover:text-white transition"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="p-1.5 rounded-xl bg-[#121214] border border-[#27272A] flex flex-wrap items-center gap-1 sticky top-14 z-30 shadow-md">
              <div className="flex items-center gap-0.5 pr-1.5 border-r border-[#27272A]">
                <button
                  type="button"
                  onClick={() => wrapSelectedText("# ", "", "Main Headline")}
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="H1 Heading"
                >
                  <Heading1 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => wrapSelectedText("## ", "", "Section Heading")}
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="H2 Heading"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => wrapSelectedText("### ", "", "Sub Heading")}
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="H3 Heading"
                >
                  <Heading3 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-0.5 pr-1.5 border-r border-[#27272A]">
                <button
                  type="button"
                  onClick={() => wrapSelectedText("**", "**", "bold text")}
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => wrapSelectedText("*", "*", "italic text")}
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => wrapSelectedText("> ", "", "Editorial pullquote")}
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="Quote"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    wrapSelectedText("```typescript\n", "\n```", "// Code snippet")
                  }
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="Code Block"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-0.5 pr-1.5 border-r border-[#27272A]">
                <button
                  type="button"
                  onClick={() => insertTextAtCursor("\n- First point\n- Second point\n")}
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor("\n1. Step one\n2. Step two\n")}
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="Numbered List"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    wrapSelectedText("[", "](https://example.com)", "link title")
                  }
                  className="p-1.5 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition"
                  title="Link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* In-Between Media & In-Between Quiz Embed Buttons */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(true)}
                  className="px-2.5 py-1 rounded-md bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white text-xs font-medium flex items-center gap-1.5 border border-[#27272A] transition"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-white" />
                  <span>Insert Media</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsQuizModalOpen(true)}
                  className="px-2.5 py-1 rounded-md bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white text-xs font-medium flex items-center gap-1.5 border border-[#27272A] transition"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-white" />
                  <span>Insert Quiz</span>
                </button>
              </div>
            </div>

            {/* Split Screen Editor View */}
            <div
              className={`grid gap-4 ${
                editorView === "split"
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {(editorView === "split" || editorView === "editor") && (
                <div className="flex flex-col rounded-xl border border-[#27272A] bg-[#121214] overflow-hidden min-h-[500px]">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#18181B]/50 border-b border-[#27272A] text-xs text-[#71717A]">
                    <span className="font-medium text-[#A1A1AA]">Markdown Source</span>
                    <span>{content.length} characters</span>
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Write article in Markdown. Use toolbar above to insert headers, in-between visuals, and in-between quizzes!"
                    className="flex-1 w-full bg-transparent p-4 font-mono text-xs sm:text-sm leading-relaxed text-[#E4E4E7] placeholder-[#71717A] focus:outline-none resize-none min-h-[500px]"
                  />
                </div>
              )}

              {(editorView === "split" || editorView === "preview") && (
                <div className="flex flex-col rounded-xl border border-[#27272A] bg-[#121214] overflow-hidden min-h-[500px]">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#18181B]/50 border-b border-[#27272A] text-xs text-[#71717A]">
                    <span className="font-medium text-[#A1A1AA]">Live Reader Output</span>
                    <span>Interactive View</span>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto max-h-[750px] bg-[#09090B]">
                    <div className="border-t border-b border-white/[0.18] py-2 mb-6 flex items-center justify-between text-[11px] font-mono tracking-wider text-[#94A3B8] uppercase">
                      <span>The Vincie Journal</span>
                      <span>•</span>
                      <span>{category || "Engineering"}</span>
                      <span>•</span>
                      <span>{readTime}</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-bold font-sans text-[#F8FAFC] mb-4 leading-tight">
                      {title || "Untitled Dispatch"}
                    </h1>

                    <div className="border-t border-b border-white/[0.08] py-2 mb-8 text-xs font-mono text-[#94A3B8] uppercase">
                      By {author || "Vincie Studios Editorial"}
                    </div>

                    <BlogContentRenderer content={content} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LEADS INBOX & DRIVE SHEET CRM */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Header & Export Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-[#121214] border border-[#27272A]">
              <div>
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-white" />
                  Client Inquiries & Drive Sheet Leads
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Form submissions automatically stream into your Google Sheet / Excel in Drive and are backed up locally.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => contactService.exportToCsv()}
                  disabled={leads.length === 0}
                  className="px-3.5 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-[#E4E4E7] transition flex items-center gap-1.5 disabled:opacity-40 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>

                {leads.length > 0 && (
                  <button
                    onClick={handleClearAllLeads}
                    className="px-3 py-2 rounded-lg bg-[#18181B] hover:bg-rose-500/10 text-rose-300 text-xs border border-[#27272A] transition"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Google Drive / Excel Sheet Webhook Box */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#121214] border border-[#27272A] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272A]">
                <div className="flex items-center gap-2.5">
                  <Table className="w-4 h-4 text-white" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Google Drive / Excel Sheet Live Webhook
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">
                      Webhook endpoint streaming contact leads into your Google Sheet
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSendTestLead}
                  disabled={isTestingSheet}
                  className="px-3 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs font-medium text-white transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  {isTestingSheet ? "Sending..." : "Send Test Lead"}
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  Active Webhook URL
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={sheetWebhookUrl}
                    onChange={(e) => setSheetWebhookUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition font-mono"
                  />
                  <button
                    onClick={handleSaveSheetWebhook}
                    className="px-4 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-[#E4E4E7] transition"
                  >
                    Save Webhook
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-lg bg-[#18181B]/50 border border-[#27272A] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#A1A1AA]" />
                    Google Sheet Drive Setup Guide (1-Minute)
                  </span>
                  <button
                    onClick={copyGoogleScript}
                    className="px-2.5 py-1 rounded-md bg-[#27272A] hover:bg-[#3F3F46] text-xs font-medium text-white transition flex items-center gap-1.5"
                  >
                    {copiedScript ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied Script
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Apps Script
                      </>
                    )}
                  </button>
                </div>

                <ol className="text-xs text-[#A1A1AA] space-y-1.5 font-light leading-relaxed list-decimal list-inside">
                  <li>
                    Open your <strong>Google Sheet</strong> in Google Drive.
                  </li>
                  <li>
                    Click <strong>Extensions &gt; Apps Script</strong>.
                  </li>
                  <li>
                    Paste the copied Apps Script code into <code>Code.gs</code> and click Save.
                  </li>
                  <li>
                    Click <strong>Deploy &gt; New deployment</strong> (Type: <em>Web App</em>, Access: <em>Anyone</em>).
                  </li>
                  <li>
                    Copy the Web App URL and paste it into the Webhook box above.
                  </li>
                </ol>
              </div>
            </div>

            {/* Leads Table */}
            {leads.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[#27272A] rounded-xl bg-[#121214]/50">
                <Mail className="w-8 h-8 mx-auto text-[#71717A] mb-2" />
                <p className="text-sm font-medium text-[#A1A1AA]">No client inquiries received yet.</p>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Submissions from the website contact forms will appear here and stream to your Google Sheet.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-[#27272A] bg-[#121214] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#27272A] bg-[#18181B]/50 text-[#A1A1AA] font-medium">
                        <th className="py-3 px-4 sm:px-6">Client Name & Email</th>
                        <th className="py-3 px-4 hidden sm:table-cell">Service</th>
                        <th className="py-3 px-4 hidden md:table-cell">Budget</th>
                        <th className="py-3 px-4">Message</th>
                        <th className="py-3 px-4 hidden lg:table-cell">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272A]">
                      {leads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-[#18181B]/40 transition group"
                        >
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="font-semibold text-sm text-white">
                              {lead.name}
                            </div>
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-xs text-[#A1A1AA] hover:text-white transition flex items-center gap-1 mt-0.5"
                            >
                              {lead.email}
                            </a>
                          </td>

                          <td className="py-3.5 px-4 hidden sm:table-cell">
                            <span className="px-2 py-0.5 rounded-md bg-[#18181B] border border-[#27272A] text-[#A1A1AA] text-[11px] font-medium">
                              {lead.service || "General"}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 hidden md:table-cell">
                            {lead.budget ? (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-medium">
                                {lead.budget}
                              </span>
                            ) : (
                              <span className="text-[#71717A]">—</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <p className="text-xs text-[#D4D4D8] line-clamp-2 leading-relaxed font-light">
                              {lead.message}
                            </p>
                          </td>

                          <td className="py-3.5 px-4 hidden lg:table-cell text-[#71717A]">
                            {new Date(lead.timestamp).toLocaleDateString()}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-md text-[#71717A] hover:text-rose-400 hover:bg-rose-500/10 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS & BACKUPS */}
        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="rounded-xl border border-[#27272A] bg-[#121214] p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-white">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Admin Security Credentials
                  </h2>
                  <p className="text-xs text-[#A1A1AA]">
                    Update the ID and password required to access this dashboard
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdateCredentials} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    New Admin ID
                  </label>
                  <input
                    type="text"
                    value={newAdminId}
                    onChange={(e) => setNewAdminId(e.target.value)}
                    placeholder="Enter identifier"
                    className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-1 px-4 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-[#E4E4E7] transition shadow-sm"
                >
                  Save Credentials
                </button>
              </form>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#121214] p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-white">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Data Backups & Migration
                  </h2>
                  <p className="text-xs text-[#A1A1AA]">
                    Export all articles into JSON or restore from an existing backup
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleExportData}
                  className="p-4 rounded-xl border border-[#27272A] bg-[#18181B]/60 hover:bg-[#18181B] text-left transition flex items-start gap-3 group"
                >
                  <Download className="w-4 h-4 text-[#A1A1AA] mt-0.5 group-hover:text-white transition" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      Export Articles (JSON)
                    </h4>
                    <p className="text-[11px] text-[#71717A] mt-0.5">
                      Download all {posts.length} articles into a backup file.
                    </p>
                  </div>
                </button>

                <input
                  type="file"
                  ref={fileImportRef}
                  onChange={handleImportData}
                  accept=".json"
                  className="hidden"
                />
                <button
                  onClick={() => fileImportRef.current?.click()}
                  className="p-4 rounded-xl border border-[#27272A] bg-[#18181B]/60 hover:bg-[#18181B] text-left transition flex items-start gap-3 group"
                >
                  <Upload className="w-4 h-4 text-[#A1A1AA] mt-0.5 group-hover:text-white transition" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      Import Articles (JSON)
                    </h4>
                    <p className="text-[11px] text-[#71717A] mt-0.5">
                      Restore articles from a JSON file.
                    </p>
                  </div>
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-[#27272A] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-medium text-[#A1A1AA]">
                    Reset Starter Articles
                  </h4>
                  <p className="text-[11px] text-[#71717A]">
                    Restore default sample articles with quizzes and media
                  </p>
                </div>
                <button
                  onClick={handleResetDefaults}
                  className="px-3 py-1.5 rounded-lg bg-[#18181B] hover:bg-rose-500/10 text-rose-300 text-xs border border-[#27272A] transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
