"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  X,
  Plus,
  Calendar,
  Music,
  Wine,
  Heart,
  ChevronDown,
  ExternalLink,
  Maximize2,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────── */

type Theme = "wedding1" | "wedding2" | "anni" | "wedding-new";

const LIVE_WEDDING_EVENTS = [
  { id: "wedding", label: "Wedding", icon: Calendar },
  { id: "mayra", label: "Mayra", icon: Heart },
  { id: "sangeet", label: "Sangeet", icon: Music },
  { id: "reception", label: "Reception", icon: Wine },
];

const EVENT_COLORS = ["#c9a96e", "#d4a0a7", "#a0b4d4", "#a0d4b4"];

const samples = [
  {
    title: "Priya Sharma",
    subtitle: "Luxury Grand Wedding",
    theme: "wedding1" as Theme,
    defaultName: "Priya Sharma",
    defaultEvents: ["wedding", "mayra", "sangeet", "reception"],
    defaultGuests: {
      wedding: "Family",
      mayra: "Family",
      sangeet: "Family",
      reception: "Family",
    },
    events: ["Wedding", "Mayra", "Sangeet", "Reception"],
    location: "Mumbai",
    color: "#c9a96e",
  },
  {
    title: "Ria Vora",
    subtitle: "Elegant Destination Wedding",
    theme: "wedding2" as Theme,
    defaultName: "Ria Vora",
    defaultEvents: ["wedding", "mayra", "sangeet", "reception"],
    defaultGuests: {
      wedding: "Family",
      mayra: "Family",
      sangeet: "Family",
      reception: "Family",
    },
    events: ["Wedding", "Mayra", "Sangeet", "Reception"],
    location: "Udaipur",
    color: "#d4a0a7",
  },
  {
    title: "Dhriti",
    subtitle: "50th Anniversary Celebration",
    theme: "anni" as Theme,
    defaultName: "Dhriti",
    defaultEvents: [],
    defaultGuests: {},
    events: ["Anniversary Celebration", "Gala Dinner"],
    location: "Gujarat",
    color: "#a0b4d4",
  },
];

/* ─── URL Builder ───────────────────────────────────────────────────── */

function buildUrl(
  theme: Theme,
  guestName: string,
  liveEvents: string[],
  liveGuestCounts: Record<string, string>
) {
  const base = "https://sj-zeta.vercel.app/";
  const p = new URLSearchParams();
  if (theme === "wedding1" || theme === "wedding2") {
    p.set("invite", theme);
    p.set("name", guestName.replace(/\s+/g, "_"));
    p.set("event", liveEvents.join(","));
    liveEvents.forEach((e) => p.set(`guests_${e}`, liveGuestCounts[e] || "Family"));
  } else {
    p.set("invite", "anni");
    p.set("name", guestName.replace(/\s+/g, "_"));
  }
  return `${base}?${p.toString()}`;
}

/* ─── Phone Mockup (Responsive Fix) ─────────────────────────────────── */

