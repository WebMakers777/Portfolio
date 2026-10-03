import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import MagneticIcon from '../Common/MagneticIcon';
import './FAQ.css';

const faqData = [
    {
        question: "What kind of projects does Vincie Studios handle?",
        answer: "We specialize in building MVPs, full-stack web apps, SaaS platforms, CRM systems, ERP portals, and company websites. From financial platforms like BookMyCA to enterprise-grade tools like ACTTS CRM — if it's digital, we build it."
    },
    {
        question: "How fast can you deliver a working product?",
        answer: "Speed is in our DNA. A typical MVP or landing page ships in under 4 weeks. More complex systems like ERP portals or CRM dashboards take 6–8 weeks. We cut through the noise to deliver the essential features that prove your market fit first."
    },
    {
        question: "What is your tech stack?",
        answer: "We work with modern, battle-tested technologies: React, Next.js, Node.js, TypeScript, Tailwind CSS, MongoDB, and PostgreSQL. For payments we integrate Razorpay. Every project is built on future-proof architecture designed to scale with your business."
    },
    {
        question: "How does the pricing work?",
        answer: "No scope creep or runaway hourly bills. We offer clear, milestone-based pricing that aligns with your startup's runway. You know exactly what you're paying for at every stage. Book a slot to get a custom quote tailored to your project."
    },
    {
        question: "Do you handle design as well, or just development?",
        answer: "We're end-to-end. That means UI/UX design, frontend development, backend engineering, database architecture, and deployment — all handled by us. You focus on your business strategy while we handle the heavy lifting of design and code."
    },
    {
        question: "Can I see examples of your past work?",
        answer: "Absolutely. Check out our Projects section above — we've built BookMyCA (a financial services platform with Razorpay integration), ACTTS CRM (a full customer relationship management system), an Enterprise Resource Planning Portal, and Hansha Pharmaceuticals' website, among others."
    },
    {
        question: "What happens after the project is delivered?",
        answer: "We don't disappear after launch. We offer post-launch support, bug fixes, and iterative improvements. Many of our clients continue working with us as their product evolves — from MVP to growth stage and beyond."
    },
    {
        question: "How do I get started?",
        answer: "Simple — hit the 'Book a Slot' button in the navbar or the 'Start your project' CTA in the hero section. Fill in your details and preferred time, and we'll set up a discovery call to understand your vision, scope, and timeline."
    },
];

const FAQItem = ({ item, index, isOpen, onToggle }) => {
    return (
        <motion.div
            className={`faq-item ${isOpen ? 'faq-open' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.06, type: "spring", stiffness: 100, damping: 20 }}
        >
            <button
                className="faq-question"
                onClick={onToggle}
                aria-expanded={isOpen}
                id={`faq-btn-${index}`}
                title={`Toggle Answer for: ${item.question}`}
            >
                <span className="faq-q-text">{item.question}</span>
                <span className={`faq-chevron ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={20} />
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="faq-answer-wrapper"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <p className="faq-answer">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 80 } }
    };

    return (
        <section className="faq-section" id="faq" aria-label="Frequently asked questions">
            {/* Section Header */}
            <motion.div
                className="liquid-badge-wrapper"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
            >
                <div className="liquid-badge">
                    <span className="badge-content-text">Got Questions?</span>
                    <div className="liquid-container">
                        <div className="liquid-wave wave-1"></div>
                        <div className="liquid-wave wave-2"></div>
                    </div>
                </div>
            </motion.div>

            <motion.h2
                className="faq-headline"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
            >
                Frequently Asked<br />
                <span className="faq-headline-accent">Questions</span>
            </motion.h2>

            <motion.p
                className="faq-subtext"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
            >
                Everything you need to know before you start building with us.
            </motion.p>

            {/* FAQ Items */}
            <div className="faq-list">
                {faqData.map((item, index) => (
                    <FAQItem
                        key={index}
                        item={item}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </div>

            {/* Have a Question Card */}
            <motion.div
                className="faq-question-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
            >
                <div className="faq-question-content">
                    <h3 className="faq-question-title">Have a question?</h3>
                    <p className="faq-question-desc">Can't find the answer you're looking for? Reach out to our team.</p>
                </div>
                <a href="/contact" className="faq-contact-btn">
                    Contact Us <MagneticIcon><HelpCircle size={18} /></MagneticIcon>
                </a>
            </motion.div>
        </section>
    );
};

export default FAQ;
