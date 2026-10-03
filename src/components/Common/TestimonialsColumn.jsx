import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const TestimonialsColumn = (props) => {
  return (
    <div 
      className={props.className} 
      style={{ 
        overflow: 'hidden', 
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
      }}
    >
      <motion.div
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
          gap: '24px', 
          paddingBottom: '24px',
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
                  style={{ 
                    padding: '36px 30px', 
                    borderRadius: '24px', 
                    border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.5)', 
                    boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.08)', 
                    background: isDark ? 'linear-gradient(135deg, rgba(25,25,30,0.92), rgba(15,15,20,0.95))' : 'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(245,245,250,0.88))',
                    maxWidth: '350px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} size={16} fill="#3b82f6" color="#3b82f6" />
                    ))}
                  </div>
                  <div style={{ fontSize: '1.05rem', color: isDark ? 'rgba(255,255,255,0.9)' : '#1e293b', lineHeight: '1.6' }}>
                    {text}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px' }}>
                    <div style={{ fontWeight: 700, color: isDark ? '#fff' : '#0f172a', fontSize: '1rem' }}>{name}</div>
                    <div style={{ fontSize: '0.85rem', color: isDark ? 'rgba(255,255,255,0.5)' : '#64748b', fontWeight: 500 }}>{role}</div>
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
