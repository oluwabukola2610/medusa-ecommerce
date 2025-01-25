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
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              {cart.map((item) => {
                const calculatedPrice = generateFixedPrice(item.id);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between bg-white shadow rounded-lg p-4 border"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={120}
                      height={120}
                      className="object-cover rounded-md"
                    />{" "}
                    <div className="flex-grow mt-4 md:mt-0 md:ml-6">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-gray-500">
                        ${calculatedPrice} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center mt-5 md:mt-0 ">
                      <div className="flex items-center ">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-3 py-1 border rounded-l-lg hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 border rounded-r-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 ml-4 md:ml-6"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white shadow rounded-lg p-6 border">
              <h3 className="text-xl font-semibold border-b pb-4">
                Order Summary
              </h3>
              <div className="mt-4">
                <p className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-gray-600 mt-2">
                  <span>Tax (10%)</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-lg font-semibold mt-4">
                  <span>Total</span>
                  <span>${(total * 1.1).toFixed(2)}</span>
                </p>
              </div>
              <Link
                href="/checkout"
                className="block mt-6 bg-blue-600 text-white text-center py-3 rounded-lg shadow hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
