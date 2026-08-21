import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiFastapi,
  SiGraphql,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiFirebase,
  SiExpo,
  SiAmazonwebservices,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiPrisma,
  SiMysql,
  SiOpenai,
  SiTensorflow,
  SiLangchain,
  SiPandas,
  SiScikitlearn,
  SiHuggingface,
} from "react-icons/si";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

interface TechItem {
  name: string;
  role: string;
  color: string;
  icon: IconType;
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
      { name: "React", role: "UI Library", color: "#61DAFB", icon: SiReact },
      { name: "Next.js", role: "Framework", color: "#FFFFFF", icon: SiNextdotjs },
      { name: "TypeScript", role: "Type Safety", color: "#3178C6", icon: SiTypescript },
      { name: "Tailwind CSS", role: "Styling", color: "#06B6D4", icon: SiTailwindcss },
      { name: "Framer Motion", role: "Animations", color: "#FF0050", icon: SiFramer },
      { name: "Vue.js", role: "JS Framework", color: "#4FC08D", icon: SiVuedotjs },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", role: "Runtime", color: "#68A063", icon: SiNodedotjs },
      { name: "Express", role: "API Framework", color: "#EEEEEE", icon: SiExpress },
      { name: "Python", role: "Language", color: "#3776AB", icon: SiPython },
      { name: "Django", role: "Framework", color: "#44B78B", icon: SiDjango },
      { name: "FastAPI", role: "Async API", color: "#009688", icon: SiFastapi },
      { name: "GraphQL", role: "Query API", color: "#E535AB", icon: SiGraphql },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: [
      { name: "Flutter", role: "Cross-Platform", color: "#02569B", icon: SiFlutter },
      { name: "React Native", role: "Mobile UI", color: "#61DAFB", icon: SiReact },
      { name: "Swift", role: "iOS Native", color: "#F05138", icon: SiSwift },
      { name: "Kotlin", role: "Android Native", color: "#7F52FF", icon: SiKotlin },
      { name: "Firebase", role: "Backend Suite", color: "#FFCA28", icon: SiFirebase },
      { name: "Expo", role: "Mobile Tooling", color: "#EEEEEE", icon: SiExpo },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", role: "Cloud Infra", color: "#FF9900", icon: SiAmazonwebservices },
      { name: "Google Cloud", role: "Cloud Platform", color: "#4285F4", icon: SiGooglecloud },
      { name: "Docker", role: "Containers", color: "#2496ED", icon: SiDocker },
      { name: "Kubernetes", role: "Orchestration", color: "#326CE5", icon: SiKubernetes },
      { name: "Terraform", role: "Infra as Code", color: "#7B42BC", icon: SiTerraform },
      { name: "GitHub Actions", role: "CI/CD Pipeline", color: "#2088FF", icon: SiGithubactions },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: [
      { name: "PostgreSQL", role: "SQL Database", color: "#336791", icon: SiPostgresql },
      { name: "MongoDB", role: "NoSQL DB", color: "#47A248", icon: SiMongodb },
      { name: "Redis", role: "In-Memory Cache", color: "#DC382D", icon: SiRedis },
      { name: "Supabase", role: "Open BaaS", color: "#3ECF8E", icon: SiSupabase },
      { name: "Prisma", role: "ORM Layer", color: "#5A67D8", icon: SiPrisma },
      { name: "MySQL", role: "Relational DB", color: "#4479A1", icon: SiMysql },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    items: [
      { name: "OpenAI", role: "LLM & Models", color: "#10A37F", icon: SiOpenai },
      { name: "TensorFlow", role: "Machine Learning", color: "#FF6F00", icon: SiTensorflow },
      { name: "LangChain", role: "AI Agents", color: "#CCCCCC", icon: SiLangchain },
      { name: "Pandas", role: "Data Science", color: "#E70488", icon: SiPandas },
      { name: "Scikit-learn", role: "ML Toolkit", color: "#F7931E", icon: SiScikitlearn },
      { name: "Hugging Face", role: "Model Hub", color: "#FFD21E", icon: SiHuggingface },
    ],
  },
];

const allItems = categories.flatMap((c) => c.items);

export default function TechStackShowcase() {
  const [activeTab, setActiveTab] = useState("frontend");
  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <section className="relative z-10 py-32 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background radial glows matching site theme */}
      <div className="pointer-events-none absolute top-20 right-20 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_0%,_transparent_70%)] rounded-full blur-[80px]" />
      <div className="pointer-events-none absolute bottom-20 left-20 w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(255,255,255,0.02)_0%,_transparent_70%)] rounded-full blur-[80px]" />

      <div className="mx-auto max-w-[1280px]">
        {/* Header - Perfectly matching site theme */}
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

        {/* Tab Pills - Matching Vincie Studios pill design */}
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-20"
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
                className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color}15 0%, transparent 70%)`,
                  }}
                />

                {/* SVG Brand Icon Container */}
                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    color: item.color,
                  }}
                >
                  <item.icon className="w-6 h-6" />
                </div>

                <div className="flex flex-col items-center text-center gap-0.5 relative z-10">
                  <span className="text-xs md:text-sm font-semibold text-[#A3A3A3] group-hover:text-white transition-colors duration-300 leading-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-medium text-[#666666] group-hover:text-[#999999] transition-colors duration-300">
                    {item.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Ticker Footer matching TechMarquee theme */}
        <div className="pt-10 border-t border-white/[0.04] overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max gap-10 animate-marquee">
            {[...allItems, ...allItems].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 text-[#555555] hover:text-[#D4D4D4] transition-colors duration-300 group cursor-default py-1"
              >
                <div
                  className="w-5 h-5 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ color: item.color }}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
