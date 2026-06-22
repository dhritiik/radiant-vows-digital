"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";

interface PricingPlan {
  name: string;
  basePrice: number;
  offerPrice: number;
  conversionRates: Record<string, number>;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    basePrice: 7999,
    offerPrice: 7999,
    conversionRates: { INR: 1, EUR: 0.012, USD: 0.012, AUD: 0.019 },
    features: [
      "Beautiful invitation design",
      "No template change",
      "Basic personalization",
      "Up to 100 guests",
    ],
  },
  {
    name: "Professional",
    basePrice: 9999,
    offerPrice: 9999,
    conversionRates: { INR: 1, EUR: 0.012, USD: 0.012, AUD: 0.019 },
    features: [
      "Event filtering",
      "Up to 500 guests",
      "Full personalization",
      "Guest count management",
    ],
  },
  {
    name: "Premium",
    basePrice: 11999,
    offerPrice: 11999,
    conversionRates: { INR: 1, EUR: 0.012, USD: 0.012, AUD: 0.019 },
    features: [
      "All Professional features",
      "Unlimited guests",
      "Custom branding",
      "Priority support",
    ],
  },
];

const currencySymbols: Record<string, string> = {
  INR: "₹",
  EUR: "€",
  USD: "$",
  AUD: "A$",
};

export default function PricingSection() {
  const { region } = useRegion();

  const getCurrencyCode = (): string => {
    switch (region) {
      case "IN":
        return "INR";
      case "EU":
        return "EUR";
      case "US":
        return "USD";
      case "AU":
        return "AUD";
      default:
        return "INR";
    }
  };

  const getPrice = (price: number): string => {
    const currencyCode = getCurrencyCode();
    const rate = pricingPlans[0].conversionRates[currencyCode] || 1;
    const converted = Math.round(price * rate);
    return converted.toLocaleString();
  };

  const currencyCode = getCurrencyCode();
  const symbol = currencySymbols[currencyCode];

  const handleGetStarted = (planName: string) => {
    // Store the selected package in sessionStorage
    sessionStorage.setItem("selectedPackage", planName);
    // Redirect to contact section
    window.location.href = "#contact";
  };

  return (
    <section id="pricing" className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Ambient decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "hsl(0,80%,50%)" }} />
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: "hsl(347,80%,60%)" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3 leading-tight">
            Choose when you're ready.
          </h2>
          <p className="font-sans text-base max-w-xl mx-auto" style={{ color: "hsl(25, 15%, 42%)" }}>
            Start designing for free. Pick a plan when you publish.
          </p>
        </motion.div>

        {/* Pricing Cards - Compact Layout */}
        <div className="grid md:grid-cols-3 gap-5">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -8,
              }}
              className="relative rounded-2xl p-6 transition-all duration-300 cursor-pointer group"
              style={{
                background: "hsl(var(--card) / 0.5)",
                border: "1px solid hsl(0 / 0.2)",
              }}
            >
              {/* Hover background overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, hsl(347, 67%, 86%) 0%, hsl(347, 88%, 87%) 100%)",
                  border: "2px solid hsl(347, 85%, 55%)",
                }}
              />
              
              {/* Content wrapper */}
              <div className="relative z-10">
                {/* Plan Title */}
                <h3
                  className="font-display text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-white"
                  style={{
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {plan.name}
                </h3>

                {/* Price - Prominent */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="font-display text-4xl font-bold transition-colors duration-300"
                      style={{
                        color: "hsl(0, 80%, 45%)",
                      }}
                    >
                      {symbol}
                      {getPrice(plan.offerPrice)}
                    </span>
                  </div>
                  <span
                    className="font-sans text-xs font-semibold transition-colors duration-300"
                    style={{
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    one-time
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleGetStarted(plan.name)}
                  className="w-full font-sans text-xs font-bold py-2.5 rounded-lg mb-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group-hover:bg-white group-hover:text-red-600"
                  style={{
                    background: "hsl(0 / 0.12)",
                    color: "hsl(0, 80%, 45%)",
                    border: "1px solid hsl(0 / 0.25)",
                  }}
                >
                  Get Started
                </button>

                {/* Features - Compact List */}
                <div className="space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.25 }}
                      className="flex items-start gap-2.5"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 group-hover:bg-white"
                        style={{
                          background: "hsl(0 / 0.15)",
                        }}
                      >
                        <Check
                          className="w-2.5 h-2.5 transition-colors duration-300"
                          style={{
                            color: "hsl(0, 80%, 45%)",
                          }}
                        />
                      </div>
                      <span
                        className="font-sans text-xs leading-snug transition-colors duration-300 group-hover:text-white"
                        style={{
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
