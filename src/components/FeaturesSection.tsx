import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Users, Music, Filter, Link, Sparkles,
  CheckCircle2, ChevronRight, Play, Pause
} from "lucide-react";
import FeatureCard from "./FeatureCard";

/* ─── Vibrant palette (color theory: gold anchor + split-complementary + triadic) ───
   Gold:    HSL(40,  90%, 58%)  — warm anchor
   Azure:   HSL(210, 82%, 60%)  — split-complement (blue)
   Rose:    HSL(340, 78%, 62%)  — split-complement (pink)
   Emerald: HSL(152, 70%, 44%)  — triadic green
   Purple:  HSL(270, 68%, 62%)  — triadic violet
   Coral:   HSL(16,  88%, 60%)  — analogous warm
*/
const PALETTE = {
  gold: { h: "hsl(40,  90%, 58%)", bg: "hsl(40,  90%, 58% / 0.12)", border: "hsl(40,  90%, 58% / 0.35)" },
  azure: { h: "hsl(210, 82%, 62%)", bg: "hsl(210, 82%, 62% / 0.12)", border: "hsl(210, 82%, 62% / 0.35)" },
  rose: { h: "hsl(340, 78%, 64%)", bg: "hsl(340, 78%, 64% / 0.12)", border: "hsl(340, 78%, 64% / 0.35)" },
  emerald: { h: "hsl(152, 70%, 44%)", bg: "hsl(152, 70%, 44% / 0.12)", border: "hsl(152, 70%, 44% / 0.35)" },
  purple: { h: "hsl(270, 68%, 64%)", bg: "hsl(270, 68%, 64% / 0.12)", border: "hsl(270, 68%, 64% / 0.35)" },
  coral: { h: "hsl(16,  88%, 60%)", bg: "hsl(16,  88%, 60% / 0.12)", border: "hsl(16,  88%, 60% / 0.35)" },
};

/* ─── Live Demo: guest name cycles ─── */
const GUEST_NAMES = [
  "Smt. Kokilaben L. Vora",
  "Shri Dilipbhai Vora",
  "Priya & Rahul Mehta",
  "Mrs. Ananya Sharma",
];

const EVENTS = ["Birthday", "Anniversary", "Wedding", "Gala"];

const EVENT_CHIPS: Record<string, { color: string; bg: string }> = {
  Birthday: { color: "hsl(20,  85%, 55%)", bg: "hsl(20,  85%, 55% / 0.15)" },
  Anniversary: { color: "hsl(330,  75%, 65%)", bg: "hsl(330,  75%, 65% / 0.15)" },
  Wedding: { color: "hsl(40,  90%, 45%)", bg: "hsl(40,  90%, 58% / 0.15)" },
  Gala: { color: "hsl(180,  40%, 45%)", bg: "hsl(180,  40%, 45% / 0.15)" },
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
    <div className="rounded-xl overflow-hidden"
      style={{ background: "hsl(40, 30%, 96%)", border: "1.5px solid hsl(40, 90%, 58% / 0.4)" }}
    >
      <div className="px-3 py-2 flex items-center justify-between"
        style={{ background: "hsl(40, 90%, 58% / 0.1)", borderBottom: "1px solid hsl(40, 90%, 58% / 0.2)" }}
      >
        <span className="font-sans text-xs font-semibold tracking-widest uppercase"
          style={{ color: "hsl(40, 80%, 38%)" }}>Live Preview</span>
        <button onClick={() => setPlaying(p => !p)}
          className="w-5 h-5 flex items-center justify-center rounded hover:opacity-70 transition-opacity"
          style={{ color: "hsl(40, 80%, 40%)" }}>
          {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>
      <div className="px-4 pt-3 pb-4">
        <p className="font-sans text-xs mb-1" style={{ color: "hsl(25, 20%, 50%)" }}>Welcome,</p>
        <AnimatePresence mode="wait">
          <motion.p key={nameIdx}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="font-display text-sm font-bold"
            style={{ color: "hsl(40, 75%, 35%)" }}
          >
            {GUEST_NAMES[nameIdx]}
          </motion.p>
        </AnimatePresence>
        <p className="font-body text-xs mt-1" style={{ color: "hsl(25, 15%, 55%)" }}>
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
      <p className="font-sans text-xs font-semibold uppercase tracking-widest mb-2.5"
        style={{ color: "hsl(210, 50%, 40%)" }}>Guest sees only:</p>
      <div className="flex flex-wrap gap-2">
        {EVENTS.map(ev => {
          const active = selected.includes(ev);
          const chip = EVENT_CHIPS[ev];
          return (
            <button key={ev} onClick={() => toggle(ev)}
              className="font-sans text-xs px-3 py-1 rounded-full font-medium transition-all duration-200"
              style={{
                background: active ? chip.bg : "hsl(210, 20%, 94%)",
                border: `1.5px solid ${active ? chip.color : "hsl(210, 15%, 82%)"}`,
                color: active ? chip.color : "hsl(210, 15%, 55%)",
              }}
            >
              {ev}
            </button>
          );
        })}
      </div>
      <p className="font-body text-xs mt-2" style={{ color: "hsl(210, 20%, 55%)" }}>
        {selected.length === 0 ? "Tap to show events" : `${selected.length} of ${EVENTS.length} events shown`}
      </p>
    </div>
  );
}

