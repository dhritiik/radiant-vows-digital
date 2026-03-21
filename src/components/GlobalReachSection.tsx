import { motion } from "framer-motion";
import { Globe, MapPin, Users, Heart } from "lucide-react";

const locations = [
  { city: "Mumbai", country: "India", guests: 500, x: 70, y: 45 },
  { city: "London", country: "UK", guests: 250, x: 48, y: 35 },
  { city: "Dubai", country: "UAE", guests: 350, x: 60, y: 48 },
  { city: "New York", country: "USA", guests: 180, x: 25, y: 38 },
  { city: "Bangalore", country: "India", guests: 400, x: 72, y: 50 },
  { city: "Paris", country: "France", guests: 150, x: 49, y: 36 },
];

const stats = [
  { icon: Users, value: "500+", label: "Guests Delighted" },
  { icon: Heart, value: "6+", label: "Weddings Crafted" },
  { icon: Globe, value: "10+", label: "Cities Reached" },
  { icon: MapPin, value: "100%", label: "Personalization" },
];

export default function GlobalReachSection() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-rose/5" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Global Presence
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Celebrations <span className="gold-text">Across the Globe</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we've delivered personalized experiences worldwide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative glass-card rounded-3xl p-8 sm:p-12 mb-12 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--gold))" />
                  <stop offset="100%" stopColor="hsl(var(--rose))" />
                </linearGradient>
              </defs>
              <path
                d="M 100 250 Q 250 200, 400 250 T 700 250 Q 850 280, 900 250"
                fill="none"
                stroke="url(#mapGradient)"
                strokeWidth="2"
                opacity="0.3"
              />
              <circle cx="200" cy="230" r="60" fill="url(#mapGradient)" opacity="0.1" />
              <circle cx="500" cy="250" r="80" fill="url(#mapGradient)" opacity="0.1" />
              <circle cx="750" cy="240" r="70" fill="url(#mapGradient)" opacity="0.1" />
            </svg>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:border-gold/50 transition-all"
                >
                  <MapPin className="w-5 h-5 text-gold mb-2" />
                  <h3 className="font-display font-semibold text-foreground text-sm">
                    {location.city}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground mb-2">
                    {location.country}
                  </p>
                  <p className="font-sans text-xs gold-text font-medium">
                    {location.guests} guests
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Globe className="w-full h-full text-gold/10" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 text-center group cursor-default"
            >
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="font-body text-lg text-muted-foreground italic">
            "Currently in Beta Phase - Be part of our exclusive launch and get special early-bird pricing"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
