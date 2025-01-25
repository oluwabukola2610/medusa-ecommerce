"use client";
import { generateFixedPrice } from "@/helper/PriceGenerator";
import { useCartStore } from "@/store/StoreSlice";
import Image from "next/image";

type ProductDetailsProps = {
  product: {
    id: string;
    title: string;
    price: string;
    description: string;
    thumbnail: string;
    images: Array<{ url: string }>;
  };
};

const ProductDetailsPage = ({ product }: ProductDetailsProps) => {
  const { addToCart } = useCartStore();
  const fixedPrice = generateFixedPrice(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="relative rounded-lg shadow overflow-hidden">
          <Image
            width={300}
            height={300}
            src={product.thumbnail}
            alt={product.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded">
            New
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.title}
          </h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <div className="text-3xl font-bold text-blue-600">${fixedPrice}</div>
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <div className="">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              More Images
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {product.images.length > 0 &&
                product.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-24 md:h-32 rounded-lg overflow-hidden"
                  >
                    <Image
                      width={200}
                      height={200}
                      src={image.url}
                      alt={`Image ${index + 1} of ${product.title}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:absolute -z-10 w-64 h-64 md:w-96 md:h-96 bg-blue-200 opacity-50 rounded-full blur-xl transform -translate-y-20 md:-translate-y-32 right-10"></div>
    </div>
  );
};

export default ProductDetailsPage;