/* ─── Demo: Guest Counts ─── */
function GuestCountDemo() {
  const rows = [
    { name: "Smt. Kokilaben", count: "Family", event: "Wedding", ci: 0 },
    { name: "Shri Dilipbhai", count: "2", event: "Gala", ci: 1 },
    { name: "Ms. Priya Mehta", count: "1", event: "Anniversary", ci: 3 },
  ];
  const cols = Object.values(EVENT_CHIPS);
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <motion.div key={r.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 + 0.3 }}
          className="flex items-center justify-between rounded-lg px-3 py-1.5"
          style={{ background: cols[r.ci].bg, border: `1px solid ${cols[r.ci].color}55` }}
        >
          <span className="font-body text-xs font-medium truncate max-w-[100px]"
            style={{ color: "hsl(25, 30%, 20%)" }}>{r.name}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-sans text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: cols[r.ci].color + "22", color: cols[r.ci].color }}>
              {r.count}
            </span>
            <span className="font-sans text-xs" style={{ color: "hsl(25, 15%, 50%)" }}>{r.event}</span>
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
    <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 cursor-pointer group/link"
      onClick={handleCopy}
      style={{ background: "hsl(152, 60%, 96%)", border: "1.5px solid hsl(152, 70%, 44% / 0.45)" }}
    >
      <Link className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(152, 70%, 38%)" }} />
      <span className="font-sans text-xs flex-1 truncate font-medium" style={{ color: "hsl(152, 40%, 30%)" }}>
        invite.io/?name=Guest&events=customized
      </span>
      <AnimatePresence mode="wait">
        {copied
          ? <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "hsl(152, 70%, 38%)" }} />
          </motion.span>
          : <motion.span key="tap" className="font-sans text-[10px] font-semibold opacity-60 group-hover/link:opacity-100 flex-shrink-0 transition-opacity"
            style={{ color: "hsl(152, 70%, 38%)" }}>
            copy
          </motion.span>
        }
      </AnimatePresence>
    </div>
  );
}

/* ─── Feature config (no JSX in data — use render functions) ─── */
const featureConfigs = [
  {
    icon: User,
    title: "Personalized Guest Names",
    description: "Because 'Dear Guest' is boring. We make sure every person sees their actual name the second they open it. It immediately makes them feel valued and gives them that 'wow, I've never seen this before' feeling.",
    palette: PALETTE.gold,
    renderDemo: () => <LivePersonalizationDemo />,
  },
  {
    icon: Filter,
    title: "Smart Event Filtering",
    description: "Let's be real—you want your coworkers at the reception, but the morning pooja is strictly family-only. This completely eliminates the awkwardness. Guests only see the schedule for the events they are actually invited to.",
    palette: PALETTE.azure,
    renderDemo: () => <EventFilterDemo />,
  },
  {
    icon: Users,
    title: "Clear Guest Counts",
    description: "We all know the struggle: you invite two people, and they bring their five kids. Not anymore. The invite explicitly, yet politely, tells them exactly how many seats are reserved for their family per event.",
    palette: PALETTE.rose,
    renderDemo: () => <GuestCountDemo />,
  },
  {
    icon: Link,
    title: "Unique Links for Everyone",
    description: "No more hunting down physical mailing addresses or dealing with lost post. We turn your excel sheet into individual, private WhatsApp-ready links. No apps to download, no passwords to remember.",
    palette: PALETTE.emerald,
    renderDemo: () => <UniqueLinkDemo />,
  },
  {
    icon: Music,
    title: "Custom Music & Animations",
    description: "A piece of paper can't set a vibe. When your guests open this, your chosen track plays, and the screen reacts with falling petals or glowing lights. It builds the actual hype for your big day.",
    palette: PALETTE.purple,
  },
  {
    icon: Sparkles,
    title: "Zero-Stress Setup",
    description: "You are already stressed about catering and outfits; you shouldn't be playing tech support. Hand us your spreadsheet and photos, and we handle all the coding and personalization. You just forward the links.",
    palette: PALETTE.coral,
  },
];

