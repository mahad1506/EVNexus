import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading } from "@/components/Primitives.jsx";
import ResaleEstimator from "@/components/tools/ResaleEstimator.jsx";
import ImportCostCalculator from "@/components/tools/ImportCostCalculator.jsx";
import InstallmentPlanner from "@/components/tools/InstallmentPlanner.jsx";


const tabs = [
  { key: "installments", label: "Installment plans", Component: InstallmentPlanner },
  { key: "import", label: "Import cost", Component: ImportCostCalculator },
  { key: "resale", label: "Resale value", Component: ResaleEstimator },
];

function ToolsPage() {
  const [tab, setTab] = useState("installments");
  const Active = tabs.find((t) => t.key === tab).Component;

  return (
    <Section>
      <SectionHeading
        eyebrow="Financial planning suite"
        title="Run the numbers before you sign"
        subtitle="Three connected calculators covering financing, importation and long-term value."
      />

      <div className="mt-10 flex flex-wrap gap-2 rounded-full glass p-2 sm:w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              tab === t.key ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {tab === t.key ? (
              <motion.span
                layoutId="tools-tab"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />
            ) : null}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <Active />
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

export default ToolsPage;
