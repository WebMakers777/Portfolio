import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Book My CA",
    category: "Website Development",
    description:
      "BookMyCA is a financial services platform that provides end-to-end solutions including tax filing, GST, accounting, company registration, compliance, audits, and advisory. The website is designed to offer a seamless user experience, secure transactions, and easy integration of multiple financial service modules for individuals, startups, and enterprises.",

    image: "/bookmyca (1).png",
    tags: ["Next js", "Razorpay", "MongoDB"],

    demoUrl: "https://www.bookmyca.in",
  },
  {
    id: 2,
    title: "ACTTS CRM",
    category: "Software Development",
    description:
            "ACTTS CRM is a customer relationship management (CRM) system designed to help businesses manage their customer interactions and data effectively. The system provides features such as contact management, lead tracking, and sales tracking to help businesses improve their customer relationships and sales processes.",
    image: "/actts-crm-1.png",
    tags: ["React", "TypeScript", "Tailwind", "Databases"],
    // demoUrl: "https://www.hackcrux.tech",
  },
{
  id: 4, 
  title: "Enterprise Resource Planning (ERP) Portal", 
  category: "Software Development",
  description: "A comprehensive, full-stack enterprise management system designed to streamline project tracking, financial calculations, and invoicing. Features interactive data grids, secure role-based employee management, and robust reporting.",
  image: "/erp.png", 
  tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  demoUrl: "#", // Client link removed for confidentiality
},

  {
    id: 5,
    title: "Hansha Pharmaceuticals",
    category: "Pharma Company",
    description:
      "Leading pharmaceutical company focused on manufacturing and supplying high-quality medicines and healthcare products.",
    image: "/hansha-1.png",
    tags: ["Next.js", "React", "Tailwind"],
    demoUrl: "https://www.hanshapharmaceuticals.in",
  },

  // {
  //   id: 6,
  //   title: 'Learning Platform',
  //   category: 'Software Development',
  //   description: 'Interactive learning platform with video courses and progress tracking.',
  //   image: '/projects/learning.png',
  //   tags: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
  //   demoUrl: '#',
  // },
];

const categories = [
  "All",
  "Software Development",
  "UI/UX Design",
  "Mobile Development",
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const navigate = useNavigate();
  const location = useLocation();

  const goContact = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "contact" } });
      return;
    }
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="work" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Take a look at some of our recent projects. Each one represents our
            commitment to quality, innovation, and client satisfaction.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-splash
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.demoUrl !== "#" && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-hover transition-colors"
                      title="View Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="text-sm text-primary font-medium mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Impressed? Let&apos;s create something amazing together.
          </p>
          <button data-splash onClick={goContact} className="btn-hero">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