/* ─── Hero Banner ─── */
function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const stats = [
    { number: "500+", label: "Personalized Invites Sent", emoji: "✉️", bg: PALETTE.gold.bg, color: PALETTE.gold.h },
    { number: "100%", label: "Personalization", emoji: "👤", bg: PALETTE.rose.bg, color: PALETTE.rose.h },
    { number: "6+", label: "Events Per Invite", emoji: "📅", bg: PALETTE.azure.bg, color: PALETTE.azure.h },
    { number: "0", label: "Tech Skills Needed", emoji: "✨", bg: PALETTE.emerald.bg, color: PALETTE.emerald.h },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % stats.length), 2500);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-12 relative rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, hsl(25, 55%, 12%) 0%, hsl(260, 30%, 14%) 50%, hsl(25, 45%, 12%) 100%)",
        border: "1px solid hsl(40, 80%, 55% / 0.3)",
        boxShadow: "0 24px 80px hsl(25, 60%, 8% / 0.5)",
      }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(40,90%,58%) 1px, transparent 1px), linear-gradient(90deg, hsl(40,90%,58%) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />
      {/* Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20 -translate-y-1/2"
        style={{ background: "hsl(40, 90%, 58%)" }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 translate-y-1/2"
        style={{ background: "hsl(270, 68%, 64%)" }} />

      <div className="relative z-10 px-6 sm:px-10 md:px-14 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* Left: headline */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="h-px w-8 opacity-50" style={{ background: "hsl(40, 90%, 58%)" }} />
              <span className="font-sans text-xs tracking-[0.3em] uppercase font-semibold"
                style={{ color: "hsl(40, 90%, 70%)" }}>India's First</span>
              <div className="h-px w-8 opacity-50" style={{ background: "hsl(40, 90%, 58%)" }} />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
              Event Invites{" "}
              <span style={{
                background: "linear-gradient(135deg, hsl(40,90%,65%), hsl(40,90%,78%))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Personalized</span>
              <br />for{" "}
              <span style={{
                background: "linear-gradient(135deg, hsl(340,78%,72%), hsl(270,68%,75%))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Every Single Guest</span>
            </h3>
            <p className="font-body text-lg leading-relaxed" style={{ color: "hsl(30, 20%, 70%)" }}>
              Not a template. Not a generic link. A completely unique experience,
              <br className="hidden md:block" /> crafted just for each person you invite.
            </p>
          </div>

          {/* Right: stat cards */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="px-5 py-4 rounded-2xl text-center"
                style={{
                  background: current === i ? s.bg : "hsl(255, 15%, 18%)",
                  border: `1px solid ${current === i ? s.color : "hsl(255, 15%, 28%)"}`,
                  transform: current === i ? "scale(1.06) translateZ(0)" : "scale(1) translateZ(0)",
                  willChange: "transform, background",
                  transition: "transform 0.3s ease, background 0.3s ease, border-color 0.3s ease",
                }}
              >
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="font-display text-2xl font-bold mb-0.5" style={{ color: s.color }}>{s.number}</div>
                <div className="font-sans text-[10px] leading-tight" style={{ color: "hsl(30, 15%, 65%)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid hsl(255, 20%, 25%)" }}
        >
          <p className="font-body text-sm" style={{ color: "hsl(30, 15%, 60%)" }}>
            👇 Click a live sample below — open your invite, see the magic
          </p>
          <a href="#samples"
            className="flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, hsl(40,90%,58%), hsl(16,88%,60%))", color: "#fff" }}>
            View Live Samples <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section header ─── */
function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }} viewport={{ once: true }}
      className="text-center mb-10"
    >
      <span className="font-sans text-xs tracking-[0.35em] uppercase mb-2 block font-semibold"
        style={{ color: "hsl(40, 80%, 45%)" }}>Why Hosts Choose Us</span>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
        Not Just an Invite.{" "}
        <span style={{
          background: "linear-gradient(135deg, hsl(40,90%,48%), hsl(16,88%,58%), hsl(340,78%,62%))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>An Experience.</span>
      </h2>
      <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(25, 15%, 42%)" }}>
        The world's first smart invitation platform that knows your guest's name,
        their events, their guest count — before they even ask.
      </p>
    </motion.div>
  );
}

/* ─── Main export ─── */
export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-10 sm:py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
      {/* Ambient decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "hsl(40,90%,58%)" }} />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "hsl(270,68%,64%)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />
        <HeroBanner />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }} viewport={{ once: true }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { text: "⚡ Works on any device", color: PALETTE.gold.h, bg: PALETTE.gold.bg, border: PALETTE.gold.border },
            { text: "🔒 Private & Secure", color: PALETTE.azure.h, bg: PALETTE.azure.bg, border: PALETTE.azure.border },
            { text: "🌐 Share anywhere", color: PALETTE.emerald.h, bg: PALETTE.emerald.bg, border: PALETTE.emerald.border },
            { text: "🎨 Fully Custom Design", color: PALETTE.purple.h, bg: PALETTE.purple.bg, border: PALETTE.purple.border },
            { text: "💬 WhatsApp Ready", color: PALETTE.coral.h, bg: PALETTE.coral.bg, border: PALETTE.coral.border },
          ].map(b => (
            <div key={b.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-semibold"
              style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.color }}
            >
              {b.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
