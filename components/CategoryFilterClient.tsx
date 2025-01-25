"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { generateFixedPrice } from "@/helper/PriceGenerator";

type ProductProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};

type CategoryFilterClientProps = {
  initialProducts: ProductProps[];
};

export default function CategoryFilterClient({
  initialProducts,
}: CategoryFilterClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [sortOption, setSortOption] = useState("");

  const handleSort = (value: string) => {
    setSortOption(value);

    const sortedProducts = [...products];

    if (value === "price-asc") {
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(generateFixedPrice(a.id)); 
        const priceB = parseFloat(generateFixedPrice(b.id));
        return priceA - priceB;
      });
    } else if (value === "price-desc") {
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(generateFixedPrice(a.id));
        const priceB = parseFloat(generateFixedPrice(b.id));
        return priceB - priceA;
      });
    }

    setProducts(sortedProducts);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl capitalize">Products</h1>
        <div className="flex">
          <select
            className="border p-2"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
