"use client";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Sparkles, Send, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "918080001149";
const PHONE_DISPLAY = "+91 8080001149";
const EMAIL = "dhritikothari01@gmail.com";

export default function ContactSection() {
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    // Get the selected package from sessionStorage
    const pkg = sessionStorage.getItem("selectedPackage");
    if (pkg) {
      setSelectedPackage(pkg);
    }
  }, []);

  const getContactMethods = () => [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Available on WhatsApp",
      subtext: "Fastest response — message us anytime",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27m%20interested%20in%20Yours%20Truly%20Invites%20${selectedPackage ? `- ${selectedPackage} Package` : "Digital Invites"}.`,
      color: "#25D366",
      bg: "#25D36618",
      border: "#25D36640",
      cta: "Chat on WhatsApp",
      emoji: "💬",
    },
    {
      icon: Phone,
      label: "Phone / Call",
      value: "WhatsApp Audio Preferred",
      subtext: "Message us first to schedule a quick call",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27d%20like%20to%20schedule%20a%20call%20${selectedPackage ? `to discuss the ${selectedPackage} Package` : "to discuss my event"}.`,
      color: "hsl(var(--gold))",
      bg: "hsl(var(--gold) / 0.1)",
      border: "hsl(var(--gold) / 0.35)",
      cta: "Message to Call",
      emoji: "📞",
      isWhatsApp: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: EMAIL,
      subtext: "Send us your guest lists & theme photos",
      href: `mailto:${EMAIL}?subject=Digital%20Invite%20Enquiry%20${selectedPackage ? `- ${selectedPackage}%20Package` : ""}`,
      color: "#a0b4d4",
      bg: "#a0b4d415",
      border: "#a0b4d440",
      cta: "Send Email",
      emoji: "✉️",
    },
  ];

  const contactMethods = getContactMethods();
  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(var(--gold) / 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Floating decorative elements removed for performance */}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold font-semibold">
              Get In Touch
            </span>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Guests Deserve
            <br />
            <span className="gold-text">Something Extraordinary</span>
          </h2>
          <p className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Let us transform your event into a hundred personalized moments — one beautiful invite at a time.
            No tech knowledge needed. Just share your details and leave the magic to us.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-2xl p-7 flex flex-col items-start text-left overflow-hidden cursor-pointer transition-shadow duration-300"
              style={{
                background: "hsl(var(--card) / 0.8)",
                border: `1.5px solid ${method.border}`,
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${method.bg}, transparent 70%)` }}
              />

              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 group-hover:h-1 transition-all duration-300"
                style={{ background: `linear-gradient(90deg, ${method.color}cc, transparent)` }}
              />

              {/* Emoji */}
              <div className="text-2xl mb-4">{method.emoji}</div>

              {/* Icon + label */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: method.bg, border: `1px solid ${method.border}` }}
                >
                  <method.icon className="w-5 h-5" style={{ color: method.color }} />
                </div>
                <span className="font-display text-lg font-semibold text-foreground">{method.label}</span>
              </div>

              <p
                className="font-sans text-sm font-semibold mb-1 break-all"
                style={{ color: method.color }}
              >
                {method.value}
              </p>
              <p className="font-body text-xs text-muted-foreground mb-5 leading-relaxed flex-1">
                {method.subtext}
              </p>

              {/* CTA button */}
              <div
                className="flex items-center gap-2 font-sans text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 group-hover:gap-3"
                style={{
                  background: method.bg,
                  border: `1px solid ${method.border}`,
                  color: method.color,
                }}
              >
                {method.cta}
                <Send className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom note card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 text-center overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(var(--warm-dark)), hsl(25, 28%, 14%))",
            border: "1px solid hsl(var(--gold) / 0.2)",
            boxShadow: "0 16px 60px hsl(var(--warm-dark) / 0.3)",
          }}
        >
          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-10 -translate-y-1/2 pointer-events-none"
            style={{ background: "hsl(var(--gold))" }} />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full blur-3xl opacity-10 translate-y-1/2 pointer-events-none"
            style={{ background: "hsl(var(--rose))" }} />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-4 h-4 fill-current" style={{ color: "hsl(var(--rose))" }} />
              <span className="font-sans text-xs tracking-widest uppercase font-semibold" style={{ color: "hsl(var(--gold) / 0.8)" }}>
                Beta Launch — Limited Slots
              </span>
              <Heart className="w-4 h-4 fill-current" style={{ color: "hsl(var(--rose))" }} />
            </div>
            <p className="font-display text-xl sm:text-2xl font-semibold mb-2" style={{ color: "hsl(var(--cream))" }}>
              Book your slot before they fill up
            </p>
            <p className="font-body text-sm max-w-md mx-auto leading-relaxed mb-6" style={{ color: "hsl(30, 15%, 65%)" }}>
              We take a limited number of events each month to ensure every invite gets our full attention.
              Message us on WhatsApp to check availability for your date.
            </p>
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27d%20like%20to%20book%20a%20slot%20for%20my%20event%20invite${selectedPackage ? `%20-%20${selectedPackage}%20Package` : ""}.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 font-sans text-sm font-bold px-8 py-3.5 rounded-full transition-all"
              style={{
                background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--primary)))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 8px 30px hsl(var(--gold) / 0.3)",
              }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
