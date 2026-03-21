import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import WeddingScene from "./WeddingScene";
import heroImage from "@/assets/invite-showcase-hero.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Wedding invitation showcase"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* 3D Scene overlay - hidden on very small screens for performance */}
      <div className="hidden sm:block">
        <WeddingScene />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background z-[1]" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
          <span className="font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-muted-foreground">
            Digital Wedding Invitations
          </span>
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6"
        >
          <span className="text-foreground">Your Love Story,</span>
          <br />
          <span className="gold-text">Digitally Crafted</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2"
        >
          Breathtaking, personalized digital invitations that greet each guest by name,
          curate their unique event schedule, and set the perfect mood for your celebration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-4 mb-8 sm:mb-10"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#samples"
            className="gold-gradient text-primary-foreground font-sans font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity rose-glow w-full sm:w-auto text-center"
          >
            View Live Samples
          </a>
          <a
            href="#features"
            className="glass-card text-foreground font-sans font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm hover:bg-card transition-colors w-full sm:w-auto text-center"
          >
            Explore Features
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10 sm:mt-16"
        >
          <a href="#features" className="inline-block animate-float">
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}