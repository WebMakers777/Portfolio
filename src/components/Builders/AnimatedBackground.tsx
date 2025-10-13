export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating content frames */}
      <div className="floating-frame frame-1">
        <div className="frame-content gradient-shimmer" />
      </div>
      <div className="floating-frame frame-2">
        <div className="frame-content gradient-shimmer delay-1" />
      </div>
      <div className="floating-frame frame-3">
        <div className="frame-content gradient-shimmer delay-2" />
      </div>
      <div className="floating-frame frame-4">
        <div className="frame-content gradient-shimmer delay-3" />
      </div>
      <div className="floating-frame frame-5">
        <div className="frame-content gradient-shimmer" />
      </div>
      <div className="floating-frame frame-6">
        <div className="frame-content gradient-shimmer delay-1" />
      </div>
      
      {/* Floating circles */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />
      
      {/* Light beams */}
      <div className="light-beam beam-1" />
      <div className="light-beam beam-2" />
    </div>
  );
}