function PhoneMockup({
  url,
  color,
  width = 280,
  height = 520,
  interactive = false,
}: {
  url: string | null;
  color: string;
  width?: number;
  height?: number;
  interactive?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setCurrentUrl(url);
  }, [url]);

  // Target standard canvas size for embedded display mapping
  const iframeW = 390;
  const iframeH = 844;

  // Screen area calculation within simulated physical chassis bezel limits
  const screenW = width - 12;

  // FIX: Scale strictly by width. This mathematically forces the left and right edges 
  // of the iframe to sit flush against the device bezels, eliminating horizontal white gaps.
  const iframeScale = screenW / iframeW;

  return (
    <div
      className="relative flex-shrink-0 mx-auto select-none"
      style={{ width, height }}
    >
      {/* Phone chassis — black finish */}
      <div
        className="absolute inset-0 rounded-[3rem]"
        style={{
          background: "linear-gradient(160deg, #2a2a2a 0%, #111111 100%)",
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.55), inset 0 1px 2px rgba(255,255,255,0.12), inset 0 -1px 2px rgba(0,0,0,0.6)",
        }}
      />
      {/* Side buttons */}
      <div className="absolute left-0 top-[22%] w-[3px] h-10 rounded-l-full" style={{ background: "#3a3a3a", marginLeft: "-1px" }} />
      <div className="absolute left-0 top-[35%] w-[3px] h-8 rounded-l-full" style={{ background: "#3a3a3a", marginLeft: "-1px" }} />
      <div className="absolute left-0 top-[46%] w-[3px] h-8 rounded-l-full" style={{ background: "#3a3a3a", marginLeft: "-1px" }} />
      <div className="absolute right-0 top-[30%] w-[3px] h-14 rounded-r-full" style={{ background: "#3a3a3a", marginRight: "-1px" }} />

      {/* Screen area layout boundaries mask */}
      <div
        className="absolute rounded-[2.6rem] overflow-hidden bg-black"
        style={{ inset: "6px" }}
      >
        {/* Dynamic Island Shape Overlay */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 pointer-events-none" />

        {/* Display Panel Container Frame */}
        <div className="absolute inset-0 bg-white overflow-hidden">
          {/* Progress loader overlay layer */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#161213]"
              >
                <div
                  className="w-8 h-8 rounded-full border-[3px] animate-spin"
                  style={{
                    borderColor: `${color}30`,
                    borderTopColor: color,
                  }}
                />
                <p
                  className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold"
                  style={{ color }}
                >
                  Loading
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FIXED REALIGNMENT: 
            Uses absolute top/left 50% translation to bypass flex-box quirks. 
            This forces the container to be perfectly dead-center.
          */}
          {currentUrl && (
            <div
              className="absolute"
              style={{
                width: `${iframeW}px`,
                height: `${iframeH}px`,
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${iframeScale})`,
                transformOrigin: "center center",
              }}
            >
              <iframe
                src={currentUrl}
                title="Live invite preview"
                loading="lazy"
                onLoad={() => setLoading(false)}
                className="w-full h-full border-none bg-white"
                style={{ pointerEvents: interactive ? "auto" : "none" }}
              />
            </div>
          )}
        </div>

        {/* Operating system base home indicator handle bar */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center z-30 pointer-events-none">
          <div className="w-24 h-1 bg-white/40 rounded-full shadow-sm" />
        </div>
      </div>
    </div>
  );
}

/* ─── Modal ─────────────────────────────────────────────────────────── */

type SampleType = (typeof samples)[0];

function PreviewModal({ sample, onClose }: { sample: SampleType; onClose: () => void }) {
  const [guestName, setGuestName] = useState(sample.defaultName);
  const [liveEvents, setLiveEvents] = useState<string[]>(sample.defaultEvents);
  const [liveGuestCounts, setLiveGuestCounts] = useState<Record<string, string>>(sample.defaultGuests);
  const [isEventExpanded, setIsEventExpanded] = useState(false);
  const [debouncedUrl, setDebouncedUrl] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isWedding = sample.theme !== "anni";

  const getLiveUrl = useCallback(
    () => buildUrl(sample.theme, guestName, liveEvents, liveGuestCounts),
    [sample.theme, guestName, liveEvents, liveGuestCounts]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedUrl(getLiveUrl()), 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [getLiveUrl]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-stretch p-4 overflow-y-auto"
      style={{ backdropFilter: "blur(12px)", background: "rgba(5,5,10,0.88)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto w-full flex flex-col lg:flex-row overflow-hidden shadow-2xl"
        style={{
          maxWidth: "960px",
          maxHeight: "94vh",
          borderRadius: "28px",
          background: "hsl(var(--background))",
          border: `1px solid ${sample.color}30`,
          boxShadow: `0 40px 80px rgba(0,0,0,0.2), 0 0 0 1px ${sample.color}15`,
        }}
      >
        <div
          className="absolute top-0 inset-x-0 h-[2px] rounded-t-[28px]"
          style={{ background: `linear-gradient(90deg, transparent, ${sample.color}, transparent)` }}
        />

        {/* ── LEFT: Phone Preview ── */}
        <div
          className="flex flex-col items-center justify-center gap-6 p-6 lg:p-10 flex-1"
          style={{ background: `radial-gradient(ellipse at 50% 40%, ${sample.color}0a 0%, transparent 70%)` }}
        >
          <div className="flex items-center gap-2 self-start">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sample.color }} />
            <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: sample.color }}>
              Live Preview
            </span>
          </div>

          <PhoneMockup url={debouncedUrl} color={sample.color} width={260} height={520} interactive={true} />

          <div className="flex flex-wrap justify-center gap-2">
            {sample.events.map((ev, i) => (
              <span
                key={ev}
                className="font-sans text-[10px] px-2.5 py-1 rounded-full"
                style={{
                  background: EVENT_COLORS[i % EVENT_COLORS.length] + "18",
                  border: `1px solid ${EVENT_COLORS[i % EVENT_COLORS.length]}40`,
                  color: EVENT_COLORS[i % EVENT_COLORS.length],
                }}
              >
                {ev}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Controls ── */}
        <div
          className="w-full lg:w-[340px] flex-shrink-0 flex flex-col overflow-y-auto"
          style={{
            background: "hsl(var(--card))",
            borderLeft: `1px solid hsl(var(--border))`,
          }}
        >
          <div className="p-6 pb-5 border-b border-border/50 flex items-start justify-between gap-4 flex-shrink-0">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.25em] mb-1.5" style={{ color: sample.color }}>
                Customize Invite
              </p>
              <h3 className="font-display text-xl font-bold text-foreground leading-tight">
                {sample.title}
              </h3>
              <p className="font-sans text-xs text-muted-foreground mt-1">{sample.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border/40 transition-colors flex-shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-5 flex-1">
            <div>
              <label className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Guest Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-background border border-border/60 rounded-xl px-4 py-3 font-display text-base text-foreground focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                placeholder="e.g. Smt. Anita Shah"
                style={{ caretColor: sample.color }}
              />
            </div>

            {isWedding && (
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid hsl(var(--border))`, background: "hsl(var(--background)/0.5)" }}
              >
                <button
                  onClick={() => setIsEventExpanded((v) => !v)}
                  className="flex items-center justify-between w-full px-4 py-3 select-none hover:bg-border/20 transition-colors"
                >
                  <span className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isEventExpanded ? "rotate-180" : ""}`} />
                    Events
                  </span>
                  <span className="font-sans text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: `${sample.color}18`, color: sample.color }}>
                    {liveEvents.length} active
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isEventExpanded && (
                    <motion.div
                      key="events"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2 px-4 pb-4 pt-1">
                        {LIVE_WEDDING_EVENTS.map((event) => {
                          const on = liveEvents.includes(event.id);
                          return (
                            <div key={event.id} className="flex flex-col gap-1.5">
                              <button
                                onClick={() =>
                                  setLiveEvents((prev) =>
                                    prev.includes(event.id)
                                      ? prev.filter((e) => e !== event.id)
                                      : [...prev, event.id]
                                  )
                                }
                                className="flex items-center gap-3 w-full"
                              >
                                <div
                                  className="rounded-md border flex items-center justify-center flex-shrink-0 transition-all"
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    background: on ? sample.color : "transparent",
                                    borderColor: on ? sample.color : "hsl(var(--border))",
                                  }}
                                >
                                  {on && <Plus className="w-3 h-3 text-white rotate-45" />}
                                </div>
                                <span className={`font-sans text-sm ${on ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                                  {event.label}
                                </span>
                              </button>
                              {on && (
                                <input
                                  type="text"
                                  value={liveGuestCounts[event.id] || ""}
                                  onChange={(e) =>
                                    setLiveGuestCounts((prev) => ({ ...prev, [event.id]: e.target.value }))
                                  }
                                  className="w-full bg-background border border-border/50 rounded-lg px-3 py-1.5 text-xs font-sans text-foreground focus:outline-none focus:border-gold/40 transition-all ml-7"
                                  placeholder="e.g. Family, VIP, 2 guests"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <p className="font-sans text-[11px] text-muted-foreground/70 leading-relaxed">
              * Changes reflect live in the invite preview
            </p>
          </div>

          <div className="p-6 pt-0 flex flex-col gap-3 flex-shrink-0">
            <a
              href={debouncedUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full font-sans text-sm font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${sample.color}, ${sample.color}cc)`,
                color: "#fff",
                boxShadow: `0 8px 24px ${sample.color}35`,
              }}
            >
              <ExternalLink className="w-4 h-4" />
              Open Full Invite
            </a>
            <button
              onClick={onClose}
              className="w-full font-sans text-xs text-muted-foreground py-2 hover:text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Card (with embedded phone preview) ───────────────────────────── */

type CardSample = (typeof samples)[0];

function SampleCard({ sample, onClick }: { sample: CardSample; onClick: () => void }) {
  const staticUrl = buildUrl(
    sample.theme,
    sample.defaultName,
    sample.defaultEvents,
    sample.defaultGuests
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col items-center"
    >
      <div className="relative">
        <PhoneMockup url={staticUrl} color={sample.color} width={240} height={480} interactive={false} />

        <div className="absolute inset-0 rounded-[3rem] flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{ background: `linear-gradient(to top, ${sample.color}cc 0%, transparent 50%)` }}
        >
          <span className="flex items-center gap-1.5 font-sans text-white text-xs font-bold tracking-wider uppercase">
            <Maximize2 className="w-3.5 h-3.5" />
            Customize
          </span>
        </div>

        <div
          className="absolute top-5 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full z-30"
          style={{
            background: "rgba(5,5,10,0.75)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${sample.color}40`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sample.color }} />
          <span className="font-sans text-[9px] font-bold tracking-widest uppercase" style={{ color: sample.color }}>
            Live
          </span>
        </div>
      </div>

      <div className="mt-5 text-center px-2">
        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-gold transition-colors">
          {sample.title}
        </h3>
        <p className="font-sans text-xs text-muted-foreground mt-1">{sample.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {sample.events.map((ev, i) => (
            <span
              key={ev}
              className="font-sans text-[9px] px-2 py-0.5 rounded-full"
              style={{
                background: EVENT_COLORS[i % EVENT_COLORS.length] + "12",
                border: `1px solid ${EVENT_COLORS[i % EVENT_COLORS.length]}30`,
                color: EVENT_COLORS[i % EVENT_COLORS.length],
              }}
            >
              {ev}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────── */

export default function SamplesSection() {
  const [activeSample, setActiveSample] = useState<(typeof samples)[0] | null>(null);

  return (
    <>
      <section id="samples" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-light/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold mb-3 block">
                Live Examples
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Click. Open. Be <span className="gold-text">Amazed.</span>
              </h2>
            </div>
            <p className="font-sans text-sm text-muted-foreground sm:text-right sm:max-w-[220px] leading-relaxed flex-shrink-0">
              Real, working invites. Type a name, pick events — watch it update live.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
            {samples.map((sample) => (
              <SampleCard
                key={sample.title}
                sample={sample}
                onClick={() => setActiveSample(sample)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
          >
            <p className="font-body text-base text-muted-foreground italic">
              "Every guest is different. Every invite should be too."
            </p>
            <a
              href="#contact"
              className="flex items-center gap-2 font-sans text-sm font-semibold px-8 py-4 rounded-full flex-shrink-0 transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 10px 30px hsl(var(--gold) / 0.2)",
              }}
            >
              Create My Custom Invite <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Portal — renders outside the section so overflow-hidden never traps it */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeSample && (
              <PreviewModal sample={activeSample} onClose={() => setActiveSample(null)} />
            )}
          </AnimatePresence>,
          document.body
        )
      }
    </>
  );
}