import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  Bot,
  Car,
  MapPin,
  Scale,
  Sparkle,
  Star,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/assets/hero-ev.jpg";
import { vehicles } from "@/data/vehicles";
import VehicleCard from "@/components/VehicleCard.jsx";
import {
  GlassCard,
  Reveal,
  Section,
  SectionHeading,
  StaggerGrid,
  StaggerItem,
  Stat,
  btnPrimary,
  btnSecondary,
} from "@/components/Primitives.jsx";


const features = [
  {
    icon: Scale,
    title: "Comparison engine",
    body: "Line up to four EVs side by side across 10 specs with best-in-class highlighting.",
    to: "/compare",
  },
  {
    icon: MapPin,
    title: "Chargers & dealers",
    body: "Interactive map of fast-charging hubs and authorised showrooms near you.",
    to: "/map",
  },
  {
    icon: TrendingUp,
    title: "Resale estimator",
    body: "Project depreciation from model, age, mileage and condition in seconds.",
    to: "/tools",
  },
  {
    icon: BadgeDollarSign,
    title: "Finance suite",
    body: "Import duty modelling plus installment plans across three financing profiles.",
    to: "/tools",
  },
  {
    icon: Bot,
    title: "AI assistant",
    body: "Ask anything about range, batteries, tax credits or charging standards.",
    to: "/assistant",
  },
  {
    icon: Star,
    title: "Community reviews",
    body: "Real ownership reports with ratings you can filter and contribute to.",
    to: "/reviews",
  },
];

function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <section ref={heroRef} className="relative isolate overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Electric sedan driving along a coastal highway at dawn"
          width={1920}
          height={1088}
          style={{ y: imageY }}
          className="absolute inset-0 h-[115%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#011c40]/85 via-[#023859]/60 to-[#54acbf]/35" />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur"
          >
            <Sparkle className="h-3.5 w-3.5" /> The complete EV platform
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl"
          >
            Go electric with
            <span className="block text-[#a7ebf2]">total confidence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base text-white/85 sm:text-lg"
          >
            Compare every model, map your charging, forecast resale value and build a financing plan — all in one
            place, built for buyers who want the numbers, not the hype.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link to="/catalogue" className={btnPrimary}>
              Browse vehicles <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/assistant" className={btnSecondary}>
              Ask the AI assistant
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { value: "40+", label: "EV models" },
              { value: "1.2k", label: "Charge points" },
              { value: "9", label: "Planning tools" },
              { value: "4.7★", label: "Owner rating" },
            ].map((s) => (
              <div key={s.label} className="glass-dark rounded-2xl px-4 py-4 text-center">
                <div className="text-2xl font-extrabold text-[#a7ebf2]">{s.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Everything in one place"
          title="A full toolkit for your EV decision"
          subtitle="Six connected modules that take you from curiosity to keys in hand."
        />
        <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <Link to={f.to} className="block h-full">
                <GlassCard hover className="h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </GlassCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Section>

      <Section className="pt-0">
        <div className="glass-panel rounded-4xl px-6 py-12 sm:px-12">
          <div className="grid gap-8 sm:grid-cols-3">
            <Stat value="512 km" label="Longest range in catalogue" />
            <Stat value="2.3 s" label="Quickest 0-100 km/h" />
            <Stat value="$27.9k" label="Most affordable EV" />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-3xl font-extrabold text-foreground">Featured electric vehicles</h2>
            <p className="mt-2 text-sm text-muted-foreground">Hand-picked models across every segment.</p>
          </div>
          <Link to="/catalogue" className="shrink-0 text-sm font-semibold text-primary">
            View all →
          </Link>
        </div>
        <StaggerGrid className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.slice(0, 3).map((v) => (
            <StaggerItem key={v.id} className="h-full">
              <VehicleCard vehicle={v} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-background-accent px-6 py-14 text-center sm:px-12">
            <div className="absolute inset-0 opacity-60 [background:radial-gradient(30rem_20rem_at_15%_0%,#26658c,transparent),radial-gradient(28rem_18rem_at_90%_100%,#54acbf,transparent)]" />
            <div className="relative">
              <Car className="mx-auto h-10 w-10 text-accent" />
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                Ready to find your electric match?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">
                Start with the catalogue, or let the AI assistant narrow it down from your budget and daily drive.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/catalogue" className={btnSecondary}>
                  Explore the catalogue
                </Link>
                <Link
                  to="/tools"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Run the finance tools
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

export default HomePage;
