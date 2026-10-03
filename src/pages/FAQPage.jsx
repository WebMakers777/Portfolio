import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Target, Smartphone, Globe, RefreshCcw, Rocket } from 'lucide-react';

import './FAQPage.css';

const faqData = [
    {
        question: "What kind of projects does Vincie Studios handle?",
        answer: "We specialize in building MVPs, full-stack web apps, SaaS platforms, CRM systems, ERP portals, and company websites. From financial platforms like BookMyCA to enterprise-grade tools like ACTTS CRM — if it's digital, we build it.",
        color: "blue",
        icon: <Globe size={24} />,
        size: "large"
    },
    {
        question: "How fast can you deliver a working product?",
        answer: "Speed is in our DNA. A typical MVP or landing page ships in under 4 weeks. More complex systems like ERP portals or CRM dashboards take 6–8 weeks. We cut through the noise to deliver the essential features that prove your market fit first.",
        color: "purple",
        icon: <Zap size={24} />,
        size: "medium"
    },
    {
        question: "What is your tech stack?",
        answer: "We work with modern, battle-tested technologies: React, Next.js, Node.js, TypeScript, Tailwind CSS, MongoDB, and PostgreSQL.",
        color: "emerald",
        icon: <Sparkles size={24} />,
        size: "small"
    },
    {
        question: "How does the pricing work?",
        answer: "No scope creep or runaway hourly bills. We offer clear, milestone-based pricing that aligns with your startup's runway.",
        color: "pink",
        icon: <Target size={24} />,
        size: "small"
    },
    {
        question: "Do you handle design as well, or just development?",
        answer: "We're end-to-end. That means UI/UX design, frontend development, backend engineering, database architecture, and deployment.",
        color: "orange",
        icon: <Smartphone size={24} />,
        size: "medium"
    },
    {
        question: "Do you build mobile apps?",
        answer: "Yes! We build high-performance cross-platform mobile applications using React Native and Flutter, ensuring your product works perfectly on both iOS and Android from day one.",
        color: "blue",
        icon: <Smartphone size={24} />,
        size: "medium"
    },
    {
        question: "Can I see examples of your past work?",
        answer: "Absolutely. Check out our Projects section — we've built BookMyCA (a financial services platform with Razorpay integration), ACTTS CRM (a full customer relationship management system), an Enterprise Resource Planning Portal, and Hansha Pharmaceuticals' website.",
        color: "emerald",
        icon: <Shield size={24} />,
        size: "large"
    },
    {
        question: "Will you sign an NDA?",
        answer: "Of course. Your intellectual property is safe with us. We sign NDAs before we even hear your pitch.",
        color: "purple",
        icon: <Shield size={24} />,
        size: "small"
    },
    {
        question: "Do you integrate third-party APIs?",
        answer: "Yes, we regularly integrate payment gateways like Stripe and Razorpay, AI services like OpenAI, and analytics like Mixpanel.",
        color: "pink",
        icon: <Zap size={24} />,
        size: "small"
    },
    {
        question: "What happens after the project is delivered?",
        answer: "We don't disappear after launch. We offer post-launch support, bug fixes, and iterative improvements. Many of our clients continue working with us as their product evolves.",
        color: "orange",
        icon: <RefreshCcw size={24} />,
        size: "medium"
    },
    {
        question: "Do you help with hosting and domains?",
        answer: "Yes, we manage the entire deployment process to AWS, Vercel, or DigitalOcean, and help configure your custom domains and SSL certificates.",
        color: "blue",
        icon: <Globe size={24} />,
        size: "medium"
    },
    {
        question: "How do I get started?",
        answer: "Simple — hit the 'Book a Slot' button in the navbar or the 'Start your project' CTA in the hero section. Fill in your details and preferred time, and we'll set up a discovery call to understand your vision, scope, and timeline.",
        color: "emerald",
        icon: <Rocket size={24} />,
        size: "large"
    },
];

const FAQBubble = ({ item, index }) => {
  // Determine width based on size
  let widthClass = 'faq-bubble-wrapper-large';
  if (item.size === 'medium') widthClass = 'faq-bubble-wrapper-medium';
  if (item.size === 'small') widthClass = 'faq-bubble-wrapper-small';

  return (
    <div className={`faq-bubble-wrapper ${widthClass}`}>
      <motion.div 
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%' }}
        className={`faq-bubble color-${item.color}`}
      >
        <div className="faq-bubble-header">
          <div className="faq-bubble-icon">{item.icon}</div>
          <h3 className="faq-bubble-q">{item.question}</h3>
        </div>
        <p className="faq-bubble-a">{item.answer}</p>
      </motion.div>
    </div>
  );
};

const FAQPage = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'FAQ | Vincie Studios';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Frequently asked questions about our MVP development process, pricing, tech stack, and delivery timelines.');
  }, []);

  return (
    <div className="faq-page-container">
      {/* Ambient Background Glowing Orbs */}
      <div className="faq-ambient-orbs">
        <div className="faq-orb faq-orb-1"></div>
        <div className="faq-orb faq-orb-2"></div>
        <div className="faq-orb faq-orb-3"></div>
      </div>
      {/* Hero Section */}
      <motion.section 
        className="faq-page-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="faq-hero-pretitle">The Details</span>
        <h1 className="faq-hero-title">Questions & Answers</h1>
        <p className="faq-hero-desc">
          Everything you need to know before you start building with us. Scroll down to explore our most frequently asked questions.
        </p>
      </motion.section>

      {/* Interactive Scattered FAQ Layout */}
      <section className="faq-scatter-container">
        {faqData.map((item, index) => (
          <FAQBubble key={index} item={item} index={index} />
        ))}
      </section>

      {/* Have a Question Section */}
      <motion.section 
        className="faq-contact-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="faq-contact-card">
          <h2>Still have a question?</h2>
          <p>Drop your question here and we'll get back to you shortly.</p>
          {submitted ? (
            <div className="faq-success-message">
              <span>✅ Your question has been submitted. We'll be in touch!</span>
            </div>
          ) : (
            <form className="faq-question-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <input type="text" placeholder="Drop your question here..." required className="faq-question-input" />
              <button type="submit" className="faq-contact-btn">Submit ↗</button>
            </form>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default FAQPage;
