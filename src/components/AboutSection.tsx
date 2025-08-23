// src/components/AboutSection.tsx
import { Users, Target, Award, Heart } from "lucide-react";

import nikhilImg from "../assets/nikhil.jpg";
import sankalpImg from "../assets/sankalp.jpg";
import akshayImg from "../assets/hero-bg.jpg"; // replace with the correct file you want


const team = [
  {
    name: "Akshay Labh",
    role: "Fullstack Developer",
    image: akshayImg,
    expertise: "Full-Stack Development",
  },
  {
    name: "Nikhil Mittal",
    role: "Operations Lead",
    image: nikhilImg,
    expertise: "User Experience Design",
  },
  {
    name: "Sankalp Jain",
    role: "Development Head",
    image: sankalpImg,
    expertise: "React & TypeScript",
  },
];


const values = [
  {
    icon: Target,
    title: 'Quality First',
    description: 'We never compromise on quality. Every line of code, every design element is crafted with precision.'
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our success. We work closely with you to understand and exceed your expectations.'
  },
  {
    icon: Award,
    title: 'Innovation',
    description: 'We stay ahead of the curve, using cutting-edge technologies to build future-ready solutions.'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do, and it shows in every project we deliver. Passion drives our excellence.'
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (no splash) */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-gradient">Us</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re a passionate team of developers and designers committed to creating 
            exceptional digital experiences that drive real business results.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div data-splash className="card-gradient p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To empower businesses with cutting-edge web solutions that not only look stunning 
              but also deliver measurable results. We believe in the power of great design and 
              clean code to transform ideas into digital success stories.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                data-splash
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">Meet Our Team</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The talented individuals who bring your digital visions to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              data-splash
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-4 mx-auto w-32 h-32">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-4 border-border group-hover:border-primary/50 transition-colors duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.expertise}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
