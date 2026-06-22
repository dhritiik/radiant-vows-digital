"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Users, Music, Filter, Link, Sparkles,
  CheckCircle2, Play, Pause
} from "lucide-react";
import FeatureCard from "./FeatureCard";

/* ─── Brand palette: 3 warm tones only ─────────────────────────────────────
   All accent colors stay within the brand's red / rose / amber family.
   No more competing blues, greens, or purples. */
const BRAND = {
  crimson: { h: "hsl(0, 78%, 50%)",   bg: "hsl(0, 78%, 50% / 0.07)",   border: "hsl(0, 78%, 50% / 0.18)" },
  rose:    { h: "hsl(347, 70%, 56%)", bg: "hsl(347, 70%, 56% / 0.07)", border: "hsl(347, 70%, 56% / 0.18)" },
  amber:   { h: "hsl(38, 65%, 48%)",  bg: "hsl(38, 65%, 48% / 0.07)",  border: "hsl(38, 65%, 48% / 0.18)" },
};

/* ─── Live Demo: guest name cycles ─── */
const GUEST_NAMES = [
  "Smt. Anita R. Shah",
  "Shri Ramesh K. Patel",
  "Priya & Rahul Mehta",
  "Mrs. Ananya Sharma",
];

const EVENTS = ["Birthday", "Anniversary", "Wedding", "Gala"];

const EVENT_CHIPS: Record<string, { color: string; bg: string }> = {
  Birthday:    { color: "hsl(347, 70%, 56%)", bg: "hsl(347, 70%, 56% / 0.12)" },
  Anniversary: { color: "hsl(0, 78%, 50%)",   bg: "hsl(0, 78%, 50% / 0.10)"  },
  Wedding:     { color: "hsl(38, 65%, 46%)",  bg: "hsl(38, 65%, 46% / 0.12)" },
  Gala:        { color: "hsl(347, 55%, 52%)", bg: "hsl(347, 55%, 52% / 0.10)" },
};

/* ─── Demo: Personalization ─── */
function LivePersonalizationDemo() {
  const [nameIdx, setNameIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setNameIdx((i) => (i + 1) % GUEST_NAMES.length), 2000);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "hsl(0, 20%, 97%)", border: "1.5px solid hsl(0, 78%, 50% / 0.22)" }}
    >
      <div
        className="px-3 py-2 flex items-center justify-between"
        style={{ background: "hsl(0, 78%, 50% / 0.07)", borderBottom: "1px solid hsl(0, 78%, 50% / 0.14)" }}
      >
        <span className="font-sans text-xs font-semibold tracking-widest uppercase"
          style={{ color: "hsl(0, 78%, 40%)" }}>Live Preview</span>
        <button
          onClick={() => setPlaying(p => !p)}
          className="w-5 h-5 flex items-center justify-center rounded hover:opacity-70 transition-opacity"
          style={{ color: "hsl(0, 78%, 42%)" }}
        >
          {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>
      <div className="px-4 pt-3 pb-4">
        <p className="font-sans text-xs mb-1" style={{ color: "hsl(25, 20%, 52%)" }}>Welcome,</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={nameIdx}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="font-display text-sm font-bold"
            style={{ color: "hsl(0, 75%, 44%)" }}
          >
            {GUEST_NAMES[nameIdx]}
          </motion.p>
        </AnimatePresence>
        <p className="font-sans text-xs mt-1" style={{ color: "hsl(25, 15%, 56%)" }}>
          Your personalised invitation awaits ✨
        </p>
      </div>
    </div>
  );
}

/* ─── Demo: Event Filter ─── */
function EventFilterDemo() {
  const [selected, setSelected] = useState<string[]>(["Wedding", "Gala"]);
  const toggle = (ev: string) =>
    setSelected(s => s.includes(ev) ? s.filter(e => e !== ev) : [...s, ev]);

  return (
    <div>
      <p
        className="font-sans text-xs font-semibold uppercase tracking-widest mb-2.5"
        style={{ color: "hsl(347, 50%, 44%)" }}
      >
        Guest sees only:
      </p>
      <div className="flex flex-wrap gap-2">
        {EVENTS.map(ev => {
          const active = selected.includes(ev);
          const chip = EVENT_CHIPS[ev];
          return (
            <button
              key={ev}
              onClick={() => toggle(ev)}
              className="font-sans text-xs px-3 py-1 rounded-full font-medium transition-all duration-200"
              style={{
                background: active ? chip.bg : "hsl(25, 12%, 94%)",
                border: `1.5px solid ${active ? chip.color : "hsl(25, 8%, 84%)"}`,
                color: active ? chip.color : "hsl(25, 8%, 58%)",
              }}
            >
              {ev}
            </button>
          );
        })}
      </div>
      <p className="font-sans text-xs mt-2" style={{ color: "hsl(25, 12%, 56%)" }}>
        {selected.length === 0 ? "Tap to show events" : `${selected.length} of ${EVENTS.length} events shown`}
      </p>
    </div>
  );
}

