import React from "react";

export function Bullet({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
      <div className="font-semibold">{title}</div>
      <div className="text-neutral-300 text-sm mt-1">{desc}</div>
    </div>
  );
}
