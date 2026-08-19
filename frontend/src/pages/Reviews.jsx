import { useMemo, useState } from "react";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { vehicles } from "@/data/vehicles";
import { seedReviews } from "@/data/reviews";
import {
  GlassCard,
  Section,
  SectionHeading,
  StaggerGrid,
  StaggerItem,
  Field,
  inputClass,
  btnPrimary,
  btnGhost,
} from "@/components/Primitives.jsx";


function Stars({ value, onChange, size = "h-4 w-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        const star = (
          <Star className={`${size} ${filled ? "fill-[#54acbf] text-[#54acbf]" : "text-muted-foreground"}`} />
        );
        return onChange ? (
          <button key={n} type="button" aria-label={`${n} stars`} onClick={() => onChange(n)}>
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        );
      })}
    </div>
  );
}

function ReviewsPage() {
  const [reviews, setReviews] = useState(seedReviews);
  const [filterVehicle, setFilterVehicle] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [form, setForm] = useState({
    author: "",
    vehicle: vehicles[0].name,
    rating: 5,
    title: "",
    body: "",
  });

  const filtered = useMemo(
    () =>
      reviews.filter(
        (r) => (filterVehicle === "all" || r.vehicle === filterVehicle) && r.rating >= minRating,
      ),
    [reviews, filterVehicle, minRating],
  );

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  const submit = (e) => {
    e.preventDefault();
    const author = form.author.trim();
    const title = form.title.trim();
    const body = form.body.trim();
    if (!author || author.length > 60) return toast.error("Please enter your name (max 60 characters).");
    if (!title || title.length > 90) return toast.error("Please add a short title (max 90 characters).");
    if (body.length < 20 || body.length > 1000)
      return toast.error("Reviews must be between 20 and 1000 characters.");

    setReviews((prev) => [
      {
        id: `local-${Date.now()}`,
        author,
        vehicle: form.vehicle,
        rating: form.rating,
        title,
        body,
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setForm({ author: "", vehicle: vehicles[0].name, rating: 5, title: "", body: "" });
    toast.success("Thanks! Your review is now live in the community feed.");
  };

  return (
    <Section>
      <SectionHeading
        eyebrow="Community"
        title="Owner reviews you can trust"
        subtitle={`${reviews.length} reviews · ${average} average rating across the EVNexus community.`}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <GlassCard className="p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Vehicle">
                <select
                  className={inputClass}
                  value={filterVehicle}
                  onChange={(e) => setFilterVehicle(e.target.value)}
                >
                  <option value="all">All vehicles</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={`Minimum rating: ${minRating || "any"}`}>
                <div className="flex items-center gap-3">
                  <Stars value={minRating} onChange={setMinRating} size="h-5 w-5" />
                  <button type="button" onClick={() => setMinRating(0)} className={btnGhost}>
                    Clear
                  </button>
                </div>
              </Field>
            </div>
          </GlassCard>

          {filtered.length ? (
            <StaggerGrid className="mt-6 grid gap-4">
              {filtered.map((r) => (
                <StaggerItem key={r.id}>
                  <GlassCard hover className="p-5">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold text-foreground">{r.title}</h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                          {r.vehicle} · {r.author} · {r.date}
                        </p>
                      </div>
                      <Stars value={r.rating} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          ) : (
            <GlassCard className="mt-6 p-10 text-center text-sm text-muted-foreground">
              No reviews match those filters yet.
            </GlassCard>
          )}
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass h-fit rounded-3xl p-6 lg:sticky lg:top-24"
        >
          <h3 className="text-lg font-extrabold text-foreground">Write a review</h3>
          <p className="mt-1 text-sm text-muted-foreground">Help the next buyer with your real-world numbers.</p>

          <div className="mt-5 grid gap-4">
            <Field label="Your name">
              <input
                className={inputClass}
                maxLength={60}
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="e.g. Alex M."
              />
            </Field>
            <Field label="Vehicle">
              <select
                className={inputClass}
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.brand} {v.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Rating">
              <Stars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} size="h-6 w-6" />
            </Field>
            <Field label="Title">
              <input
                className={inputClass}
                maxLength={90}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Summarise your ownership"
              />
            </Field>
            <Field label="Your review" hint={`${form.body.length}/1000 characters`}>
              <textarea
                className={`${inputClass} min-h-28 resize-y`}
                maxLength={1000}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Range in real conditions, charging experience, build quality..."
              />
            </Field>
            <button type="submit" className={btnPrimary}>
              Publish review
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

export default ReviewsPage;