/* ─── Demo: Guest Counts ─── */
function GuestCountDemo() {
  const rows = [
    { name: "Smt. Anita Shah", count: "Family", event: "Wedding", ci: 2 },
    { name: "Shri Ramesh Patel", count: "2",      event: "Gala",    ci: 3 },
    { name: "Ms. Priya Mehta", count: "1",     event: "Anniv.",  ci: 1 },
  ];
  const cols = Object.values(EVENT_CHIPS);
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 + 0.3 }}
          className="flex items-center justify-between rounded-lg px-3 py-1.5"
          style={{ background: cols[r.ci].bg, border: `1px solid ${cols[r.ci].color}44` }}
        >
          <span className="font-sans text-xs font-medium truncate max-w-[100px]"
            style={{ color: "hsl(25, 30%, 20%)" }}>{r.name}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="font-sans text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: cols[r.ci].color + "22", color: cols[r.ci].color }}
            >
              {r.count}
            </span>
            <span className="font-sans text-xs" style={{ color: "hsl(25, 15%, 52%)" }}>{r.event}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Demo: Unique Link ─── */
function UniqueLinkDemo() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div
      className="flex items-center gap-2 rounded-xl px-3 py-2.5 cursor-pointer group/link"
      onClick={handleCopy}
      style={{ background: "hsl(38, 50%, 96%)", border: "1.5px solid hsl(38, 65%, 48% / 0.30)" }}
    >
      <Link className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(38, 65%, 42%)" }} />
      <span
        className="font-sans text-xs flex-1 truncate font-medium"
        style={{ color: "hsl(38, 40%, 34%)" }}
      >
        invite.io/?name=Guest&events=customized
      </span>
      <AnimatePresence mode="wait">
        {copied
          ? <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "hsl(38, 65%, 42%)" }} />
            </motion.span>
          : <motion.span
              key="tap"
              className="font-sans text-[10px] font-semibold opacity-50 group-hover/link:opacity-100 flex-shrink-0 transition-opacity"
              style={{ color: "hsl(38, 65%, 42%)" }}
            >
              copy
            </motion.span>
        }
      </AnimatePresence>
    </div>
  );
}

/* ─── Feature config ─── */
const featureConfigs = [
  {
    icon: User,
    title: "Personalized Guest Names",
    description: "Every guest sees their own name the moment they open it — that instant 'wow' costs nothing extra.",
    palette: BRAND.crimson,
    renderDemo: () => <LivePersonalizationDemo />,
  },
  {
    icon: Filter,
    title: "Smart Event Filtering",
    description: "Coworkers get the reception link; family gets everything — zero awkward conversations.",
    palette: BRAND.rose,
    renderDemo: () => <EventFilterDemo />,
  },
  {
    icon: Users,
    title: "Clear Guest Counts",
    description: "Each invite quietly specifies how many seats are reserved — per event, per family.",
    palette: BRAND.amber,
    renderDemo: () => <GuestCountDemo />,
  },
  {
    icon: Link,
    title: "Unique Links for Everyone",
    description: "Your spreadsheet becomes individual WhatsApp-ready links — no app, no password, no friction.",
    palette: BRAND.crimson,
    renderDemo: () => <UniqueLinkDemo />,
  },
  {
    icon: Music,
    title: "Custom Music & Animations",
    description: "Your chosen track plays on open, with petals falling or lights glowing — paper can't do that.",
    palette: BRAND.rose,
  },
  {
    icon: Sparkles,
    title: "Zero-Stress Setup",
    description: "Send us your list and photos; we handle the coding and personalization. You just forward links.",
    palette: BRAND.amber,
  },
];

/* ─── Section header: 2-column asymmetric ─── */
function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }} viewport={{ once: true }}
      className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-16 mb-10"
    >
      <div>
        <span
          className="font-sans text-xs tracking-[0.35em] uppercase mb-3 block font-semibold"
          style={{ color: "hsl(0, 78%, 50%)" }}
        >
          Why Hosts Choose Us
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Not Just an Invite.{" "}
          <span style={{
            background: "linear-gradient(135deg, hsl(0,85%,50%), hsl(347,78%,60%))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            An Experience.
          </span>
        </h2>
      </div>
      <p
        className="font-sans text-sm leading-relaxed lg:text-right lg:max-w-[260px] flex-shrink-0"
        style={{ color: "hsl(25, 12%, 50%)" }}
      >
        The world's first smart invitation platform that knows your guest's name, their events, and their seat count — before they even ask.
      </p>
    </motion.div>
  );
}

/* ─── Main export ─── */
export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-10 sm:py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
      {/* Ambient decorations — toned down, same family */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl opacity-[0.04]"
          style={{ background: "hsl(0,78%,50%)" }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full blur-3xl opacity-[0.04]"
          style={{ background: "hsl(347,70%,56%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {featureConfigs.map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
              index={i}
              palette={f.palette}
              demo={f.renderDemo ? f.renderDemo() : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
