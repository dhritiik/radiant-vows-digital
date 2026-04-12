import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import heroImage from "@/assets/invite-showcase-hero.jpg";

const SAMPLE_GUESTS = [
  { name: "Ms. Priya Patel", events: ["Sangeet", "Wedding", "Reception"] },
  { name: "The Sharma Family", events: ["Ariana's 5th Birthday", "Magic Show"] },
  { name: "Mr. & Mrs. Mehta", events: ["50th Anniversary", "Gala Dinner"] },
  { name: "Rahul Jain", events: ["Surprise Party", "Afterparty"] },
];

const EVENT_TAG_COLORS = ["#c9a96e", "#d4a0a7", "#a0b4d4", "#a0d4b4", "#d4c4a0"];

/* Mini invite phone mockup */
function InviteMockup() {
  const [guestIdx, setGuestIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setGuestIdx((i) => (i + 1) % SAMPLE_GUESTS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const guest = SAMPLE_GUESTS[guestIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="relative"
    >
      {/* Phone shell */}
      <div
        className="relative w-52 sm:w-60 rounded-[2rem] overflow-hidden shadow-2xl mx-auto"
        style={{
          background: "linear-gradient(145deg, hsl(25, 35%, 14%), hsl(25, 30%, 10%))",
          border: "1px solid hsl(var(--gold) / 0.3)",
          padding: "10px",
        }}
      >
        {/* StatFus bar */}
        <div className="flex items-center justify-between px-2 py-1 mb-2">
          <span className="font-sans text-xs opacity-40" style={{ color: "hsl(var(--cream))" }}>9:41</span>
          <div className="w-16 h-4 rounded-full" style={{ background: "hsl(25, 35%, 18%)" }} />
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 rounded-full" style={{ height: `${8 + i * 3}px`, background: "hsl(var(--gold) / 0.6)" }} />
            ))}
          </div>
        </div>

        {/* Invite card content */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, hsl(35, 40%, 96%) 0%, hsl(30, 35%, 93%) 100%)",
            minHeight: "280px",
          }}
        >
          {/* Top decorative strip */}
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--rose)), hsl(var(--gold)))" }} />

          <div className="px-5 pt-6 pb-4">
            {/* Om symbol */}
            <div className="text-center mb-3">
              <span className="text-xl" style={{ color: "hsl(var(--gold))" }}>ॐ</span>
            </div>

            <div className="text-center mb-4">
              <p className="font-sans text-xs tracking-widest uppercase opacity-50 mb-1"
                style={{ color: "hsl(var(--foreground))" }}
              >
                With Blessings
              </p>
              <p className="font-body text-xs opacity-60 mb-3"
                style={{ color: "hsl(var(--foreground))" }}
              >
                We joyfully invite
              </p>
              <motion.p
                key={guestIdx}
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-display text-sm font-semibold leading-snug"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {guest.name}
              </motion.p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1" style={{ background: "hsl(var(--gold) / 0.3)" }} />
              <span className="text-xs" style={{ color: "hsl(var(--gold))" }}>✦</span>
              <div className="h-px flex-1" style={{ background: "hsl(var(--gold) / 0.3)" }} />
            </div>

            {/* Events */}
            <div className="text-center mb-4">
              <p className="font-sans text-xs opacity-50 mb-2"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Your Celebrations
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {guest.events.map((ev, i) => (
                  <motion.span
                    key={ev}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="font-sans text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: EVENT_TAG_COLORS[i % EVENT_TAG_COLORS.length] + "22",
                      border: `1px solid ${EVENT_TAG_COLORS[i % EVENT_TAG_COLORS.length]}66`,
                      color: EVENT_TAG_COLORS[i % EVENT_TAG_COLORS.length],
                    }}
                  >
                    {ev}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Host / Event names */}
            <div className="text-center">
              <p className="font-display text-base font-bold"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Devika ♥ Nikhil
              </p>
              <p className="font-sans text-xs opacity-40 mt-0.5"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Feb 14 · Mumbai
              </p>
            </div>
          </div>

          {/* Bottom gold bar */}
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, hsl(var(--rose)), hsl(var(--gold)), hsl(var(--rose)))" }} />
        </div>

        {/* Home indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-16 h-1 rounded-full" style={{ background: "hsl(var(--gold) / 0.3)" }} />
        </div>
      </div>

      {/* Floating badge - personalized */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        className="absolute -right-4 sm:-right-6 top-8 px-3 py-2 rounded-xl shadow-xl"
        style={{
          background: "hsl(var(--gold))",
          color: "hsl(var(--warm-dark))",
          willChange: "transform",
        }}
      >
        <div className="flex items-center gap-1.5">
          <Star className="w-3 h-3 fill-current" />
          <span className="font-sans text-xs font-bold whitespace-nowrap">Personalized!</span>
        </div>
      </motion.div>

      {/* Floating badge - events */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
        className="absolute -left-4 sm:-left-8 bottom-12 px-3 py-2 rounded-xl shadow-xl"
        style={{
          background: "hsl(var(--warm-dark))",
          border: "1px solid hsl(var(--gold) / 0.4)",
          color: "hsl(var(--gold))",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="font-sans text-xs font-semibold whitespace-nowrap">
            {SAMPLE_GUESTS[guestIdx].events.length} Events
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Event invitation showcase"
          className="w-full h-full object-cover opacity-15"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>



      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background z-[1]" />

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
              <span className="font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-muted-foreground">
                Yours Truly invites you to...
              </span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6"
            >
              <span className="text-foreground">The Magic of an Invite</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--primary)) 50%, hsl(var(--gold-light)) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                That Adapts to Whoever is Looking
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-6 sm:mb-8 leading-relaxed"
            >
              An invitation that honors every relationship. It welcomes your guests by name, curates their exclusive itinerary, and gracefully secures their exact place in your celebration. </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="font-sans text-xs sm:text-sm text-muted-foreground">
                  <span className="gold-text font-semibold">500+</span> Guests Delighted
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="font-sans text-xs sm:text-sm text-muted-foreground">
                  <span className="gold-text font-semibold">Beta</span> Launch Special
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="font-sans text-xs sm:text-sm text-muted-foreground">
                  🇮🇳 Made in India
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <a
                href="#samples"
                className="gold-gradient text-primary-foreground font-sans font-medium px-7 sm:px-9 py-3.5 rounded-full text-sm hover:opacity-90 transition-all hover:scale-105 rose-glow w-full sm:w-auto text-center shadow-lg"
              >
                ✉️ View Live Samples
              </a>
              <a
                href="#features"
                className="glass-card text-foreground font-sans font-medium px-7 sm:px-9 py-3.5 rounded-full text-sm hover:bg-card transition-all hover:scale-105 w-full sm:w-auto text-center"
              >
                Explore Features
              </a>
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex-shrink-0 hidden md:block">
            <InviteMockup />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <a href="#features" className="inline-block animate-bounce">
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}