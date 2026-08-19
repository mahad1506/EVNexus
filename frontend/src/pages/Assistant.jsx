import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Zap } from "lucide-react";
import { GlassCard, Section, SectionHeading } from "@/components/Primitives.jsx";


const suggestions = [
  "Which EV suits a 60 km daily commute on a $45k budget?",
  "How fast does a 250 kW charger fill an 80 kWh battery?",
  "What affects EV battery degradation the most?",
  "Should I lease or finance my first EV?",
];

const greeting = {
  role: "assistant",
  content:
    "Hi, I'm Nexi — your EVNexus assistant. Ask me about range, charging, running costs, incentives or financing, and I'll give you the practical numbers.",
};

function AssistantPage() {
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!loading) textareaRef.current?.focus();
  }, [loading]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== greeting) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "The assistant is unavailable right now.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <SectionHeading
        eyebrow="AI assistant"
        title="Meet Nexi, your EV expert"
        subtitle="Real answers on range, charging, costs and ownership — no showroom pressure."
      />

      <GlassCard className="mx-auto mt-10 flex max-w-3xl flex-col overflow-hidden p-0">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border bg-card/60 px-5 py-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Zap className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-extrabold text-foreground">Nexi</span>
            <span className="block text-xs text-muted-foreground">EVNexus AI assistant · online</span>
          </span>
        </div>

        <div ref={scrollRef} className="max-h-[52vh] min-h-[320px] space-y-5 overflow-y-auto px-5 py-6">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={`${i}-${m.role}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                {m.role === "user" ? (
                  <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {m.content}
                  </p>
                ) : (
                  <div className="max-w-[92%] space-y-2 text-sm leading-relaxed text-foreground">
                    {m.content
                      .split("\n")
                      .filter(Boolean)
                      .map((line, idx) => {
                        const clean = line.replace(/\*\*/g, "").trim();
                        if (/^#{1,6}\s/.test(clean)) {
                          return (
                            <p key={idx} className="pt-1 font-bold text-foreground">
                              {clean.replace(/^#{1,6}\s*/, "")}
                            </p>
                          );
                        }
                        return <p key={idx}>{clean.replace(/^[*-]\s*/, "• ")}</p>;
                      })}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="text-sm font-semibold text-muted-foreground"
            >
              Nexi is thinking...
            </motion.p>
          ) : null}

          {error ? (
            <p className="rounded-xl bg-destructive/10 px-4 py-2.5 text-sm font-semibold text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        {messages.length <= 1 ? (
          <div className="flex flex-wrap gap-2 px-5 pb-4">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-semibold text-foreground/80 transition hover:bg-accent/50"
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-border bg-card/60 p-4"
        >
          <div className="flex items-end gap-3">
            <textarea
              ref={textareaRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask about range, charging, costs, incentives..."
              className="min-h-[52px] flex-1 resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-ring/40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </GlassCard>
    </Section>
  );
}

export default AssistantPage;