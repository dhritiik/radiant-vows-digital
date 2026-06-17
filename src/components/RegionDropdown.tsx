"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRegion, REGIONS, type Region } from "@/contexts/RegionContext";

const regionsList: Region[] = ["IN", "EU", "US", "AU"];

export default function RegionDropdown() {
  const { region, setRegion, config } = useRegion();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectRegion = (newRegion: Region) => {
    setRegion(newRegion);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300"
        style={{
          background: "hsl(var(--card) / 0.5)",
          border: `1px solid hsl(var(--gold) / 0.25)`,
          color: "hsl(var(--foreground))",
        }}
      >
        <span className="font-sans text-xs font-semibold">{config.name}</span>
        <span className="text-xs opacity-70">({region})</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 rounded-2xl overflow-hidden shadow-xl z-50"
            style={{
              background: "hsl(var(--card) / 0.95)",
              backdropFilter: "blur(28px)",
              border: "1px solid hsl(var(--gold) / 0.25)",
            }}
          >
            <div className="p-1.5 flex flex-col gap-1">
              {regionsList.map((r) => {
                const isSelected = r === region;
                const regionConfig = REGIONS[r];
                return (
                  <motion.button
                    key={r}
                    onClick={() => handleSelectRegion(r)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between px-4 py-3 rounded-lg transition-all text-left"
                    style={{
                      background: isSelected ? "hsl(var(--gold) / 0.15)" : "transparent",
                      color: isSelected ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    <div>
                      <div className="font-sans text-sm font-semibold">
                        {regionConfig.name}
                      </div>
                      <div className="font-sans text-xs opacity-60">
                        {regionConfig.currency}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--gold))" }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
