import { Code, Palette, Smartphone, Zap, Globe, Shield } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Custom websites and web applications built with modern technologies for optimal performance and scalability.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Beautiful, intuitive interfaces that provide exceptional user experiences and drive conversions.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description:
      'Responsive designs that look and work perfectly on all devices, from mobile to desktop.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Lightning-fast websites optimized for speed, SEO, and user engagement.',
  },
  {
    icon: Globe,
    title: 'E-Commerce Solutions',
    description:
      'Complete online stores with secure payment processing and inventory management.',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    description:
      'Robust security measures and ongoing maintenance to keep your site safe and updated.',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            What We <span className="text-gradient">Do</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer comprehensive web development services to bring your digital vision to life.
            From concept to launch, we&apos;ve got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                data-splash
                className="card-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Don&apos;t see what you&apos;re looking for? We love custom challenges.
          </p>
          <button
            data-splash
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary-1"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
