import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4"
    >
      <div className="max-w-7xl mx-auto glass-card rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-accent" />
          <span className="font-display text-base sm:text-lg font-semibold text-foreground">
            Wedding Invite
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-sans text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#samples" className="hover:text-foreground transition-colors">Samples</a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="gold-gradient text-primary-foreground font-sans text-xs sm:text-sm font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 mx-2 glass-card rounded-2xl p-4 flex flex-col gap-3 font-sans text-sm text-muted-foreground"
        >
          <a href="#features" onClick={() => setMobileOpen(false)} className="hover:text-foreground transition-colors py-1">Features</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="hover:text-foreground transition-colors py-1">How It Works</a>
          <a href="#samples" onClick={() => setMobileOpen(false)} className="hover:text-foreground transition-colors py-1">Samples</a>
        </motion.div>
      )}
    </motion.nav>
  );
}