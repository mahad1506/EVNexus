import { useMemo, useState } from "react";

import { motion } from "framer-motion";
import { BatteryCharging, Clock, Phone, Store, Zap } from "lucide-react";
import { locations } from "@/data/locations";
import { GlassCard, Section, SectionHeading, btnGhost } from "@/components/Primitives.jsx";


const filters = [
  { key: "all", label: "All locations" },
  { key: "charger", label: "Charging stations" },
  { key: "dealership", label: "Dealerships" },
];

function MapPage() {
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState("l1");

  const visible = useMemo(
    () => locations.filter((l) => filter === "all" || l.type === filter),
    [filter],
  );
  const active = locations.find((l) => l.id === activeId) ?? visible[0];

  return (
    <Section>
      <SectionHeading
        eyebrow="Network"
        title="Charging & dealership map"
        subtitle="Tap any pin to see power output, stall availability and opening hours."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={
              filter === f.key
                ? "inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                : btnGhost
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <GlassCard className="relative overflow-hidden p-0">
          <div className="relative aspect-[4/3] w-full bg-[linear-gradient(140deg,#a7ebf2_0%,#54acbf_55%,#26658c_100%)]">
            {/* stylised road grid */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <g stroke="#f5faff" strokeOpacity="0.45" strokeWidth="0.6">
                {[14, 32, 50, 68, 86].map((y) => (
                  <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} />
                ))}
                {[12, 30, 48, 66, 84].map((x) => (
                  <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" />
                ))}
              </g>
              <path d="M0 88 C 25 70, 40 96, 100 74" stroke="#023859" strokeOpacity="0.35" strokeWidth="2" fill="none" />
              <circle cx="90" cy="12" r="14" fill="#f5faff" fillOpacity="0.25" />
            </svg>

            {visible.map((l, i) => {
              const isActive = active && l.id === active.id;
              return (
                <motion.button
                  key={l.id}
                  type="button"
                  onClick={() => setActiveId(l.id)}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 18 }}
                  whileHover={{ scale: 1.15 }}
                  style={{ left: `${l.x}%`, top: `${l.y}%` }}
                  aria-label={l.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white shadow-lg transition ${
                      isActive ? "bg-[#011c40] ring-4 ring-white/50" : "bg-[#26658c]"
                    }`}
                  >
                    {l.type === "charger" ? (
                      <Zap className="h-4 w-4 text-white" />
                    ) : (
                      <Store className="h-4 w-4 text-white" />
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-border p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                {active.type === "charger" ? "Charging station" : "Authorised dealership"}
              </p>
              <h3 className="mt-1 text-xl font-extrabold text-foreground">{active.name}</h3>
              <p className="text-sm text-muted-foreground">{active.address}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-foreground/80">
                {active.type === "charger" ? (
                  <>
                    <span className="inline-flex items-center gap-2">
                      <BatteryCharging className="h-4 w-4 text-secondary" /> {active.power}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" /> {active.stalls} stalls
                    </span>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-2">
                      <Store className="h-4 w-4 text-secondary" /> {active.brands}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4 text-secondary" /> {active.phone}
                    </span>
                  </>
                )}
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" /> {active.open}
                </span>
              </div>
            </motion.div>
          ) : null}
        </GlassCard>

        <div className="grid content-start gap-3">
          {visible.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setActiveId(l.id)}
              className={`glass rounded-2xl p-4 text-left transition hover:-translate-y-0.5 ${
                active && active.id === l.id ? "ring-2 ring-secondary" : ""
              }`}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  {l.type === "charger" ? <Zap className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-bold text-foreground">{l.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {l.type === "charger" ? `${l.power} · ${l.stalls} stalls` : l.brands}
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default MapPage;
