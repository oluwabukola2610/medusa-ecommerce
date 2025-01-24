'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = ProductProps & { quantity: number };

type CartStore = {
  cart: CartItem[];
  addToCart: (product: ProductProps, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, quantity = 1) => {
        set(state => {
          const existingItem = state.cart.find(item => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          return { cart: [...state.cart, { ...product, quantity }] };
        });
      },
      removeFromCart: (productId) => {
        set(state => ({
          cart: state.cart.filter(item => item.id !== productId)
        }));
      },
      updateQuantity: (productId, quantity) => {
        set(state => ({
          cart: state.cart.map(item => 
            item.id === productId ? { ...item, quantity } : item
          )
        }));
      },
      clearCart: () => set({ cart: [] })
    }),
    { name: 'cart-storage' }
  )
);

