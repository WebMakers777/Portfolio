import React from "react";

export function StatTile({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3 md:p-4 lg:p-5">
      <div className="text-neutral-400 text-xs md:text-xs lg:text-sm">{title}</div>
      <div className="text-xl md:text-2xl lg:text-3xl font-semibold">{value}</div>
      <div className="text-emerald-400 text-xs md:text-xs lg:text-sm mt-1">{subtitle}</div>
    </div>
  );
}
