import { motion } from 'motion/react';

const ARCHIVE_DROPS = [
  {
    id: 'drop_0',
    name: 'DROP 00: Genesis',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1505635552518-3448ff116af3?q=80&w=1000&auto=format&fit=crop',
    description: 'The foundation. Where the silence began.'
  },
  {
    id: 'drop_minus_1',
    name: 'DROP -01: Void',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1518715303843-586e350765b2?q=80&w=1000&auto=format&fit=crop',
    description: 'An exploration of negative space.'
  },
  {
    id: 'drop_minus_2',
    name: 'DROP -02: Brutal',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1622396090075-ab6b8396fe9b?q=80&w=1000&auto=format&fit=crop',
    description: 'Raw materials. Unfinished edges. Pure intent.'
  }
];

export default function Archive() {
  return (
    <div className="w-full bg-black min-h-screen text-white pt-20">
      <section className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="font-playfair text-[clamp(3rem,6vw,5rem)] leading-none tracking-tight mb-6">
            The Archive
          </h1>
          <p className="text-gray-400 uppercase tracking-[0.3em] text-sm">
            Past Collections. Preserved in Time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {ARCHIVE_DROPS.map((drop, index) => (
            <motion.div 
              key={drop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-charcoal relative mb-6">
                <img 
                  src={drop.image} 
                  alt={drop.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-700 blur-[4px] group-hover:blur-md grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="border border-white px-6 py-3 text-sm uppercase tracking-widest">View Archive</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-playfair text-2xl">{drop.name}</h3>
                  <span className="text-gold font-mono text-sm">{drop.date}</span>
                </div>
                <p className="text-gray-400 font-light">{drop.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
