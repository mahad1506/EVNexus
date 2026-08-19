import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Ship } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { GlassCard, Field, inputClass } from "@/components/Primitives.jsx";

const countries = {
  ke: { label: "Kenya", duty: 0.25, excise: 0.1, vat: 0.16, railway: 0.02 },
  ng: { label: "Nigeria", duty: 0.2, excise: 0.05, vat: 0.075, railway: 0.01 },
  za: { label: "South Africa", duty: 0.18, excise: 0.04, vat: 0.15, railway: 0.0 },
  ae: { label: "UAE", duty: 0.05, excise: 0.0, vat: 0.05, railway: 0.0 },
  uk: { label: "United Kingdom", duty: 0.1, excise: 0.0, vat: 0.2, railway: 0.0 },
};

export default function ImportCostCalculator() {
  const [vehicleId, setVehicleId] = useState(vehicles[1].id);
  const [country, setCountry] = useState("ke");
  const [freight, setFreight] = useState(2200);
  const [insurance, setInsurance] = useState(1.5);
  const [clearing, setClearing] = useState(900);
  const [evRebate, setEvRebate] = useState(true);

  const result = useMemo(() => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    const rules = countries[country];
    const fob = vehicle.price;
    const insuranceCost = (fob * insurance) / 100;
    const cif = fob + freight + insuranceCost;
    const dutyRate = evRebate ? rules.duty * 0.5 : rules.duty;
    const duty = cif * dutyRate;
    const excise = (cif + duty) * rules.excise;
    const vat = (cif + duty + excise) * rules.vat;
    const railway = cif * rules.railway;
    const total = cif + duty + excise + vat + railway + clearing;
    return {
      vehicle,
      rules,
      lines: [
        { label: "Vehicle cost (FOB)", value: fob },
        { label: "Ocean freight", value: freight },
        { label: `Marine insurance (${insurance}%)`, value: insuranceCost },
        { label: `Import duty (${Math.round(dutyRate * 100)}%)`, value: duty },
        { label: `Excise (${Math.round(rules.excise * 100)}%)`, value: excise },
        { label: `VAT (${Math.round(rules.vat * 100)}%)`, value: vat },
        { label: "Railway / port levy", value: railway },
        { label: "Clearing & agency fees", value: clearing },
      ],
      taxes: duty + excise + vat + railway,
      total,
    };
  }, [vehicleId, country, freight, insurance, clearing, evRebate]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-foreground">Shipment details</h3>
        <div className="mt-5 grid gap-5">
          <Field label="Vehicle">
            <select className={inputClass} value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Destination country">
            <select className={inputClass} value={country} onChange={(e) => setCountry(e.target.value)}>
              {Object.entries(countries).map(([key, c]) => (
                <option key={key} value={key}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Freight (USD)">
              <input
                type="number"
                min={0}
                className={inputClass}
                value={freight}
                onChange={(e) => setFreight(Math.max(0, Number(e.target.value) || 0))}
              />
            </Field>
            <Field label="Clearing fees (USD)">
              <input
                type="number"
                min={0}
                className={inputClass}
                value={clearing}
                onChange={(e) => setClearing(Math.max(0, Number(e.target.value) || 0))}
              />
            </Field>
          </div>
          <Field label={`Marine insurance: ${insurance}% of FOB`}>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={insurance}
              onChange={(e) => setInsurance(Number(e.target.value))}
              className="w-full accent-[#26658c]"
            />
          </Field>
          <label className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3">
            <input
              type="checkbox"
              checked={evRebate}
              onChange={(e) => setEvRebate(e.target.checked)}
              className="h-4 w-4 accent-[#26658c]"
            />
            <span className="text-sm font-semibold text-foreground">
              Apply 50% EV import duty concession
            </span>
          </label>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Landed cost</p>
        <motion.p
          key={Math.round(result.total)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-4xl font-extrabold text-foreground sm:text-5xl"
        >
          ${Math.round(result.total).toLocaleString()}
        </motion.p>
        <p className="mt-2 text-sm text-muted-foreground">
          Taxes & levies total ${Math.round(result.taxes).toLocaleString()} into {result.rules.label}.
        </p>

        <ul className="mt-6 grid gap-2">
          {result.lines.map((l) => (
            <li key={l.label} className="flex items-center justify-between border-b border-border pb-2 text-sm">
              <span className="text-muted-foreground">{l.label}</span>
              <span className="font-bold text-foreground">${Math.round(l.value).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 inline-flex items-start gap-2 text-xs text-muted-foreground">
          <Ship className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          Rates are indicative. Confirm current tariffs with your customs broker before committing to a purchase.
        </p>
      </GlassCard>
    </div>
  );
}
