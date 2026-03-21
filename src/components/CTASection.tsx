import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 gold-gradient opacity-5" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <Heart className="w-10 h-10 text-accent fill-accent mx-auto mb-6 animate-float" />
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          Ready to Create Your <span className="gold-text">Dream Invite?</span>
        </h2>
        <p className="font-body text-lg text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
          Let us transform your wedding details into a stunning, personalized digital experience
          your guests will never forget.
        </p>
        <div className="glass-card px-6 py-3 rounded-full inline-block mb-10">
          <p className="font-sans text-sm text-muted-foreground">
            <span className="gold-text font-semibold">Limited Beta Slots</span> - Special Launch Pricing Available
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gold-gradient text-primary-foreground font-sans font-medium px-10 py-4 rounded-full text-sm hover:opacity-90 transition-all hover:scale-105 rose-glow"
          >
            Get Started Today
          </a>
          <a
            href="#samples"
            className="inline-block glass-card text-foreground font-sans font-medium px-10 py-4 rounded-full text-sm hover:bg-card transition-all hover:scale-105"
          >
            View More Samples
          </a>
        </div>
      </motion.div>
    </section>
  );
}
