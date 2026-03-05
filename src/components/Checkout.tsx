import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { cartItems, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Mock settings
  const googleFormsLink = "https://docs.google.com/forms/d/e/1FAIpQLSf.../viewform";
  const upiId = "sorenstudio@upi";
  const qrCodeUrl = "https://raw.githubusercontent.com/XzeBitOP/Soren-website-/fc752cd7a23909f18cee3c851dfe1636fe52025b/Asserts/IMG-20260304-WA0010.jpg"; // Using logo as placeholder

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      clearCart();
      setIsConfirmed(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-[600px] max-h-[90vh] overflow-y-auto relative shadow-2xl"
        >
          {isConfirmed ? (
            <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
              <h2 className="font-playfair text-3xl mb-4">Order Confirmed</h2>
              <p className="text-gray-500">Thank you for your purchase. You will receive an email confirmation shortly.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="font-playfair text-2xl">Complete Your Order</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Order Summary */}
                <div className="bg-gray-50 p-6 border border-gray-100">
                  <h3 className="text-sm uppercase tracking-widest font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.product.name} ({item.size}, {item.color})
                        </span>
                        <span>₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-playfair text-xl pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Step 1 */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-semibold mb-4">Step 1: Fill Order Details</h3>
                  <p className="text-sm text-gray-500 mb-4">Please fill out your shipping information in our secure form.</p>
                  <a 
                    href={googleFormsLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block border border-black px-6 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                  >
                    Fill Order Details
                  </a>
                </div>

                {/* Step 2 */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-semibold mb-4">Step 2: Choose Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      className={`border p-4 text-center transition-colors ${paymentMethod === 'upi' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <span className="text-sm uppercase tracking-widest">UPI Payment</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('cod')}
                      className={`border p-4 text-center transition-colors ${paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <span className="text-sm uppercase tracking-widest">Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                {paymentMethod === 'upi' && (
                  <div className="bg-gray-50 p-6 border border-gray-100 flex flex-col items-center text-center">
                    <h3 className="text-sm uppercase tracking-widest font-semibold mb-6">Step 3: Complete Payment</h3>
                    <div className="w-48 h-48 bg-white p-2 border border-gray-200 mb-6">
                      <img 
                        src={qrCodeUrl} 
                        alt="UPI QR Code" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="border border-dashed border-gold px-6 py-3 mb-4 bg-white">
                      <span className="font-mono text-lg tracking-wider">{upiId}</span>
                    </div>
                    <p className="text-sm text-gray-500">After payment, you will receive order confirmation via email.</p>
                  </div>
                )}

                <button 
                  onClick={handleConfirmOrder}
                  className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm hover:bg-charcoal transition-colors mt-8"
                >
                  Confirm Order
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
