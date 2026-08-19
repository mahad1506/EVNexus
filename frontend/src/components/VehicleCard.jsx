import { Link } from "react-router-dom";
import { BatteryCharging, Gauge, Timer, Users } from "lucide-react";
import { GlassCard, btnGhost } from "./Primitives";

export default function VehicleCard({ vehicle, selected, onToggle, actionLabel = "Compare" }) {
  return (
    <GlassCard hover className="flex h-full flex-col overflow-hidden p-0">
      <div
        className="relative h-36 w-full"
        style={{
          background: `linear-gradient(135deg, ${vehicle.accent} 0%, #011c40 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(20rem_10rem_at_20%_0%,#a7ebf2,transparent)]" />
        <div className="absolute bottom-3 left-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{vehicle.brand}</p>
          <h3 className="text-xl font-extrabold">{vehicle.name}</h3>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-foreground">
          {vehicle.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted-foreground">{vehicle.tagline}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Spec icon={Gauge} label={`${vehicle.range} km range`} />
          <Spec icon={BatteryCharging} label={`${vehicle.battery} kWh`} />
          <Spec icon={Timer} label={`${vehicle.acceleration}s 0-100`} />
          <Spec icon={Users} label={`${vehicle.seats} seats`} />
        </dl>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-lg font-extrabold text-foreground">${vehicle.price.toLocaleString()}</p>
          </div>
          {onToggle ? (
            <button
              type="button"
              onClick={() => onToggle(vehicle.id)}
              className={
                selected
                  ? "inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  : btnGhost
              }
            >
              {selected ? "Selected" : actionLabel}
            </button>
          ) : (
            <Link to="/compare" className={btnGhost}>
              Compare
            </Link>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

function Spec({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-foreground/80">
      <Icon className="h-4 w-4 shrink-0 text-secondary" />
      <span className="truncate text-xs font-semibold">{label}</span>
    </div>
  );
}
