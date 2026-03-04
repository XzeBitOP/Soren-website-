import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
          setTimeout(() => setShowExplosion(false), 3000);
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
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-none"
          >
            <h1 className="font-playfair text-[clamp(4rem,15vw,12rem)] font-bold tracking-tighter text-black">
              DROP_1
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COUNTDOWN SECTION */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative px-4 py-12 overflow-hidden">
        {/* YouTube Background Video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <iframe
            src="https://www.youtube.com/embed/md5gLzS-qEU?autoplay=1&mute=1&loop=1&playlist=md5gLzS-qEU&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-50 border-0"
            allow="autoplay; encrypted-media"
          ></iframe>
          <div className="absolute inset-0 bg-white/60"></div>
        </div>

        <div className="z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
          <p className="text-gray-500 uppercase tracking-[0.2em] text-xs mb-6 font-medium">
            Drop 01 Launches In
          </p>
          
          <h1 className="font-playfair text-[clamp(4rem,10vw,9rem)] leading-none mb-16 tracking-tight">
            DROP 01
          </h1>

          <div className="grid grid-cols-4 gap-2 md:gap-8 lg:gap-12 mb-20 w-full max-w-4xl">
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

          <p className="font-playfair italic text-[clamp(1.2rem,3vw,1.8rem)] text-charcoal max-w-2xl">
            The Søren Studio designs for <span className="text-[#C9A961]">identity</span>. Not validation.
          </p>
        </div>
      </section>

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
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 px-1 md:px-4 pb-1 md:pb-4">
        <div className="aspect-[3/4] md:aspect-square overflow-hidden bg-light-gray relative">
          <img 
            src="https://drive.google.com/uc?id=151p8jiechACVXEVCcRoaeuShyxhdlFlG" 
            alt="Logo on cloth" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>
        <div className="aspect-[3/4] md:aspect-square overflow-hidden bg-light-gray relative">
          <img 
            src="https://drive.google.com/uc?id=1KC9aKYOEjjHXCe6u9HWUHZJPI92Z03EM" 
            alt="Girl wearing logo tshirt" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>
      </section>
      
      {/* VIDEO SECTION */}
      <section className="w-full bg-light-gray h-[60vh] md:h-[80vh] relative overflow-hidden flex items-center justify-center">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="https://drive.google.com/uc?id=1L1g1uyBjDQuMsRwHwj-5suh_v5h9sd4n" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10"></div>
      </section>
    </div>
  );
}
