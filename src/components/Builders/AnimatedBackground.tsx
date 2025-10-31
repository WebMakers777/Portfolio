export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating content frames */}
      <div className="floating-frame frame-1">
        <div className="frame-content bg-gradient-to-br from-fuchsia-900/15 via-purple-800/10 to-fuchsia-900/15" />
        <div className="frame-content gradient-shimmer absolute inset-0" />
      </div>
      <div className="floating-frame frame-2">
        <div className="frame-content bg-gradient-to-br from-cyan-900/15 via-blue-800/10 to-cyan-900/15" />
        <div className="frame-content gradient-shimmer delay-1 absolute inset-0" />
      </div>
      <div className="floating-frame frame-3">
        <div className="frame-content bg-gradient-to-br from-purple-900/15 via-indigo-800/10 to-purple-900/15" />
        <div className="frame-content gradient-shimmer delay-2 absolute inset-0" />
      </div>
      <div className="floating-frame frame-4">
        <div className="frame-content bg-gradient-to-br from-pink-900/15 via-rose-800/10 to-pink-900/15" />
        <div className="frame-content gradient-shimmer delay-3 absolute inset-0" />
      </div>
      <div className="floating-frame frame-5">
        <div className="frame-content bg-gradient-to-br from-fuchsia-900/15 via-purple-800/10 to-fuchsia-900/15" />
        <div className="frame-content gradient-shimmer absolute inset-0" />
      </div>
      <div className="floating-frame frame-6">
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

      {/* 🔧 Bold motion & visibility */}
      <style>{`
        /* master knobs (turn these up/down) */
        :root{
          --ab-amp: 1.0;      /* motion amplitude (0.6 subtle → 1.0 bold → 1.3 extra) */
          --ab-speed: 1.0;    /* global speed scaler */
          --ab-opacity: 1.0;  /* overall visibility scaler */
        }

        /* FRAMES */
        .floating-frame{
          position:absolute; border-radius:16px; overflow:hidden;
          border:1px solid rgba(255,255,255,.10);
          box-shadow:0 16px 50px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.08);
          backdrop-filter: blur(8px);
          will-change: transform, opacity;
          animation: ab-drift calc(12s / var(--ab-speed)) ease-in-out infinite alternate;
          opacity: calc(.46 * var(--ab-opacity));
        }
        .floating-frame .frame-content{ width:100%; height:100%; }
        .gradient-shimmer{
          background:linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
          animation: ab-shimmer calc(2.4s / var(--ab-speed)) linear infinite;
          mix-blend-mode: screen;
        }
        .gradient-shimmer.delay-1{ animation-delay:.4s }
        .gradient-shimmer.delay-2{ animation-delay:.8s }
        .gradient-shimmer.delay-3{ animation-delay:1.2s }

        /* positions/sizes */
        .frame-1{ top:10%; right:8%; width:min(30vw,460px); height:min(20vw,270px); transform-origin:60% 40%;}
        .frame-2{ bottom:12%; left:10%; width:min(28vw,420px); height:min(19vw,250px); transform-origin:40% 60%;}
        .frame-3{ top:22%; left:6%; width:min(24vw,360px); height:min(16vw,220px);}
        .frame-4{ bottom:10%; right:6%; width:min(24vw,360px); height:min(16vw,220px);}
        .frame-5{ top:40%; right:18%; width:min(22vw,330px); height:min(15vw,210px);}
        .frame-6{ bottom:26%; left:22%; width:min(20vw,300px); height:min(14vw,200px);}

        /* ORBS */
        .floating-orb{
          position:absolute; border-radius:9999px;
          filter: blur(22px) saturate(125%);
          mix-blend-mode: screen;
          opacity: calc(.34 * var(--ab-opacity));
          will-change: transform, opacity;
          animation: ab-float calc(12s / var(--ab-speed)) ease-in-out infinite alternate;
        }
        .orb-1{
          top:4%; left:6%; width:clamp(200px, 40vw, 560px); height:clamp(200px, 40vw, 560px);
          background:
            radial-gradient(circle at 30% 30%, rgba(99,102,241,.78), rgba(59,169,255,.46) 55%, rgba(236,72,153,.26)),
            radial-gradient(circle at 70% 70%, rgba(59,169,255,.55), transparent 60%);
          animation-duration: calc(14s / var(--ab-speed));
        }
        .orb-2{
          right:8%; bottom:8%; width:clamp(180px, 34vw, 500px); height:clamp(180px, 34vw, 500px);
          background:
            radial-gradient(circle at 30% 30%, rgba(236,72,153,.7), rgba(168,85,247,.42) 55%, rgba(59,169,255,.24)),
            radial-gradient(circle at 70% 70%, rgba(168,85,247,.50), transparent 60%);
          animation-duration: calc(15s / var(--ab-speed));
        }
        .orb-3{
          left:50%; top:42%; transform:translateX(-50%);
          width:clamp(180px, 34vw, 520px); height:clamp(180px, 34vw, 520px);
          background:
            radial-gradient(circle at 30% 30%, rgba(59,169,255,.62), rgba(34,197,94,.34) 50%, rgba(168,85,247,.22)),
            radial-gradient(circle at 70% 70%, rgba(34,197,94,.5), transparent 60%);
          animation-duration: calc(16s / var(--ab-speed));
        }

        /* BEAMS */
        .light-beam{
          position:absolute; inset:-12% -18%;
          background:
            conic-gradient(from 180deg at 50% 50%,
              rgba(59,169,255,0) 8%,
              rgba(59,169,255,.12) 26%,
              rgba(236,72,153,.12) 46%,
              rgba(59,169,255,0) 64%),
            radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,.08), rgba(0,0,0,0));
          filter: blur(20px);
          opacity: calc(.30 * var(--ab-opacity));
          animation: ab-rotate calc(38s / var(--ab-speed)) linear infinite;
        }
        .beam-1{ transform-origin:35% 65%; }
        .beam-2{ transform-origin:65% 35%; opacity: calc(.24 * var(--ab-opacity)); animation-duration: calc(46s / var(--ab-speed)); }

        /* ANIMATIONS — bolder ranges */
        @keyframes ab-float {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(0, calc(-36px * var(--ab-amp)), 0) scale(1.05); }
        }
        @keyframes ab-drift {
          0%   { transform: translate3d(0, 0, 0) rotate(calc(-2.2deg * var(--ab-amp))); }
          100% { transform: translate3d(0, calc(-18px * var(--ab-amp)), 0) rotate(calc(2.2deg * var(--ab-amp))); }
        }
        @keyframes ab-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ab-shimmer {
          0% { opacity:0; transform: translateX(-40%); }
          35%{ opacity:.85; }
          100%{ opacity:0; transform: translateX(140%); }
        }

        /* MOBILE — keep motion visible */
        @media (max-width: 768px){
          :root{ --ab-amp: 0.9; --ab-speed: 1.0; }
          .floating-frame{ opacity: calc(.40 * var(--ab-opacity)); backdrop-filter: blur(5px); }
          .light-beam{ opacity: calc(.22 * var(--ab-opacity)); filter: blur(18px); }
          .floating-orb{ filter: blur(18px); opacity: calc(.30 * var(--ab-opacity)); }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce){
          .floating-frame, .floating-orb, .light-beam, .gradient-shimmer{
            animation:none !important; opacity:.22 !important;
            transform: translate3d(0,0,0) !important;
          }
        }
      `}</style>
    </div>
  );
}
