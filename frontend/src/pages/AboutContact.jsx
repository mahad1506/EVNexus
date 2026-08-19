import { useState } from "react";

import { motion } from "framer-motion";
import { Building2, Leaf, Mail, MapPin, Phone, Target, Users } from "lucide-react";
import { toast } from "sonner";
import {
  GlassCard,
  Reveal,
  Section,
  SectionHeading,
  StaggerGrid,
  StaggerItem,
  Stat,
  Field,
  inputClass,
  btnPrimary,
} from "@/components/Primitives.jsx";


const values = [
  {
    icon: Target,
    title: "Data over hype",
    body: "Every figure on EVNexus is sourced, dated and shown with its assumptions so you can sanity-check it.",
  },
  {
    icon: Users,
    title: "Buyer-first",
    body: "We never rank vehicles by commission. Dealer listings are labelled and separated from editorial data.",
  },
  {
    icon: Leaf,
    title: "Built for the transition",
    body: "Our tools model the full ownership picture — import duty, charging, depreciation, not just sticker price.",
  },
];

function AboutContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "General", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    if (!name || name.length > 100) return toast.error("Please enter your name (max 100 characters).");
    if (!emailOk || email.length > 255) return toast.error("Please enter a valid email address.");
    if (message.length < 10 || message.length > 1000)
      return toast.error("Your message must be between 10 and 1000 characters.");

    setSent(true);
    setForm({ name: "", email: "", topic: "General", message: "" });
    toast.success("Message received — our team replies within one business day.");
  };

  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="About us"
          title="We make going electric a numbers decision"
          subtitle="EVNexus started in 2023 when a group of engineers and analysts got tired of guessing what an EV would really cost to own."
        />

        <Reveal className="mt-12" y={36}>
          <div className="glass-panel rounded-4xl px-6 py-12 sm:px-12">
            <div className="grid gap-8 sm:grid-cols-3">
              <Stat value="120k+" label="Monthly researchers" />
              <Stat value="40+" label="Models tracked" />
              <Stat value="18" label="Markets covered" />
            </div>
          </div>
        </Reveal>

        <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <StaggerItem key={v.title} className="h-full">
              <GlassCard hover className="h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Section>

      <Section id="contact" className="pt-4">
        <SectionHeading
          eyebrow="Contact us"
          title="Talk to a real EV advisor"
          subtitle="Questions about a model, an import quote or a finance plan? Send a note and we'll come back with numbers."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid content-start gap-4"
          >
            <ContactRow icon={Mail} label="Email" value="hello@evnexus.app" />
            <ContactRow icon={Phone} label="Phone" value="+1 555 0100 (Mon-Fri, 9-18)" />
            <ContactRow icon={MapPin} label="Studio" value="14 Voltage Boulevard, Harbour District" />
            <ContactRow icon={Building2} label="Partnerships" value="partners@evnexus.app" />
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input
                  className={inputClass}
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Email">
                <input
                  className={inputClass}
                  type="email"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Topic">
                <select
                  className={inputClass}
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                >
                  {["General", "Vehicle advice", "Import & customs", "Financing", "Partnership"].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message" hint={`${form.message.length}/1000 characters`}>
                <textarea
                  className={`${inputClass} min-h-32 resize-y`}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you're trying to work out..."
                />
              </Field>
            </div>
            <button type="submit" className={`${btnPrimary} mt-5 w-full`}>
              Send message
            </button>
            {sent ? (
              <p className="mt-3 text-center text-sm font-semibold text-secondary-foreground">
                Thanks — we'll reply within one business day.
              </p>
            ) : null}
          </motion.form>
        </div>
      </Section>
    </>
  );
}

function ContactRow({ icon: Icon, label, value }) {
  return (
    <GlassCard className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="block truncate font-bold text-foreground">{value}</span>
      </span>
    </GlassCard>
  );
}

export default AboutContactPage;