"use client";
import { generateFixedPrice } from "@/helper/PriceGenerator";
import { useCartStore } from "@/store/StoreSlice";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const total = cart.reduce((sum, item) => {
    const price = Number(generateFixedPrice(item.id)) || 0; 
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);


  return (
    <div className="container mx-auto py-12 px-6">

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingBagIcon className="text-gray-400 text-6xl mb-4" />
          <p className="text-gray-600 text-lg">Your cart is empty!</p>
          <Link
            href="/"
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 mt-10">
          {cart.map((item) => {
            const calculatedPrice = generateFixedPrice(item.id);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-cover"
                />

                <div>
                  <h2 className="text-lg font-medium">{item.title}</h2>
                  <p>
                    ${calculatedPrice} x {item.quantity}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="px-2 border rounded-l hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 border rounded-r hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div className="text-right">
            <p className="text-2xl font-semibold">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="mt-4 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
