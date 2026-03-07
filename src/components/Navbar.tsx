import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const location = useLocation();
  const { cartItems, toggleCart } = useCart();
  const isBuyPage = location.pathname === '/buy';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
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
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-6 sm:space-x-8">
            <Link to="/buy" className="text-sm tracking-widest uppercase hover:text-gold transition-colors">Buy</Link>
            <Link to="#" className="text-sm tracking-widest uppercase hover:text-gold transition-colors hidden sm:block">Archive</Link>
            <Link to="#" className="text-sm tracking-widest uppercase hover:text-gold transition-colors hidden sm:block">About</Link>
            <Link to="#" className="text-sm tracking-widest uppercase hover:text-gold transition-colors hidden sm:block">Contact</Link>
            
            {deferredPrompt && (
              <button 
                onClick={handleInstallClick}
                className="text-sm tracking-widest uppercase hover:text-gold transition-colors flex items-center gap-1"
                title="Install App"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Install</span>
              </button>
            )}

            {isBuyPage && (
              <button 
                onClick={toggleCart}
                className="bg-black text-white px-4 py-2 text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-charcoal transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>({cartCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
