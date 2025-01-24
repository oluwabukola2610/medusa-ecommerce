"use client";
import { generateFixedPrice } from "@/helper/PriceGenerator";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({
  product,
}: {
  product: ProductProps;
}) => {
  const router = useRouter();
  const finalPrice = generateFixedPrice(product.id);
  return (
    <div
      onClick={() => router.push(`/products/details/${product.id}`)}
      className="flex flex-col"
    >
      <div className="relative bg-[#F8F9FB] rounded-lg p-4 h-full ">
        <button className="absolute md:top-4 top-2 left-1 md:left-4 bg-white text-black py-1 px-2 rounded text-xs flex items-center gap-2">
          <ShoppingCart size={15} />
          Add to Cart
        </button>
        <div className="flex justify-center">
          <Image
            src={product?.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-primary">{product.title}</p>
        <p className="text-black text-sm font-semibold">${finalPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
