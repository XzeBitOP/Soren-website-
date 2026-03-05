import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  collection: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (id: string) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  total: number;
  appliedCode: string;
  applyDiscountCode: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");

  // Load cart from memory (clears on refresh as requested)
  // But we could use localStorage if we wanted to persist it.
  // The prompt says: "Cart stored in memory (clears on page refresh - intentional)"
  
  const addToCart = (product: Product, size: string, color: string) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      }
      
      return [...prev, {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        product,
        size,
        color,
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);
  const clearCart = () => {
    setCartItems([]);
    setAppliedCode("");
  };

  const applyDiscountCode = (code: string) => {
    if (code.toUpperCase() === "FROZENFREE") {
      setAppliedCode("FROZENFREE");
      return true;
    }
    return false;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = appliedCode === "FROZENFREE" ? subtotal * 0.10 : 0;
  const total = subtotal - discount;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      isCartOpen,
      toggleCart,
      clearCart,
      subtotal,
      discount,
      total,
      appliedCode,
      applyDiscountCode
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
