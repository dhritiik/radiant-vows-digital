import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import WeddingScene from "./WeddingScene";
import heroImage from "@/assets/invite-showcase-hero.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Wedding invitation showcase"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* 3D Scene overlay */}
      <WeddingScene />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background z-[1]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Digital Wedding Invitations
          </span>
          <Sparkles className="w-4 h-4 text-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-foreground">Your Love Story,</span>
          <br />
          <span className="gold-text">Digitally Crafted</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Breathtaking, personalized digital invitations that greet each guest by name,
          curate their unique event schedule, and set the perfect mood for your celebration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#samples"
            className="gold-gradient text-primary-foreground font-sans font-medium px-8 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity rose-glow"
          >
            View Live Samples
          </a>
          <a
            href="#features"
            className="glass-card text-foreground font-sans font-medium px-8 py-3.5 rounded-full text-sm hover:bg-card transition-colors"
          >
            Explore Features
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16"
        >
          <a href="#features" className="inline-block animate-float">
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
