import { motion } from "framer-motion";
import { User, Users, Music, Filter, Link, Sparkles } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: User,
    title: "Bespoke Guest Salutations",
    description:
      "Every invitation is uniquely rendered for the recipient. Guests are greeted by their actual names, making the digital experience feel as warm as a handwritten envelope.",
  },
  {
    icon: Users,
    title: "Dynamic Guest Allocation",
    description:
      "Eliminate RSVP confusion gracefully. Customize and display the exact number of seats reserved for each family, tailored for every event they attend.",
  },
  {
    icon: Music,
    title: "Curated Sensory Elements",
    description:
      "Set the perfect mood with customizable background music, ambient animations, and high-quality event imagery matching your wedding's unique aesthetic.",
  },
  {
    icon: Filter,
    title: "Intelligent Event Filtering",
    description:
      "Our intelligent timeline automatically filters the schedule, ensuring guests only see the specific ceremonies they are invited to.",
  },
  {
    icon: Link,
    title: "Exclusive Private Links",
    description:
      "Each guest receives a unique, secure URL that customizes their event view and can display a tailored welcome message for an exclusive experience.",
  },
  {
    icon: Sparkles,
    title: "Effortless Setup for Couples",
    description:
      "We handle the technical magic. Just provide your guest list and photographs — we transform them into a breathtaking digital masterpiece.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Every Detail, <span className="gold-text">Perfected</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Our platform transforms your guest list into personalized, immersive experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
