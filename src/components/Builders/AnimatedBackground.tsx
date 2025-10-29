export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating content frames */}
      <div className="floating-frame frame-1 border-2 border-fuchsia-500/20 shadow-lg shadow-fuchsia-500/10">
        <div className="frame-content bg-gradient-to-br from-fuchsia-900/15 via-purple-800/10 to-fuchsia-900/15" />
        <div className="frame-content gradient-shimmer absolute inset-0" />
      </div>
      <div className="floating-frame frame-2 border-2 border-cyan-400/20 shadow-lg shadow-cyan-400/10">
        <div className="frame-content bg-gradient-to-br from-cyan-900/15 via-blue-800/10 to-cyan-900/15" />
        <div className="frame-content gradient-shimmer delay-1 absolute inset-0" />
      </div>
      <div className="floating-frame frame-3 border-2 border-purple-500/20 shadow-lg shadow-purple-500/10">
        <div className="frame-content bg-gradient-to-br from-purple-900/15 via-indigo-800/10 to-purple-900/15" />
        <div className="frame-content gradient-shimmer delay-2 absolute inset-0" />
      </div>
      <div className="floating-frame frame-4 border-2 border-pink-500/20 shadow-lg shadow-pink-500/10">
        <div className="frame-content bg-gradient-to-br from-pink-900/15 via-rose-800/10 to-pink-900/15" />
        <div className="frame-content gradient-shimmer delay-3 absolute inset-0" />
      </div>
      <div className="floating-frame frame-5 border-2 border-fuchsia-500/20 shadow-lg shadow-fuchsia-500/10">
        <div className="frame-content bg-gradient-to-br from-fuchsia-900/15 via-purple-800/10 to-fuchsia-900/15" />
        <div className="frame-content gradient-shimmer absolute inset-0" />
      </div>
      <div className="floating-frame frame-6 border-2 border-cyan-400/20 shadow-lg shadow-cyan-400/10">
        <div className="frame-content bg-gradient-to-br from-cyan-900/15 via-blue-800/10 to-cyan-900/15" />
        <div className="frame-content gradient-shimmer delay-1 absolute inset-0" />
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
