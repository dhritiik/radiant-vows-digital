import { motion } from "framer-motion";
import { Eye, Users, Calendar, MapPin, ChevronRight, Sparkles } from "lucide-react";

const samples = [
  {
    title: "Priya Sharma",
    subtitle: "Luxury Grand Wedding",
    url: "https://sj-zeta.vercel.app/?name=Priya_Sharma&event=wedding,mayra,bhakti,reception&guests_wedding=Family&guests_mayra=Family&guests_bhakti=Family&guests_reception=Family",
    events: ["Wedding", "Mayra", "Bhakti", "Reception"],
    guests: "Family (all events)",
    location: "Mumbai",
    color: "#c9a96e",
    highlight: "500+ invites sent",
  },
  {
    title: "Ria Vora",
    subtitle: "Elegant Destination Wedding",
    url: "https://sj-zeta.vercel.app/?invite=wedding2&name=Ria_Vora&event=wedding,mayra,bhakti,reception&guests_wedding=Family&guests_mayra=Family&guests_bhakti=Family&guests_reception=Family",
    events: ["Wedding", "Mayra", "Bhakti", "Reception"],
    guests: "Family (all events)",
    location: "Udaipur",
    color: "#d4a0a7",
    highlight: "Hand-crafted design",
  },
  {
    title: "Dhriti",
    subtitle: "Milestone 50th Anniversary Party",
    url: "https://sj-zeta.vercel.app/?invite=anni&name=dhriti",
    events: ["Anniversary Celebration", "Gala Dinner"],
    guests: "VIP Access",
    location: "Gujarat",
    color: "#a0b4d4",
    highlight: "Custom guest experience",
  },
];

const EVENT_COLORS = ["#c9a96e", "#d4a0a7", "#a0b4d4", "#a0d4b4"];

/* Compact elegant link card */
function SampleCard({ sample, index }: { sample: typeof samples[0]; index: number }) {
  return (
    <motion.div
      style={{
        background: "hsl(var(--card) / 0.8)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${sample.color}33`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: `0 20px 40px ${sample.color}15`, borderColor: `${sample.color}66` }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group relative rounded-3xl p-6 overflow-hidden cursor-pointer h-full flex flex-col justify-between"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, ${sample.color}, ${sample.color}33)` }}
      />

      <div className="relative z-10 w-full">
        {/* Header with Live Badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: sample.color + "15", border: `1px solid ${sample.color}33` }}
          >
            <Sparkles className="w-6 h-6" style={{ color: sample.color }} />
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider"
            style={{ background: sample.color + "10", border: `1px solid ${sample.color}33`, color: sample.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sample.color }} />
            Live Invite
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-display text-xl font-bold text-foreground leading-tight group-hover:text-gold transition-colors">{sample.title}</h3>
          <p className="font-sans text-xs text-muted-foreground mt-1 uppercase tracking-widest">{sample.subtitle}</p>
        </div>

        {/* Metadata row */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
            <Users className="w-3.5 h-3.5 opacity-60" />
            <span>{sample.guests}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 opacity-60" />
            <span>{sample.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            <span>{sample.events.length} Events Crafted</span>
          </div>
        </div>

        {/* Event pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {sample.events.map((ev, i) => (
            <span key={ev} className="font-sans text-[10px] px-2.5 py-0.5 rounded-full"
              style={{
                background: EVENT_COLORS[i % EVENT_COLORS.length] + "10",
                border: `1px solid ${EVENT_COLORS[i % EVENT_COLORS.length]}33`,
                color: EVENT_COLORS[i % EVENT_COLORS.length],
              }}
            >
              {ev}
            </span>
          ))}
        </div>
      </div>

      {/* Footer link */}
      <div className="relative z-10 pt-4 mt-auto border-t border-border/30">
        <a
          href={sample.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full font-sans text-sm font-bold group/link"
          style={{ color: sample.color }}
          onClick={e => e.stopPropagation()}
        >
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Experience Now
          </span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

export default function SamplesSection() {
  return (
    <section id="samples" className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-light/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold mb-3 block">Live Examples</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5">
            Click. Open. Be{" "}
            <span className="gold-text">Amazed.</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            These are real, working invites — open them to experience exactly what your guests will see. No logins, just magic.
          </p>
        </motion.div>

        {/* Sample cards grid - simplified */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {samples.map((sample, index) => (
            <a
              key={sample.title}
              href={sample.url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full block"
            >
              <SampleCard sample={sample} index={index} />
            </a>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
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
  );
}
