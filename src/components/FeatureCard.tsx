import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card rounded-xl p-6 md:p-8 group cursor-default"
    >
      <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </motion.div>
  );
}
