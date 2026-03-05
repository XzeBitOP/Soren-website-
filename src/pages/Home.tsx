import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  // Target date: June 19, 2026, 00:00:00
  const [targetDate, setTargetDate] = useState(() => {
    const initialTarget = new Date('2026-06-19T00:00:00').getTime();
    const now = new Date().getTime();
    // If we are past the target date, give a 3 second countdown
    if (now >= initialTarget) {
      return now + 3000;
    }
    return initialTarget;
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        if (!isLaunched) {
          setIsLaunched(true);
          setShowExplosion(true);
          setTimeout(() => setShowExplosion(false), 5000);
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isLaunched]);

  const handleAdminTest = () => {
    // Set target date to 3 seconds from now
    setTargetDate(new Date().getTime() + 3000);
    setIsLaunched(false);
    setShowExplosion(false);
  };

  return (
    <div className="w-full">
      {/* Admin Button for testing */}
      <button 
        onClick={handleAdminTest}
        className="fixed bottom-4 right-4 z-50 bg-gray-200 text-xs px-2 py-1 opacity-50 hover:opacity-100"
      >
        Test Launch
      </button>

      {/* Explosion Animation Overlay */}
      <AnimatePresence>
        {showExplosion && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-none overflow-hidden"
          >
            {/* Blasting particles effect */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 2000, 
                  y: (Math.random() - 0.5) * 2000,
                  scale: 0,
                  opacity: 0
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute w-4 h-4 bg-white rounded-full"
              />
            ))}

            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.1, 1.5, 1], opacity: 1 }}
              transition={{ duration: 1, times: [0, 0.7, 1] }}
              className="text-center"
            >
              <h1 className="font-playfair text-[clamp(4rem,15vw,12rem)] font-bold tracking-tighter text-white mb-4">
                DROP 01
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="relative"
              >
                {/* Burning Flame Animation Effect */}
                <span className="font-playfair italic text-[clamp(2rem,6vw,5rem)] text-transparent bg-clip-text bg-gradient-to-t from-orange-600 via-yellow-400 to-white animate-flame">
                  A Rebel of the Society
                </span>
                <div className="absolute -inset-4 bg-orange-500/20 blur-3xl -z-10 animate-pulse"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COUNTDOWN SECTION */}
      {!isLaunched ? (
        <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative px-4 py-12 overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
            <p className="text-gray-500 uppercase tracking-[0.2em] text-xs mb-6 font-medium">
              Drop 01 Launches In
            </p>
            
            <h1 className="font-playfair text-[clamp(4rem,10vw,9rem)] leading-none mb-16 tracking-tight">
              DROP 01
            </h1>

            <div className="grid grid-cols-4 gap-2 md:gap-8 lg:gap-12 mb-12 w-full max-w-4xl">
              {[
                { label: 'Days', value: timeLeft.days.toString().padStart(3, '0') },
                { label: 'Hours', value: timeLeft.hours.toString().padStart(2, '0') },
                { label: 'Minutes', value: timeLeft.minutes.toString().padStart(2, '0') },
                { label: 'Seconds', value: timeLeft.seconds.toString().padStart(2, '0') }
              ].map((unit, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full aspect-square border border-gray-200 flex items-center justify-center bg-white shadow-sm mb-4">
                    <span className="font-playfair text-[clamp(2rem,5vw,4.5rem)] font-medium tabular-nums">
                      {unit.value}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">{unit.label}</span>
                </div>
              ))}
            </div>

            <div className="mb-16">
              <p className="font-playfair text-2xl text-black mb-2">Welcome India ♥️</p>
              <div className="h-px w-24 bg-gold mx-auto"></div>
            </div>

            <p className="font-playfair italic text-[clamp(1.2rem,3vw,1.8rem)] text-charcoal max-w-2xl">
              The Søren Studio designs for <span className="text-[#C9A961]">identity</span>. Not validation.
            </p>
          </div>
        </section>
      ) : (
        /* LAUNCHED BANNER SECTION */
        <section className="min-h-[70vh] flex flex-col items-center justify-center relative px-4 py-24 overflow-hidden bg-black text-white">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG_20260304_180607.jpg" 
              alt="Drop 01 Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto"
          >
            <p className="text-gold uppercase tracking-[0.4em] text-xs mb-6 font-bold">Collection Live Now</p>
            <h1 className="font-playfair text-[clamp(3rem,8vw,7rem)] leading-none mb-4 tracking-tight">
              DROP 01
            </h1>
            <h2 className="font-playfair italic text-[clamp(1.5rem,4vw,3.5rem)] text-white/90 mb-12">
              A Rebel of the Society
            </h2>
            
            <Link 
              to="/buy"
              className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-5 text-sm uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all duration-500"
            >
              Shop Collection
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </section>
      )}

      {/* BRAND STATEMENT SECTION */}
      <section className="py-32 md:py-40 px-4 bg-white flex flex-col items-center text-center border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-[clamp(2rem,4vw,4rem)] leading-tight mb-12">
            This is not fashion.<br />
            This is alignment.
          </h2>
          <div className="space-y-2 text-gray-500 text-[clamp(1rem,1.5vw,1.2rem)] font-light tracking-wide">
            <p>We believe restraint is power.</p>
            <p>Silence is strength.</p>
            <p>Minimal is intentional.</p>
          </div>
        </div>
      </section>

      {/* IMAGES SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Model */}
          <div className="aspect-[3/4] overflow-hidden bg-light-gray relative lg:col-span-2">
            <img 
              src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG_20260304_180607.jpg" 
              alt="Model wearing t-shirt" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          {/* Embroidery */}
          <div className="aspect-[3/4] overflow-hidden bg-light-gray relative">
            <img 
              src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG_20260304_180639.jpg" 
              alt="Logo embroidery" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          {/* Material */}
          <div className="aspect-[3/4] overflow-hidden bg-light-gray relative">
            <img 
              src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG_20260304_180807.jpg" 
              alt="Material of clothes" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          {/* Neon Sign */}
          <div className="aspect-[3/4] overflow-hidden bg-light-gray relative lg:col-span-2">
            <img 
              src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG_20260304_180732.jpg" 
              alt="Neon sign" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* THEME EXPLANATION SECTION */}
      <section className="py-24 px-4 bg-off-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-playfair text-[clamp(2.5rem,4vw,4rem)] leading-tight mb-8">
              The Philosophy of <span className="italic">Søren</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed">
              <p>
                Our theme is born from the intersection of brutalist architecture and organic minimalism. 
                We strip away the noise to reveal the essence of the individual.
              </p>
              <p>
                Every stitch is a statement of intent. Every silhouette is a study in proportion. 
                We don't follow trends; we define the space between them.
              </p>
              <p className="font-playfair italic text-gold text-xl">
                "To be a rebel is to be yourself in a world that tries to make you everyone else."
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 aspect-square w-full overflow-hidden bg-light-gray relative shadow-2xl rounded-sm">
            <img 
              src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/main/Asserts/IMG_2162.jpeg" 
              alt="Theme explanation" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      
      {/* MEANING OF BRAND SECTION */}
      <section className="w-full bg-light-gray h-[60vh] md:h-[80vh] relative overflow-hidden flex items-center justify-center">
        <img 
          src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG_20260304_180908.jpg" 
          alt="Meaning of our brand" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="font-playfair text-white text-[clamp(3rem,6vw,5rem)] leading-none mb-6 drop-shadow-lg">
            Søren
          </h2>
          <p className="text-white/90 uppercase tracking-[0.3em] text-sm font-medium drop-shadow-md">
            More than a name. An identity.
          </p>
        </div>
      </section>
    </div>
  );
}
