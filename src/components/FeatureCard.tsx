"use client";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { useRef } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  palette: { h: string; bg: string; border: string };
  demo?: React.ReactNode;
}

export default function FeatureCard({ icon: Icon, title, description, index, palette, demo }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group cursor-default"
      style={{ willChange: "transform" }}
    >
      {/* Glowing border effect — opacity-only transition (GPU-cheap, no blur) */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: palette.h }}
      />

      {/* Card body */}
      <div className="relative rounded-2xl p-6 md:p-7 overflow-hidden h-full flex flex-col"
        style={{
          background: "hsl(var(--card) / 0.95)",
          border: `1.5px solid ${palette.border}`,
          boxShadow: "0 10px 40px -10px hsl(25, 30%, 10% / 0.05)",
        }}
      >
        {/* Accent corner glow */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          style={{ background: palette.h, filter: "blur(30px)" }}
        />

        {/* Icon */}
        <div className="relative mb-5 flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm"
            style={{ background: palette.bg, border: `1.5px solid ${palette.border}` }}
          >
            <Icon className="w-7 h-7" style={{ color: palette.h }} />
          </div>

          {/* Index number watermark */}
          <div
            className="absolute -top-1 -right-1 font-sans text-5xl font-black opacity-[0.03] group-hover:opacity-10 transition-opacity select-none leading-none"
            style={{ color: palette.h }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display text-xl md:text-2xl font-bold mb-3 leading-tight"
            style={{ color: "hsl(25, 45%, 15%)" }}
          >
            {title}
          </h3>
          <p className="font-body leading-relaxed text-sm md:text-base font-medium"
            style={{ color: "hsl(25, 15%, 35%)" }}
          >
            {description}
          </p>
        </div>

        {/* Live demo strip */}
        {demo && (
          <div className="mt-6 pt-5"
            style={{ borderTop: `1px solid ${palette.border}` }}
          >
            {demo}
          </div>
        )}

        {/* Bottom slide-in accent bar */}
        <div
          className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 rounded-full"
          style={{ background: palette.h }}
        />
      </div>
    </motion.div>
  );
}

