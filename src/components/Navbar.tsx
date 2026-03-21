import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card rounded-full px-6 py-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent fill-accent" />
          <span className="font-display text-lg font-semibold text-foreground">
            Wedding Invite
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-sans text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#samples" className="hover:text-foreground transition-colors">Samples</a>
        </div>
        <a
          href="#contact"
          className="gold-gradient text-primary-foreground font-sans text-sm font-medium px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Get Started
        </a>
      </div>
    </motion.nav>
  );
}
