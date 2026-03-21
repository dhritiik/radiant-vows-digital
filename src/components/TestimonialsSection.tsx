import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Priya & Rahul",
    location: "Mumbai, India",
    image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "Our guests were absolutely amazed! Each person received their personalized invite with their name beautifully displayed. The music selection was perfect, and the ability to filter events made it so convenient for different family members.",
    event: "Traditional Indian Wedding",
    guests: 500,
  },
  {
    name: "Sarah & Michael",
    location: "London, UK",
    image: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "The digital invitations were a game-changer! We loved how eco-friendly and personal they felt. Our international guests could access everything instantly, and the custom music added such a romantic touch.",
    event: "Elegant Garden Wedding",
    guests: 250,
  },
  {
    name: "Aisha & Omar",
    location: "Dubai, UAE",
    image: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "Absolutely stunning! The personalization for each guest made them feel truly special. The platform handled our multi-event wedding week perfectly, showing each guest only their invited ceremonies.",
    event: "Luxury Destination Wedding",
    guests: 350,
  },
  {
    name: "Emily & James",
    location: "New York, USA",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "Modern, sleek, and incredibly personal. Our tech-savvy friends loved it, and even our grandparents found it easy to use. The unique link for each guest was such a thoughtful detail!",
    event: "Modern City Wedding",
    guests: 180,
  },
  {
    name: "Ananya & Vikram",
    location: "Bangalore, India",
    image: "https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "This was exactly what we needed for our tech-forward wedding! The personalized touches, custom music, and seamless event filtering made our lives so much easier. Highly recommend!",
    event: "Contemporary Indian Wedding",
    guests: 400,
  },
  {
    name: "Sophie & Lucas",
    location: "Paris, France",
    image: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "Magnifique! The elegance and sophistication of these invites perfectly matched our wedding aesthetic. Each guest felt valued with their personalized experience.",
    event: "Romantic French Wedding",
    guests: 150,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-background via-rose-light/10 to-background">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Love Stories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="gold-text">Couples Say</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of happy couples who chose to make their wedding invitations unforgettable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onHoverStart={() => setActiveIndex(index)}
              className={`glass-card rounded-2xl p-6 sm:p-8 cursor-default transition-all duration-300 ${
                activeIndex === index ? "rose-glow scale-105" : ""
              }`}
            >
              <Quote className="w-8 h-8 text-gold/30 mb-4" />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              <p className="font-body text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gold/20"
                />
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="font-sans text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-sans text-muted-foreground">
                <span>{testimonial.event}</span>
                <span className="gold-text font-medium">{testimonial.guests} guests</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-display text-2xl sm:text-3xl text-foreground mb-2">
            <span className="gold-text font-bold">500+</span> Personalized Invites Delivered
          </p>
          <p className="font-body text-muted-foreground">
            Currently in Beta - Join our exclusive early adopters
          </p>
        </motion.div>
      </div>
    </section>
  );
}
