import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import sampleInvite1 from "@/assets/sample-invite-1.png";
import sampleInvite2 from "@/assets/sample-invite-2.png";
import phonesShowcase from "@/assets/invite-phones-showcase.jpg";
import showcaseVideo from "@/assets/invite-showcase-video.mp4.asset.json";

const samples = [
  {
    title: "Kokilaben Family Invite",
    subtitle: "Wedding · Mayra · Bhakti · Reception",
    url: "https://sj-zeta.vercel.app/?name=Smt._Kokilaben_L._Vora&event=wedding,mayra,bhakti,reception&guests_wedding=Family&guests_mayra=Family&guests_bhakti=Family&guests_reception=Family",
    image: sampleInvite1,
  },
  {
    title: "Arihantbhai Family Invite",
    subtitle: "Wedding · Mayra · Reception",
    url: "https://sj-zeta.vercel.app/?name=Shri_Arihantbhai_P._Sheth&event=wedding,mayra,reception&guests_wedding=Family&guests_mayra=2&guests_reception=Family",
    image: sampleInvite2,
  },
];

export default function SamplesSection() {
  return (
    <section id="samples" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
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
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            See It In <span className="gold-text">Action</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Experience how each guest receives a uniquely personalized invitation
          </p>
        </motion.div>

        {/* Video Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 relative rounded-3xl overflow-hidden rose-glow"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-3xl"
            poster={phonesShowcase}
          >
            <source src={showcaseVideo.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex items-end justify-center pb-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="font-display text-xl md:text-2xl text-foreground font-semibold"
            >
              Every invite, uniquely <span className="gold-text">personalized</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Phones showcase image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <img
            src={phonesShowcase}
            alt="Wedding invitations displayed on multiple smartphones with golden borders and rose petals"
            className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Sample Cards with Screenshots */}
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
              className="glass-card rounded-2xl overflow-hidden group block relative"
            >
              {/* Screenshot Preview */}
              <div className="relative overflow-hidden">
                <img
                  src={sample.image}
                  alt={`${sample.title} - Live preview of personalized wedding invitation`}
                  className="w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="gold-gradient rounded-full p-4 rose-glow">
                    <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                      {sample.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground">{sample.subtitle}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0" />
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Click to experience a live, personalized wedding invitation with custom guest names,
                  filtered events, and curated aesthetics.
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
