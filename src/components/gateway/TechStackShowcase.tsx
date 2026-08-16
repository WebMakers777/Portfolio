import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

interface TechItem {
  name: string;
  color: string;
}

interface TechCategory {
  id: string;
  label: string;
  items: TechItem[];
}

const categories: TechCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#FFFFFF" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Framer Motion", color: "#FF0050" },
      { name: "Vue.js", color: "#4FC08D" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", color: "#68A063" },
      { name: "Express", color: "#EEEEEE" },
      { name: "Python", color: "#3776AB" },
      { name: "Django", color: "#44B78B" },
      { name: "FastAPI", color: "#009688" },
      { name: "GraphQL", color: "#E535AB" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: [
      { name: "Flutter", color: "#02569B" },
      { name: "React Native", color: "#61DAFB" },
      { name: "Swift", color: "#F05138" },
      { name: "Kotlin", color: "#7F52FF" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "Expo", color: "#EEEEEE" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", color: "#FF9900" },
      { name: "Google Cloud", color: "#4285F4" },
      { name: "Docker", color: "#2496ED" },
      { name: "Kubernetes", color: "#326CE5" },
      { name: "Terraform", color: "#7B42BC" },
      { name: "GitHub Actions", color: "#2088FF" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: [
      { name: "PostgreSQL", color: "#336791" },
      { name: "MongoDB", color: "#47A248" },
      { name: "Redis", color: "#DC382D" },
      { name: "Supabase", color: "#3ECF8E" },
      { name: "Prisma", color: "#5A67D8" },
      { name: "MySQL", color: "#4479A1" },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    items: [
      { name: "OpenAI", color: "#10A37F" },
      { name: "TensorFlow", color: "#FF6F00" },
      { name: "LangChain", color: "#CCCCCC" },
      { name: "Pandas", color: "#E70488" },
      { name: "Scikit-learn", color: "#F7931E" },
      { name: "Hugging Face", color: "#FFD21E" },
    ],
  },
];

export default function TechStackShowcase() {
  const [activeTab, setActiveTab] = useState("frontend");
  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <section className="relative z-10 py-32 px-6 md:px-12 bg-[#111111]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background orbs */}
      <div className="pointer-events-none absolute top-20 right-20 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(100,100,255,0.03)_0%,_transparent_70%)] rounded-full blur-[80px]" />
      <div className="pointer-events-none absolute bottom-20 left-20 w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(255,100,100,0.02)_0%,_transparent_70%)] rounded-full blur-[80px]" />

      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: easeOutQuint }}
          className="text-center mb-16"
        >
          <div className="text-[12px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/20" />
            Technology
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-[#999] bg-clip-text text-transparent">
            Our tech stack.
          </h2>
        </motion.div>

        {/* Tab Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOutQuint }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === cat.id
                  ? "text-black"
                  : "text-[#888] hover:text-white"
              }`}
            >
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-gradient-to-b from-white to-[#E5E5E5] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tech Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: easeOutQuint }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
          >
            {activeCategory.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: easeOutQuint,
                }}
                className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color}10 0%, transparent 70%)`,
                  }}
                />

                {/* Icon dot */}
                <div
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    color: item.color,
                  }}
                >
                  {item.name.charAt(0)}
                </div>

                <span className="relative text-xs font-semibold text-[#A3A3A3] group-hover:text-white transition-colors duration-300 text-center leading-tight">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
