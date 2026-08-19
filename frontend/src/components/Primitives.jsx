import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Scroll-triggered reveal wrapper used across every page. */
export function Reveal({ children, delay = 0, y = 28, className, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/** Animated grid whose children fade/slide in sequence when scrolled into view. */
export function StaggerGrid({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

export function GlassCard({ children, className, hover = false, ...rest }) {
  return (
    <div
      className={cn(
        "glass rounded-3xl",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Section({ children, className, id }) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base text-muted-foreground">{subtitle}</p> : null}
    </Reveal>
  );
}

export function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-extrabold text-gradient sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-border bg-card/80 px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-secondary focus:ring-2 focus:ring-ring/40";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 active:scale-[0.98]";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition hover:brightness-105 active:scale-[0.98]";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent/50";
