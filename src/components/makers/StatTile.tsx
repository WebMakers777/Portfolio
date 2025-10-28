import React from "react";

export function StatTile({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <div className="text-neutral-400 text-xs">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-emerald-400 text-xs mt-1">{subtitle}</div>
    </div>
  );
}
