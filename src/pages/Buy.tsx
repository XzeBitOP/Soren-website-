import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';

const MOCK_PRODUCT: Product = {
  id: 'prod_1',
  name: 'The Essential Tee',
  price: 1200,
  images: [
    'https://drive.google.com/uc?id=1KC9aKYOEjjHXCe6u9HWUHZJPI92Z03EM',
    'https://drive.google.com/uc?id=151p8jiechACVXEVCcRoaeuShyxhdlFlG',
    'https://drive.google.com/uc?id=1KC9aKYOEjjHXCe6u9HWUHZJPI92Z03EM',
    'https://drive.google.com/uc?id=151p8jiechACVXEVCcRoaeuShyxhdlFlG',
    'https://drive.google.com/uc?id=1KC9aKYOEjjHXCe6u9HWUHZJPI92Z03EM'
  ],
  description: 'A minimalist staple. Crafted from heavy-weight organic cotton for a structured drape. Features our signature subtle logo embroidery.',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Black', 'White', 'Bone'],
  collection: 'drop01'
};

export default function Buy() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    // Initialize mock data in localStorage if not exists
    const storedProducts = localStorage.getItem('soren_products');
    if (!storedProducts) {
      localStorage.setItem('soren_products', JSON.stringify([MOCK_PRODUCT]));
      setProducts([MOCK_PRODUCT]);
    } else {
      try {
        const parsed = JSON.parse(storedProducts);
        const drop01Products = parsed.filter((p: Product) => p.collection === 'drop01');
        setProducts(drop01Products);
      } catch (e) {
        setProducts([MOCK_PRODUCT]);
      }
    }
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setMainImage(product.images[0]);
    setSelectedSize('');
    setSelectedColor('');
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize || !selectedColor) {
      alert('Please select a size and color.');
      return;
    }
    addToCart(selectedProduct, selectedSize, selectedColor);
    closeModal();
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <Cart onCheckout={() => setIsCheckoutOpen(true)} />
      <Checkout isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      {/* SHOP HERO SECTION */}
      <section className="py-24 md:py-32 px-4 flex flex-col items-center text-center relative overflow-hidden">
        {/* YouTube Background Video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <iframe
            src="https://www.youtube.com/embed/md5gLzS-qEU?autoplay=1&mute=1&loop=1&playlist=md5gLzS-qEU&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-30 border-0"
            allow="autoplay; encrypted-media"
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-off-white/90"></div>
        </div>
        
        <div className="z-10 flex flex-col items-center text-center w-full">
          <h1 className="font-playfair text-[clamp(4rem,10vw,8rem)] leading-none mb-4 tracking-tight">
            DROP 01
          </h1>
          <p className="font-mono text-sm tracking-[0.3em] text-gray-400 mb-12">19 / 06 / 26</p>
          <p className="max-w-2xl text-gray-500 text-[clamp(1rem,1.5vw,1.2rem)] font-light leading-relaxed">
            Limited Units. Built with intention. Designed to last.<br />
            Every piece is part of the first chapter. Once gone, it won't return.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => openModal(product)}
            >
              <div className="aspect-[3/4] bg-light-gray mb-6 overflow-hidden relative">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-playfair text-xl">{product.name}</h3>
                <p className="font-medium">₹{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT SIDE: Images */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col gap-4 bg-off-white">
                <div className="aspect-[3/4] bg-light-gray w-full">
                  <img 
                    src={mainImage} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.images.slice(0, 5).map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`aspect-square bg-light-gray border-2 transition-colors ${mainImage === img ? 'border-gold' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img 
                        src={img} 
                        alt={`${selectedProduct.name} thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: Details */}
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col">
                <h2 className="font-playfair text-3xl md:text-4xl mb-2">{selectedProduct.name}</h2>
                <p className="text-2xl font-medium mb-6">₹{selectedProduct.price}</p>
                <p className="text-gray-500 font-light leading-relaxed mb-10">
                  {selectedProduct.description}
                </p>

                <div className="space-y-8 mb-12 flex-grow">
                  {/* Size Selector */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold tracking-widest uppercase">Size</span>
                      <button className="text-xs text-gray-400 underline hover:text-black">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {selectedProduct.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 border text-sm transition-colors ${
                            selectedSize === size 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white text-black border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div>
                    <span className="text-xs font-semibold tracking-widest uppercase block mb-3">Color</span>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProduct.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`py-3 border text-sm transition-colors ${
                            selectedColor === color 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white text-black border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm hover:bg-charcoal transition-colors mt-auto"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
