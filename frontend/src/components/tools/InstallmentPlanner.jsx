import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Landmark } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { GlassCard, Field, inputClass } from "@/components/Primitives.jsx";

const plans = [
  { id: "flex", name: "Flex 36", months: 36, apr: 6.9, deposit: 20, note: "Lowest total interest" },
  { id: "balanced", name: "Balanced 60", months: 60, apr: 8.4, deposit: 15, note: "Most popular" },
  { id: "easy", name: "Easy Start 84", months: 84, apr: 10.2, deposit: 10, note: "Lowest monthly payment" },
];

const monthlyPayment = (principal, apr, months) => {
  const r = apr / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
};

export default function InstallmentPlanner() {
  const [vehicleId, setVehicleId] = useState(vehicles[0].id);
  const [depositOverride, setDepositOverride] = useState(null);
  const [tradeIn, setTradeIn] = useState(0);
  const [activePlan, setActivePlan] = useState("balanced");

  const rows = useMemo(() => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return plans.map((plan) => {
      const depositPct = depositOverride ?? plan.deposit;
      const deposit = (vehicle.price * depositPct) / 100;
      const principal = Math.max(0, vehicle.price - deposit - tradeIn);
      const monthly = monthlyPayment(principal, plan.apr, plan.months);
      const totalPaid = monthly * plan.months + deposit + tradeIn;
      return {
        ...plan,
        depositPct,
        deposit,
        principal,
        monthly,
        totalPaid,
        interest: monthly * plan.months - principal,
        vehicle,
      };
    });
  }, [vehicleId, depositOverride, tradeIn]);

  const selected = rows.find((r) => r.id === activePlan) ?? rows[0];

  return (
    <div className="grid gap-6">
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-foreground">Financing inputs</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <Field label="Vehicle">
            <select className={inputClass} value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.name} — ${v.price.toLocaleString()}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label={`Deposit: ${depositOverride === null ? "plan default" : `${depositOverride}%`}`}
            hint="Leave at plan default or override for all plans."
          >
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={depositOverride ?? 15}
              onChange={(e) => setDepositOverride(Number(e.target.value))}
              className="w-full accent-[#26658c]"
            />
          </Field>
          <Field label="Trade-in value (USD)">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={tradeIn}
              onChange={(e) => setTradeIn(Math.max(0, Number(e.target.value) || 0))}
            />
          </Field>
        </div>
        {depositOverride !== null ? (
          <button
            type="button"
            onClick={() => setDepositOverride(null)}
            className="mt-4 text-sm font-semibold text-primary"
          >
            Reset to plan defaults
          </button>
        ) : null}
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-3">
        {rows.map((r, i) => (
          <motion.button
            key={r.id}
            type="button"
            onClick={() => setActivePlan(r.id)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`glass rounded-3xl p-6 text-left transition hover:-translate-y-1 ${
              activePlan === r.id ? "ring-2 ring-secondary" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-lg font-extrabold text-foreground">{r.name}</h4>
              <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
                {r.apr}% APR
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-secondary">{r.note}</p>
            <p className="mt-5 text-3xl font-extrabold text-foreground">
              ${Math.round(r.monthly).toLocaleString()}
              <span className="text-sm font-semibold text-muted-foreground"> /mo</span>
            </p>
            <ul className="mt-4 grid gap-1.5 text-sm text-muted-foreground">
              <li>
                Deposit {r.depositPct}% — ${Math.round(r.deposit).toLocaleString()}
              </li>
              <li>{r.months} monthly payments</li>
              <li>Total interest ${Math.round(r.interest).toLocaleString()}</li>
            </ul>
          </motion.button>
        ))}
      </div>

      <GlassCard className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          {selected.name} breakdown — {selected.vehicle.brand} {selected.vehicle.name}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Monthly payment" value={`$${Math.round(selected.monthly).toLocaleString()}`} />
          <Kpi label="Amount financed" value={`$${Math.round(selected.principal).toLocaleString()}`} />
          <Kpi label="Total interest" value={`$${Math.round(selected.interest).toLocaleString()}`} />
          <Kpi label="Total cost of ownership" value={`$${Math.round(selected.totalPaid).toLocaleString()}`} />
        </div>
        <p className="mt-5 inline-flex items-start gap-2 text-xs text-muted-foreground">
          <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          Payments use standard amortisation. Lender fees, insurance and taxes are not included.
        </p>
      </GlassCard>
    </div>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="rounded-2xl bg-muted/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-extrabold text-foreground">{value}</p>
    </div>
  );
}
