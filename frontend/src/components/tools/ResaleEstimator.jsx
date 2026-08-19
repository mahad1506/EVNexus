import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { GlassCard, Field, inputClass } from "@/components/Primitives.jsx";

const conditions = {
  excellent: { label: "Excellent", factor: 1.06 },
  good: { label: "Good", factor: 1 },
  fair: { label: "Fair", factor: 0.9 },
  poor: { label: "Needs work", factor: 0.78 },
};

const CURRENT_YEAR = 2026;

export default function ResaleEstimator() {
  const [vehicleId, setVehicleId] = useState(vehicles[0].id);
  const [year, setYear] = useState(2024);
  const [mileage, setMileage] = useState(45000);
  const [condition, setCondition] = useState("good");
  const [batteryHealth, setBatteryHealth] = useState(94);

  const result = useMemo(() => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    const age = Math.max(0, CURRENT_YEAR - year);
    // ~13% annual depreciation, compounding.
    const ageFactor = Math.pow(0.87, age);
    const mileageFactor = Math.max(0.55, 1 - (mileage / 1000) * 0.0022);
    const batteryFactor = 0.7 + (batteryHealth / 100) * 0.3;
    const value =
      vehicle.price * ageFactor * mileageFactor * batteryFactor * conditions[condition].factor;
    const estimate = Math.round(value / 100) * 100;
    return {
      vehicle,
      estimate,
      low: Math.round((estimate * 0.93) / 100) * 100,
      high: Math.round((estimate * 1.07) / 100) * 100,
      retained: Math.round((estimate / vehicle.price) * 100),
      lost: vehicle.price - estimate,
    };
  }, [vehicleId, year, mileage, condition, batteryHealth]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-foreground">Vehicle details</h3>
        <div className="mt-5 grid gap-5">
          <Field label="Model">
            <select className={inputClass} value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.name} — ${v.price.toLocaleString()} new
                </option>
              ))}
            </select>
          </Field>
          <Field label="Model year">
            <select className={inputClass} value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {Array.from({ length: 9 }, (_, i) => CURRENT_YEAR - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>
          <Field label={`Odometer: ${mileage.toLocaleString()} km`}>
            <input
              type="range"
              min={0}
              max={250000}
              step={1000}
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              className="w-full accent-[#26658c]"
            />
          </Field>
          <Field label={`Battery health: ${batteryHealth}%`} hint="State of health from your vehicle's service report.">
            <input
              type="range"
              min={70}
              max={100}
              value={batteryHealth}
              onChange={(e) => setBatteryHealth(Number(e.target.value))}
              className="w-full accent-[#26658c]"
            />
          </Field>
          <Field label="Overall condition">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.entries(conditions).map(([key, c]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCondition(key)}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                    condition === key
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card/60 text-foreground/70"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </GlassCard>

      <GlassCard className="flex flex-col justify-center p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Estimated resale value</p>
        <motion.p
          key={result.estimate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-4xl font-extrabold text-foreground sm:text-5xl"
        >
          ${result.estimate.toLocaleString()}
        </motion.p>
        <p className="mt-2 text-sm text-muted-foreground">
          Market range ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
        </p>

        <div className="mt-6 grid gap-3">
          <Row label="Original price" value={`$${result.vehicle.price.toLocaleString()}`} />
          <Row label="Value retained" value={`${result.retained}%`} />
          <Row label="Total depreciation" value={`-$${result.lost.toLocaleString()}`} />
        </div>

        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#54acbf,#26658c)]"
            initial={{ width: 0 }}
            animate={{ width: `${result.retained}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <p className="mt-5 inline-flex items-start gap-2 text-xs text-muted-foreground">
          <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          Estimates use a 13% annual depreciation curve adjusted for mileage, battery state of health and condition.
        </p>
      </GlassCard>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}
