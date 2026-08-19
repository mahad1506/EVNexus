import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { specRows, vehicles } from "@/data/vehicles";
import { GlassCard, Section, SectionHeading, btnGhost } from "@/components/Primitives.jsx";


const MAX = 4;

function ComparePage() {
  const [selected, setSelected] = useState(["aurora-gt", "vega-s"]);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length >= MAX ? prev : [...prev, id],
    );

  const chosen = selected.map((id) => vehicles.find((v) => v.id === id)).filter(Boolean);

  const bestValue = (row) => {
    if (!row.better || chosen.length < 2) return null;
    const values = chosen.map((c) => c[row.key]);
    return row.better === "high" ? Math.max(...values) : Math.min(...values);
  };

  return (
    <Section>
      <SectionHeading
        eyebrow="Comparison engine"
        title="Compare up to four EVs"
        subtitle="Pick your shortlist below — winning figures in each row are highlighted automatically."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {vehicles.map((v) => {
          const isOn = selected.includes(v.id);
          const disabled = !isOn && selected.length >= MAX;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => toggle(v.id)}
              disabled={disabled}
              className={
                isOn
                  ? "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  : `${btnGhost} ${disabled ? "opacity-40" : ""}`
              }
            >
              {isOn ? <Check className="h-4 w-4" /> : null}
              {v.brand} {v.name}
            </button>
          );
        })}
      </div>

      {chosen.length === 0 ? (
        <GlassCard className="mt-8 p-10 text-center text-sm text-muted-foreground">
          Select at least one vehicle to start comparing.
        </GlassCard>
      ) : (
        <GlassCard className="mt-8 overflow-x-auto p-0">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 bg-card/80 p-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Specification
                </th>
                <AnimatePresence initial={false}>
                  {chosen.map((v) => (
                    <motion.th
                      key={v.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 text-left align-top"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {v.brand}
                          </p>
                          <p className="text-base font-extrabold text-foreground">{v.name}</p>
                          <p className="text-xs text-muted-foreground">{v.year}</p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${v.name}`}
                          onClick={() => toggle(v.id)}
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.th>
                  ))}
                </AnimatePresence>
              </tr>
            </thead>
            <tbody>
              {specRows.map((row, i) => {
                const best = bestValue(row);
                return (
                  <motion.tr
                    key={row.key}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="border-t border-border"
                  >
                    <td className="sticky left-0 bg-card/80 p-4 font-semibold text-foreground">{row.label}</td>
                    {chosen.map((v) => {
                      const isBest = best !== null && v[row.key] === best;
                      return (
                        <td key={v.id} className="p-4">
                          <span
                            className={
                              isBest
                                ? "inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 font-bold text-accent-foreground"
                                : "text-foreground/80"
                            }
                          >
                            {row.format(v[row.key])}
                          </span>
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>
      )}
    </Section>
  );
}

export default ComparePage;
