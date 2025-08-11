import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Modern e-commerce solution with advanced filtering and payment integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    demoUrl: '#',
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Clean and intuitive dashboard for data analytics and user management.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind', 'Chart.js'],
    demoUrl: '#',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Secure and user-friendly mobile banking application with biometric authentication.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
    demoUrl: '#',
  },
  {
    id: 4,
    title: 'Restaurant Website',
    category: 'Web Development',
    description: 'Beautiful restaurant website with online reservations and menu management.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    tags: ['Next.js', 'Sanity', 'Vercel', 'Stripe'],
    demoUrl: '#',
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    category: 'Mobile Development',
    description: 'Comprehensive fitness tracking app with workout plans and progress monitoring.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    tags: ['Flutter', 'Firebase', 'Health Kit', 'Charts'],
    demoUrl: '#',
  },
  {
    id: 6,
    title: 'Learning Platform',
    category: 'Web Development',
    description: 'Interactive learning platform with video courses and progress tracking.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
    demoUrl: '#',
  }
];

const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile Development'];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="work" className="py-20 lg:py-32 bg-gradient-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Take a look at some of our recent projects. Each one represents our commitment
            to quality, innovation, and client satisfaction.
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
                  <a
                    href={project.demoUrl}
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-hover transition-colors"
                    title="View Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
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
          <button
            data-splash
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-hero"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
