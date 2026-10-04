import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const TestimonialsColumn = (props) => {
  return (
    <div 
      className={props.className} 
      style={{ 
        overflow: 'hidden', 
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)'
      }}
    >
      <motion.div
        className="testimonials-col-track"
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          willChange: 'transform'
        }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => {
                const isDark = i % 2 !== 0;
                return (
                <div 
                  key={i} 
                  className={`testimonial-card-item ${isDark ? 'is-dark' : 'is-light'}`}
                  style={{ 
                    border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.5)', 
                    boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.08)', 
                    background: isDark ? 'linear-gradient(135deg, rgba(25,25,30,0.92), rgba(15,15,20,0.95))' : 'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(245,245,250,0.88))',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div className="testimonial-stars" style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} size={15} fill="#3b82f6" color="#3b82f6" />
                    ))}
                  </div>
                  <div className="testimonial-text" style={{ color: isDark ? 'rgba(255,255,255,0.9)' : '#1e293b' }}>
                    {text}
                  </div>
                  <div className="testimonial-author" style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div className="testimonial-name" style={{ fontWeight: 700, color: isDark ? '#fff' : '#0f172a' }}>{name}</div>
                    <div className="testimonial-role" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#64748b', fontWeight: 500 }}>{role}</div>
                  </div>
                </div>
              )})}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
