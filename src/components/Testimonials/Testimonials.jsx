import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsColumn } from '../Common/TestimonialsColumn';
import './Testimonials.css';

const col1 = [
  { text: "Vincie Studios delivered our MVP 3 weeks ahead of schedule. The quality was outstanding.", image: "https://i.pravatar.cc/150?img=11", name: "Sarah Jenkins", role: "Founder, TechFlow" },
  { text: "The team's ability to grasp complex logic and turn it into scalable code is unmatched.", image: "https://i.pravatar.cc/150?img=22", name: "David Kim", role: "CEO, NexaCorp" },
  { text: "We scaled from 1,000 to 100,000 users without a single backend hiccup.", image: "https://i.pravatar.cc/150?img=33", name: "Alicia Torres", role: "CTO, GrowBase" },
  { text: "Incredible attention to detail. The UI feels buttery smooth.", image: "https://i.pravatar.cc/150?img=44", name: "James Wright", role: "Product Manager" }
];

const col2 = [
  { text: "Their deep understanding of scalable architecture saved us thousands of dollars in server costs.", image: "https://i.pravatar.cc/150?img=12", name: "Michael Chen", role: "CTO, DataSync" },
  { text: "They don't just write code; they act as a technical co-founder. Highly recommended.", image: "https://i.pravatar.cc/150?img=24", name: "Samantha Lee", role: "Founder, VibeCheck" },
  { text: "Fast, reliable, and incredibly talented. They delivered exactly what we needed.", image: "https://i.pravatar.cc/150?img=36", name: "Tom Baker", role: "Director, GlobalTech" },
  { text: "The communication was flawless. We knew exactly where the project stood every day.", image: "https://i.pravatar.cc/150?img=48", name: "Emily Rodriguez", role: "CEO, InnovateInc" }
];

const col3 = [
  { text: "We brought them a messy codebase, and they completely refactored it into a masterpiece.", image: "https://i.pravatar.cc/150?img=15", name: "Chris Evans", role: "Lead Engineer" },
  { text: "The best development team I've ever worked with. Execution was perfect.", image: "https://i.pravatar.cc/150?img=28", name: "Jessica Alba", role: "Founder, StyleCo" },
  { text: "Our conversion rates doubled after they rebuilt our landing page and funnel.", image: "https://i.pravatar.cc/150?img=39", name: "Mark Johnson", role: "CMO, GrowthHackers" },
  { text: "They took our rough idea and turned it into a fully-fledged enterprise product.", image: "https://i.pravatar.cc/150?img=50", name: "Lisa Wong", role: "Operations Head" }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      {/* Ambient Background Elements */}
      <div className="testimonials-bg-glow glow-1"></div>
      <div className="testimonials-bg-glow glow-2"></div>
      
      <div className="testimonials-header">
        <div className="liquid-badge-wrapper testimonials-badge">
          <div className="liquid-badge">
            <span className="badge-content-text">Wall Of Love</span>
            <div className="liquid-container">
              <div className="liquid-wave wave-1"></div>
              <div className="liquid-wave wave-2"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials-grid">
        <TestimonialsColumn testimonials={col1} duration={15} className="testimonials-col" />
        <TestimonialsColumn testimonials={col2} duration={22} className="testimonials-col hidden-mobile" />
        <TestimonialsColumn testimonials={col3} duration={18} className="testimonials-col hidden-tablet" />
      </div>
    </section>
  );
};

export default Testimonials;
