"use client";
import Link from "next/link";
import { AlignJustify, Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/StoreSlice";

const Header = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { cart } = useCartStore();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-[#F8F9FB] fixed z-20 w-full">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-1 text-primary bg-white p-2">
          <AlignJustify size={20} />
          <span className="text-primary hidden lg:block">Menu</span>
        </div>
        <Link href="/" className="text-lg font-bold text-primary">
          TE STORE
        </Link>
        <nav className="flex items-center space-x-4">
          <div
            className={`flex items-center text-primary bg-white p-2 rounded transition-all duration-300 ${
              searchExpanded ? "w-96 mr-4" : "w-8"
            }`}
          >
            <Search
              size={20}
              className="cursor-pointer"
              onClick={() => setSearchExpanded(!searchExpanded)}
            />
            {searchExpanded && (
              <input
                type="text"
                className="ml-2 flex-1 focus:outline-none"
                placeholder="Search"
              />
            )}
          </div>
          <Link
            href="/auth/signin"
            className="flex items-center space-x-2 text-primary bg-white p-2 rounded"
          >
            <User size={20} />
            <span className="hidden lg:block">Account</span>
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center space-x-2 text-primary bg-white p-2 rounded"
          >
            <ShoppingCart size={20} />
            <span className="hidden lg:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;