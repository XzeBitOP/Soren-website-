import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="w-full bg-white min-h-screen pt-20">
      <section className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 text-center"
        >
          <h1 className="font-playfair text-[clamp(3rem,6vw,5rem)] leading-none tracking-tight">
            Our Story
          </h1>
          
          <div className="space-y-8 text-gray-600 text-[clamp(1.1rem,2vw,1.3rem)] font-light leading-relaxed text-left md:text-center">
            <p>
              The Søren Studio was born from a desire to strip away the noise. 
              We believe in the power of restraint, the strength of silence, and the 
              impact of intentional design.
            </p>
            <p>
              After establishing our presence as an international brand, recognized for 
              our uncompromising commitment to brutalist minimalism and premium materials, 
              we are finally bringing our vision to India.
            </p>
            <p>
              India is a land of vibrant contrasts, and we see a unique opportunity to 
              introduce our philosophy of alignment here. We don't just want to sell clothes; 
              we want to build a community of individuals who understand that true style 
              is an expression of identity, not a pursuit of validation.
            </p>
            <p className="font-playfair italic text-gold text-2xl pt-8">
              "We would love India. And we believe India will love the silence we bring."
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
