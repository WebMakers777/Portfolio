// src/pages/admin/AdminLogin.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { adminAuth } from "@/lib/adminAuth";
import { toast } from "sonner";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!adminId.trim() || !password.trim()) {
      setError("Please enter both Admin ID and Password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const success = adminAuth.login(adminId, password);
      setLoading(false);

      if (success) {
        toast.success("Welcome back to Vincie Admin");
        onLoginSuccess();
      } else {
        setError("Invalid identifier or password.");
        toast.error("Authentication failed");
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#09090B] text-[#FAFAFA] flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-white/20">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-[#27272A] bg-[#121214] p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img
                src="/vinciestudio.png"
                alt="Vincie Studios"
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Vincie Studios Admin
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Sign in to manage articles, dispatches, and client leads
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                Admin Identifier
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="vinciestudios@gmail.com"
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:bg-[#1E1E22] focus:outline-none transition"
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] pl-10 pr-10 py-2.5 text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:bg-[#1E1E22] focus:outline-none transition"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-white text-black font-medium text-sm hover:bg-[#E4E4E7] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
