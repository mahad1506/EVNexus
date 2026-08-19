import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/catalogue", label: "Vehicles" },
  { to: "/compare", label: "Compare" },
  { to: "/map", label: "Charging & Dealers" },
  { to: "/tools", label: "Finance Tools" },
  { to: "/reviews", label: "Reviews" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/about", label: "About & Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-x-0 border-t-0">
        <nav className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </span>
            <span className="truncate text-lg font-extrabold tracking-tight text-foreground">EVNexus</span>
          </Link>

          <div className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-accent/50 hover:text-foreground ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              >
                {l.label}
              </NavLink>
            ))}
            <span className="ml-2">
              <ThemeToggle />
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card/70 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>


        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="grid gap-1 px-5 pb-4 sm:px-8">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    end={l.to === "/"}
                    className={({ isActive }) => `rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? "bg-accent text-accent-foreground" : "text-foreground/80"}`}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
