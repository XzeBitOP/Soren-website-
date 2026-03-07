import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Download, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const location = useLocation();
  const { cartItems, toggleCart } = useCart();
  const isBuyPage = location.pathname === '/buy';
  const isHomePage = location.pathname === '/';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isTransparent = isHomePage && !isScrolled;
  const navBgClass = isTransparent ? 'bg-transparent' : 'bg-white border-b border-gray-200';
  const textColorClass = isTransparent ? 'text-white' : 'text-black';
  const hoverColorClass = isTransparent ? 'hover:text-gray-300' : 'hover:text-gold';
  const logoFilter = isTransparent ? { filter: 'invert(1)', mixBlendMode: 'screen' as const } : { mixBlendMode: 'multiply' as const };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG-20260217-WA0002(1).jpg" 
                alt="The Søren Studio Favicon" 
                className="h-8 w-8 object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG-20260304-WA0010.jpg" 
                alt="The Søren Studio Logo" 
                className="h-10 object-contain hidden sm:block"
                style={logoFilter}
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center space-x-8 ${textColorClass}`}>
            <Link to="/buy" className={`text-sm tracking-widest uppercase transition-colors ${hoverColorClass}`}>Buy</Link>
            <Link to="/archive" className={`text-sm tracking-widest uppercase transition-colors ${hoverColorClass}`}>Archive</Link>
            <Link to="/about" className={`text-sm tracking-widest uppercase transition-colors ${hoverColorClass}`}>About</Link>
            <Link to="#" className={`text-sm tracking-widest uppercase transition-colors ${hoverColorClass}`}>Contact</Link>
            
            {deferredPrompt && (
              <button 
                onClick={handleInstallClick}
                className={`text-sm tracking-widest uppercase transition-colors flex items-center gap-1 ${hoverColorClass}`}
                title="Install App"
              >
                <Download className="w-4 h-4" />
                <span>Install</span>
              </button>
            )}

            {isBuyPage && (
              <button 
                onClick={toggleCart}
                className="bg-black text-white px-4 py-2 text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-charcoal transition-colors border border-transparent"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>({cartCount})</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className={`md:hidden flex items-center gap-4 ${textColorClass}`}>
            {isBuyPage && (
              <button 
                onClick={toggleCart}
                className="bg-black text-white px-3 py-2 text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-charcoal transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>({cartCount})</span>
              </button>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col space-y-6">
              <Link to="/buy" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase text-black hover:text-gold">Buy</Link>
              <Link to="/archive" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase text-black hover:text-gold">Archive</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase text-black hover:text-gold">About</Link>
              <Link to="#" onClick={() => setIsMobileMenuOpen(false)} className="text-sm tracking-widest uppercase text-black hover:text-gold">Contact</Link>
              
              {deferredPrompt && (
                <button 
                  onClick={() => { handleInstallClick(); setIsMobileMenuOpen(false); }} 
                  className="text-sm tracking-widest uppercase text-black hover:text-gold flex items-center gap-2 text-left"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
