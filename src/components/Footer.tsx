import { motion } from "framer-motion";
import { Heart, Instagram, MessageCircle, Mail, Sparkles, ArrowUp } from "lucide-react";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#try-it-out", label: "Interactive Demo" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#samples", label: "Live Samples" },
  { href: "#contact", label: "Get Started" },
];

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/918080001149", label: "WhatsApp", color: "#25D366" },
  { icon: Instagram, href: "#", label: "Instagram", color: "#E1306C" },
  { icon: Mail, href: "mailto:dhritikothari01@gmail.com", label: "Email", color: "hsl(var(--gold))" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative pt-12 pb-6 px-4 sm:px-6 overflow-hidden">
      {/* Top gold divider line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.5), hsl(var(--rose) / 0.3), transparent)" }}
      />

      {/* BG decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-[0.04]"
        style={{ background: "hsl(var(--gold))" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative">
                <Heart className="w-5 h-5 text-rose fill-rose" />
                <Sparkles className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 text-gold" />
              </div>
              <div>
                <span className="font-display text-lg font-semibold text-foreground block leading-none">Radiant Vows</span>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Digital Invites</span>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              India's first smart invitation platform that personalizes every invite for every guest — by name, by event, by seat count.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  title={s.label}
                  style={{
                    background: "hsl(var(--card) / 0.7)",
                    border: "1px solid hsl(var(--border) / 0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-base font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* USP summary */}
          <div>
            <h4 className="font-display text-base font-semibold text-foreground mb-4">Why Radiant Vows?</h4>
            {[
              "Every guest greeted by name",
              "Event-specific invite per guest",
              "Custom music & animations",
              "Shareable via WhatsApp",
              "Zero tech skills needed",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 mb-2.5">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(var(--gold))" }} />
                <p className="font-body text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.3)" }}
        >
          <p className="font-sans text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Radiant Vows Digital. Crafted with{" "}
            <Heart className="inline w-3 h-3 text-rose fill-rose" /> in India.
          </p>

          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-muted-foreground">Beta Launch 2025</span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "hsl(var(--gold) / 0.15)",
                border: "1px solid hsl(var(--gold) / 0.3)",
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-gold" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
