import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { contactService } from '../../lib/contactService';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        country: '',
        inquiryType: '',
        message: '',
        agreeTerms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            const extraDetails = [
                formData.phone ? `Phone: ${formData.phone}` : '',
                formData.company ? `Company: ${formData.company}` : '',
                formData.role ? `Role: ${formData.role}` : '',
                formData.country ? `Country: ${formData.country}` : '',
            ].filter(Boolean).join(' | ');
            await contactService.submitInquiry({
                name: fullName || 'Website Visitor',
                email: formData.email,
                service: formData.inquiryType || 'General Inquiry',
                message: extraDetails ? `${formData.message}\n\n[${extraDetails}]` : formData.message,
                source: 'Vincie Studios Contact Form',
            });
        } catch (err) {
            console.warn('Submission warning:', err);
        } finally {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({
                firstName: '', lastName: '', email: '', phone: '', company: '', role: '',
                country: '', inquiryType: '', message: '', agreeTerms: false
            });
            setTimeout(() => setIsSuccess(false), 5000);
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 80 } }
    };

    const fadeScale = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, type: "spring" } }
    };

    return (
        <section className="contact-section" id="contact" aria-label="Contact Vincie Studios">
            {/* Ambient Background Elements for Glass Theme */}
            <div className="contact-bg-glow glow-1"></div>
            <div className="contact-bg-glow glow-2"></div>

            <div className="contact-container">
                {/* Left Side: Form */}
                <motion.div
                    className="contact-left"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                >
                    <div className="support-badge">
                        <span className="dot"></span> Start a Project
                    </div>

                    <h2 className="contact-headline">
                        Let's turn your vision<br />
                        into reality.
                    </h2>

                    <p className="contact-motivational">
                        Whether you need a launch-ready MVP or a scalable SaaS platform, our team of expert engineers is ready to build it. Reach out to get started.
                    </p>

                    <form className="elixor-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="input-group">
                                <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name*" required disabled={isSubmitting} />
                            </div>
                            <div className="input-group">
                                <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name*" required disabled={isSubmitting} />
                            </div>
                            <div className="input-group">
                                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email address*" required disabled={isSubmitting} />
                            </div>
                            <div className="input-group">
                                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" disabled={isSubmitting} />
                            </div>
                            <div className="input-group">
                                <input type="text" id="company" value={formData.company} onChange={handleChange} placeholder="Company" disabled={isSubmitting} />
                            </div>
                            <div className="input-group">
                                <input type="text" id="role" value={formData.role} onChange={handleChange} placeholder="Your role" disabled={isSubmitting} />
                            </div>
                            
                            <div className="input-group select-wrapper">
                                <select id="country" value={formData.country} onChange={handleChange} disabled={isSubmitting}>
                                    <option value="" disabled>Select Country</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="IN">India</option>
                                    <option value="CA">Canada</option>
                                    <option value="AU">Australia</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <div className="input-group select-wrapper">
                                <select id="inquiryType" value={formData.inquiryType} onChange={handleChange} required disabled={isSubmitting}>
                                    <option value="" disabled>Inquiry Type*</option>
                                    <option value="mvp">MVP Development</option>
                                    <option value="saas">SaaS Platform</option>
                                    <option value="design">UI/UX Design</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group full-width">
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="How can we help you?*"
                                required
                                disabled={isSubmitting}
                            ></textarea>
                        </div>

                        <div className="checkbox-group">
                            <input type="checkbox" id="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required disabled={isSubmitting} />
                            <label htmlFor="agreeTerms">
                                I agree to the use or processing of my personal information by Vincie Studios for the purpose of fulfilling this request and in accordance with Vincie Studios' Privacy Statement.
                            </label>
                        </div>

                        <button type="submit" className={`submit-btn ${isSuccess ? 'success' : ''}`} disabled={isSubmitting || isSuccess || !formData.agreeTerms}>
                            {isSubmitting ? (
                                <><span>Submitting...</span><Loader2 size={18} className="spin-icon" /></>
                            ) : isSuccess ? (
                                <><span>Request Sent!</span><CheckCircle2 size={18} /></>
                            ) : (
                                <span>Submit Request</span>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Right Side: Visual Artwork */}
                <motion.div
                    className="contact-right"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeScale}
                >
                    <div className="contact-image-glass">
                        <img src="/contact-abstract.webp" alt="Abstract 3D Artwork" className="contact-artwork" loading="lazy" />
                        <div className="glass-overlay"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
