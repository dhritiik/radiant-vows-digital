"use client";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  palette: { h: string; bg: string; border: string };
  demo?: React.ReactNode;
}

export default function FeatureCard({ icon: Icon, title, description, palette, demo }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group cursor-default"
      style={{ willChange: "transform" }}
    >
      {/* Card body */}
      <div
        className="relative rounded-2xl p-5 overflow-hidden h-full flex flex-col transition-shadow duration-300"
        style={{
          background: "hsl(var(--card) / 0.95)",
          border: `1.5px solid ${palette.border}`,
          boxShadow: "0 4px 20px -8px hsl(25, 30%, 10% / 0.06)",
        }}
      >
        {/* Subtle corner glow */}
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-12 translate-x-12 opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
          style={{ background: palette.h, filter: "blur(22px)" }}
        />

        {/* Icon */}
        <div className="mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ background: palette.bg, border: `1.5px solid ${palette.border}` }}
          >
            <Icon className="w-5 h-5" style={{ color: palette.h }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className="font-display text-lg font-bold mb-2 leading-snug"
            style={{ color: "hsl(25, 45%, 15%)" }}
          >
            {title}
          </h3>
          <p
            className="font-sans text-xs leading-relaxed"
            style={{ color: "hsl(25, 10%, 48%)" }}
          >
            {description}
          </p>
        </div>

        {/* Live demo strip */}
        {demo && (
          <div
            className="mt-5 pt-4"
            style={{ borderTop: `1px solid ${palette.border}` }}
          >
            {demo}
          </div>
        )}

        {/* Bottom accent bar on hover */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
          style={{ background: palette.h }}
        />
      </div>
    </motion.div>
  );
}
