import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#features", id: "features", label: "Features" },
  { href: "#try-it-out", id: "try-it-out", label: "Interactive Demo" },
  { href: "#how-it-works", id: "how-it-works", label: "How It Works" },
  { href: "#samples", id: "samples", label: "Live Samples" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Throttled scroll handler: only update state when crossing the threshold
  // This avoids 60fps re-renders that useMotionValueEvent would cause
  useEffect(() => {
    const onScroll = () => {
      const shouldBeScrolled = window.scrollY > 30;
      setScrolled(prev => prev !== shouldBeScrolled ? shouldBeScrolled : prev);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy logic
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section is roughly in the middle 20% of the viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    }, options);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4"
      >
        <div
          className="max-w-7xl mx-auto rounded-3xl px-5 sm:px-7 py-2.5 flex items-center justify-between transition-all duration-500"
          style={{
            background: scrolled
              ? "hsl(var(--card) / 0.85)"
              : "hsl(var(--card) / 0.45)",
            backdropFilter: "blur(28px)",
            border: scrolled
              ? "1px solid hsl(var(--gold) / 0.35)"
              : "1px solid hsl(var(--border) / 0.4)",
            boxShadow: scrolled ? "0 12px 40px hsl(var(--warm-dark) / 0.15)" : "none",
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Heart className="w-5 h-5 text-rose fill-rose" />
              <Sparkles className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 text-gold opacity-70" />
            </div>
            <div>
              <span className="font-display text-base sm:text-lg font-semibold text-foreground leading-none block">
                Radiant Vows
              </span>
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground leading-none">
                Digital Invites
              </span>
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-muted/50 border border-border/20">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="relative px-5 py-2 font-sans text-xs font-semibold transition-all duration-300 group"
                  style={{
                    color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  <span className="relative z-10 group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                  
                  {/* Subtle hover background */}
                  {!isActive && (
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "hsl(var(--gold) / 0.08)" }}
                    />
                  )}

                  {/* Active background highlight */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bg"
                      className="absolute inset-0 rounded-xl shadow-sm"
                      style={{ 
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--gold) / 0.25)"
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="relative overflow-hidden font-sans text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-500 hover:scale-[1.03] hover:shadow-xl group active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <span className="relative z-10">Get Started ✨</span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--gold)))" }}
              />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-foreground hover:bg-card transition-colors border border-border/20"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden mt-2.5 mx-0 overflow-hidden"
            >
              <div
                className="rounded-3xl p-2.5 flex flex-col gap-1.5"
                style={{
                  background: "hsl(var(--card) / 0.95)",
                  backdropFilter: "blur(28px)",
                  border: "1px solid hsl(var(--gold) / 0.25)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                }}
              >
                {navLinks.map((link, i) => {
                  const isActive = activeLink === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                      className="flex items-center justify-between px-5 py-4 rounded-2xl font-sans text-sm transition-all"
                      style={{
                        background: isActive ? "hsl(var(--gold) / 0.1)" : "transparent",
                        color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                        fontWeight: isActive ? "700" : "500",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ 
                          background: isActive ? "hsl(var(--gold))" : "hsl(var(--muted-foreground) / 0.3)" 
                        }} />
                        {link.label}
                      </div>
                      {isActive && <Sparkles className="w-3.5 h-3.5 text-gold" />}
                    </motion.a>
                  );
                })}
                <div className="px-2.5 pt-1.5 pb-2.5">
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center font-sans text-sm font-bold py-4 rounded-2xl transition-all shadow-lg rose-glow"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    Get Started ✨
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}