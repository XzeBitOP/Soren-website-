import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="flex flex-col gap-6">
          <span className="font-playfair font-bold text-3xl tracking-tighter text-white">SØREN</span>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
            Designs for identity, not validation. Creating timeless pieces that empower individual expression.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-sm tracking-widest uppercase font-semibold mb-2">Connect</h4>
          <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Instagram</a>
          <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Email</a>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-sm tracking-widest uppercase font-semibold mb-2">Legal</h4>
          <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-gold transition-colors text-sm">Shipping & Returns</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs tracking-wider">© 2026 The Søren Studio. All rights reserved.</p>
        <p className="text-gold text-sm tracking-widest uppercase font-playfair italic">Stay Rare.</p>
      </div>
    </footer>
  );
}
