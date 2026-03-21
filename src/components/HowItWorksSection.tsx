import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Share Your Details", description: "Send us your guest list spreadsheet and your favourite photographs." },
  { number: "02", title: "We Craft Your Invite", description: "Our team designs a bespoke digital invitation tailored to your wedding theme." },
  { number: "03", title: "Personalized Links", description: "Each guest gets a unique URL with their name, events, and seat allocation." },
  { number: "04", title: "Celebrate!", description: "Your guests open a beautiful, immersive experience on any device." },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Simple Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            How It <span className="gold-text">Works</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="font-display text-3xl sm:text-5xl font-bold gold-text mb-3 sm:mb-4">{step.number}</div>
              <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>