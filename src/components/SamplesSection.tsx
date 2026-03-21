import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const samples = [
  {
    title: "Kokilaben Family Invite",
    subtitle: "Wedding · Mayra · Bhakti · Reception",
    url: "https://sj-zeta.vercel.app/?name=Smt._Kokilaben_L._Vora&event=wedding,mayra,bhakti,reception&guests_wedding=Family&guests_mayra=Family&guests_bhakti=Family&guests_reception=Family",
  },
  {
    title: "Arihantbhai Family Invite",
    subtitle: "Wedding · Mayra · Reception",
    url: "https://sj-zeta.vercel.app/?name=Shri_Arihantbhai_P._Sheth&event=wedding,mayra,reception&guests_wedding=Family&guests_mayra=2&guests_reception=Family",
  },
];

export default function SamplesSection() {
  return (
    <section id="samples" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Live Examples
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            See It In <span className="gold-text">Action</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Experience how each guest receives a uniquely personalized invitation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {samples.map((sample, index) => (
            <motion.a
              key={sample.title}
              href={sample.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="glass-card rounded-2xl p-8 group block relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {sample.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground">{sample.subtitle}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
              </div>
              <p className="font-body text-sm text-muted-foreground">
                Click to experience a live, personalized wedding invitation with custom guest names,
                filtered events, and curated aesthetics.
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
