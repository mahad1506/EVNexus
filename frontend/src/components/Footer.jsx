import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-background-accent text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Zap className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold">EVNexus</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            The complete electric vehicle platform — research, compare, finance and charge with confidence.
          </p>
        </div>

        <FooterCol
          title="Explore"
          items={[
            { to: "/catalogue", label: "Vehicle catalogue" },
            { to: "/compare", label: "Comparison engine" },
            { to: "/map", label: "Charging map" },
          ]}
        />
        <FooterCol
          title="Tools"
          items={[
            { to: "/tools", label: "Import cost calculator" },
            { to: "/tools", label: "Installment plans" },
            { to: "/tools", label: "Resale estimator" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { to: "/about", label: "About us" },
            { to: "/about", label: "Contact" },
            { to: "/reviews", label: "Community reviews" },
            { to: "/assistant", label: "AI assistant" },
          ]}
        />
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/60 sm:px-8">
        © {new Date().getFullYear()} EVNexus. All figures are estimates for guidance only.
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-accent">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="text-sm text-white/75 transition hover:text-white">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
