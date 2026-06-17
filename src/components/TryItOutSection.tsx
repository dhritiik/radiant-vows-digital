"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus, Calendar, Users, Camera, Music, Wine, Heart, MapPin } from "lucide-react";

type Theme = "wedding_live" | "party" | "anni_live";

const BACKGROUNDS = {
  party: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000",
  wedding_live: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000",
  anni_live: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000",
};

const LIVE_WEDDING_EVENTS = [
  { id: "wedding", label: "Wedding", icon: Calendar },
  { id: "mayra", label: "Mayra", icon: Heart },
  { id: "bhakti", label: "Bhakti", icon: Music },
  { id: "reception", label: "Reception", icon: Wine },
];

export default function TryItOutSection() {
  const [theme, setTheme] = useState<Theme>("wedding_live");
  const [guestName, setGuestName] = useState("Ria Vora");

  // Live Mode State
  const [liveEvents, setLiveEvents] = useState<string[]>(["wedding", "mayra", "bhakti", "reception"]);
  const [liveGuestCounts, setLiveGuestCounts] = useState<Record<string, string>>({
    wedding: "Family",
    mayra: "Family",
    bhakti: "Family",
    reception: "Family",
  });
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  // FIX: Start with a stable URL so the iframe has a src immediately on mount
  const [debouncedUrl, setDebouncedUrl] = useState<string | null>(null);

  // FIX: Memoize getLiveUrl so it doesn't change reference on every render
  const getLiveUrl = useCallback(() => {
    const baseUrl = "https://sj-zeta.vercel.app/";
    const params = new URLSearchParams();

    if (theme === "wedding_live") {
      params.set("invite", "wedding2");
      params.set("name", guestName.replace(/\s+/g, "_"));
      params.set("event", liveEvents.join(","));
      liveEvents.forEach((evt) => {
        params.set(`guests_${evt}`, liveGuestCounts[evt] || "Family");
      });
    } else if (theme === "anni_live") {
      params.set("invite", "anni");
      params.set("name", guestName.replace(/\s+/g, "_"));
    }

    return `${baseUrl}?${params.toString()}`;
  }, [theme, guestName, liveEvents, liveGuestCounts]);

  // FIX: Debounce URL updates properly - only update debouncedUrl after user stops typing
  // The iframe src is ONLY set from debouncedUrl, never from getLiveUrl() inline
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!theme.includes("_live")) {
      setDebouncedUrl(null);
      return;
    }

    setIsIframeLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedUrl(getLiveUrl());
    }, 700);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [getLiveUrl, theme]);

  return (
    <section id="try-it-out" className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 overflow-hidden bg-background">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-[120px] bg-rose/10 pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] bg-gold/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold mb-3 block font-semibold">
            Interactive Demo
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Try It For <span className="gold-text">Yourself</span>
          </h2>
          <p className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            See exactly how your guests will experience their personalized invite. Type a name and watch the magic happen.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl mx-auto">

          {/* LEFT PANEL: Form Controls */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 max-w-md lg:max-w-none flex flex-col gap-8"
          >
            {/* Theme Toggle */}
            <div className="bg-card/60 backdrop-blur-md p-1.5 rounded-2xl border border-border/50 flex flex-wrap gap-1 relative">
              {(["wedding_live", "party", "anni_live"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    if (t === "party") setGuestName("Rahul Mishra");
                    if (t === "wedding_live") {
                      setGuestName("Ria Vora");
                      setIsIframeLoading(true);
                    }
                    if (t === "anni_live") {
                      setGuestName("Dhriti");
                      setIsIframeLoading(true);
                    }
                  }}
                  className={`relative flex-1 min-w-[100px] py-2.5 font-sans text-[11px] font-bold uppercase tracking-wider z-10 transition-colors duration-300 ${theme === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {theme === t && (
                    <motion.div
                      layoutId="theme-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: t.includes("live") ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--gold)))" : "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-20 flex items-center justify-center gap-1.5">
                    {t === "party" && <Sparkles className="w-3.5 h-3.5" />}
                    {t === "wedding_live" && <Users className="w-3.5 h-3.5" />}
                    {t === "anni_live" && <Camera className="w-3.5 h-3.5" />}
                    {t.replace("_live", " (Live)")}
                  </span>
                </button>
              ))}
            </div>


            {/* Input Form Box */}
            <div className="bg-card/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-border/60 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sparkles className="w-24 h-24 text-gold" />
              </div>

              {/* Guest Name */}
              <div className="mb-6 relative z-10">
                <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">
                  Guest Name
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    // FIX: Don't set isIframeLoading here — the useEffect handles it
                  }}
                  className="w-full bg-background border border-border/60 rounded-xl px-4 py-3.5 font-display text-lg text-foreground focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all shadow-sm placeholder:text-muted/50"
                  placeholder="e.g. Smt. Kokilaben"
                />
              </div>

              <AnimatePresence mode="popLayout">
                {theme === "wedding_live" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <div className="mb-6">
                      <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">
                        Live Event Customization
                      </label>
                      <div className="flex flex-col gap-3">
                        {LIVE_WEDDING_EVENTS.map((event) => {
                          const isSelected = liveEvents.includes(event.id);
                          return (
                            <div key={event.id} className="flex flex-col gap-2 p-3 rounded-xl border border-border/40 bg-background/40">
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => {
                                    setLiveEvents(prev => prev.includes(event.id) ? prev.filter(e => e !== event.id) : [...prev, event.id]);
                                  }}
                                  className="flex items-center gap-3"
                                >
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-gold border-gold" : "border-border/60"}`}>
                                    {isSelected && <Plus className="w-3.5 h-3.5 text-white rotate-45" />}
                                  </div>
                                  <span className={`font-sans text-sm font-semibold ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                                    {event.label}
                                  </span>
                                </button>
                              </div>
                              {isSelected && (
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    value={liveGuestCounts[event.id] || ""}
                                    onChange={(e) => {
                                      setLiveGuestCounts(prev => ({ ...prev, [event.id]: e.target.value }));
                                    }}
                                    className="w-full bg-background/60 border border-border/40 rounded-lg px-3 py-2 text-xs font-sans focus:outline-none focus:border-gold/50 transition-all"
                                    placeholder="Guest Count (e.g. Family, 2, VIP)"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

          {/* RIGHT PANEL: Live Phone Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center perspective-[1000px]"
          >
            {/* Phone Hardware Mockup */}
            <div
              className="relative w-[340px] h-[620px] rounded-[3rem] p-3 shadow-2xl transition-transform duration-700 ease-out hover:rotate-y-[-5deg] hover:rotate-x-[2deg]"
              style={{
                background: "linear-gradient(145deg, hsl(30, 20%, 90%), hsl(30, 20%, 60%))",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 4px 6px -1px rgba(255, 255, 255, 0.5)",
              }}
            >

              {/* Outer screen border */}
              <div className="w-full h-full bg-black rounded-[2.5rem] p-1.5 relative overflow-hidden flex flex-col">
                {/* The Screen / WebView */}
                <div className="flex-1 w-full bg-warm-dark rounded-[2rem] relative overflow-hidden">
                  
                  {/* iPhone Notch Overlay (Purely visual, stays on top) */}
                  <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
                    <div className="w-44 h-7 bg-black rounded-b-[1.25rem]"></div>
                  </div>


                  {theme.includes("_live") ? (
                    <div className="absolute inset-0 bg-white">
                      <AnimatePresence mode="wait">
                        {isIframeLoading && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                          >
                            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4" />
                            <p className="font-sans text-xs font-bold tracking-widest uppercase text-gold">Syncing Live Template</p>
                            <p className="font-sans text-[10px] text-muted-foreground mt-2">Personalizing your experience...</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="w-full h-full overflow-hidden">
                        {/* FIX: Only render iframe when debouncedUrl is ready; key=theme to remount on theme change only */}
                        {debouncedUrl && (
                          <iframe
                            src={debouncedUrl}
                            style={{
                              width: "375px",
                              height: "721px",
                              transform: "scale(0.8106)",
                              transformOrigin: "top left",
                              border: "none",
                            }}
                            onLoad={() => setIsIframeLoading(false)}
                            key={theme}
                            title="Live Preview"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Dynamic Background Image */}
                      <AnimatePresence mode="sync">
                        <motion.img
                          key={theme}
                          src={BACKGROUNDS[theme as keyof typeof BACKGROUNDS]}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                          className="absolute inset-0 w-full h-full object-cover opacity-70"
                          alt={`${theme} background`}
                          loading="lazy"
                        />
                      </AnimatePresence>

                      {/* Overlays to ensure text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                      <div className="absolute inset-0 bg-black/30" />

                      {/* Invite Content */}
                      <div className="relative z-10 h-full flex flex-col p-6 pt-16">
                        <div className="flex flex-col h-full items-center justify-center text-center pb-12 px-2">
                          {/* FIX: Removed infinite repeat animate — was burning GPU continuously */}
                          <div className="mb-6 p-4 bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_30px_hsl(var(--gold)/0.3)]">
                            <Sparkles className="w-8 h-8 text-gold" />
                          </div>

                          <p className="font-sans text-[10px] tracking-[0.3em] text-cream/70 uppercase mb-4 drop-shadow-md">
                            VIP Access Granted
                          </p>

                          <h3 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-xl">
                            {guestName || "Guest Name"}
                          </h3>
                          <p className="font-body text-lg text-cream/80 italic mb-8 drop-shadow-md">
                            Get ready for an unforgettable night.
                          </p>

                          <div className="w-full max-w-[180px] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-8" />

                          <div className="flex flex-col gap-3 w-full max-w-[240px] text-left">
                            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-lg">
                              <Calendar className="w-4 h-4 text-gold opacity-80 flex-shrink-0" />
                              <div className="flex flex-col">
                                <span className="font-sans text-[9px] uppercase text-white/50 tracking-wider font-semibold">Date & Time</span>
                                <span className="font-sans text-xs font-semibold text-cream tracking-wide mt-0.5">Dec 31 • 10:00 PM</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-lg">
                              <MapPin className="w-4 h-4 text-gold opacity-80 flex-shrink-0" />
                              <div className="flex flex-col">
                                <span className="font-sans text-[9px] uppercase text-white/50 tracking-wider font-semibold">Location</span>
                                <span className="font-sans text-xs font-semibold text-cream tracking-wide mt-0.5">Grand Rooftop Club</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}


                  {/* Fake Home Indicator */}
                  <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
                    <div className="w-24 h-1 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient decorative elements around phone */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
              className="absolute -right-8 top-1/4 bg-card/90 backdrop-blur border border-gold/30 p-3 rounded-2xl shadow-xl flex items-center gap-2 z-20"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-foreground">Live Data</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
