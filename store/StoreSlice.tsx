'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = ProductProps & { quantity: number };

type CartStore = {
  cart: CartItem[];
  cartCount: number; 
  addToCart: (product: ProductProps, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      cartCount: 0,  
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            const updatedCart = state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return {
              cart: updatedCart,
              cartCount: updatedCart.length, 
            };
          }
          const updatedCart = [...state.cart, { ...product, quantity }];
          return {
            cart: updatedCart,
            cartCount: updatedCart.length, 
          };
        });
      },
      removeFromCart: (productId) => {
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== productId);
          return {
            cart: updatedCart,
            cartCount: updatedCart.length, 
          };
        });
      },
      updateQuantity: (productId, quantity) => {
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          return {
            cart: updatedCart,
            cartCount: updatedCart.length, 
          };
        });
      },
      clearCart: () => set({ cart: [], cartCount: 0 }),
    }),
    { name: 'cart-storage' }
  )
);
