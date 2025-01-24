
"use client"
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

  console.log(product);

  return (
    <div className="container mx-auto py-12 px-6 ">
      <div className="md:flex-row  flex flex-col gap-8">
        <div className="  md:w-[96] md:h-96 rounded-lg shadow p-3">
          <Image
            width={500}
            height={500}
            src={product.thumbnail}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-row md:flex-col gap-6">
          {product.images.length > 0 &&
            product.images.map((image, index) => (
              <div
                key={index}
                className="w-24 h-24 rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  width={200}
                  height={200}
                  src={image.url}
                  className="object-cover w-full h-full"
                  alt={`Image ${index + 1} of ${product.title}`}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Product Description */}
      <p className="mt-6 text-lg text-gray-600 md:max-w-md">
        {product.description}
      </p>

      <div className="flex items-center gap-4">
        <span className="text-3xl font-semibold">${fixedPrice}</span>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full md:w-1/2 mt-4 bg-blue-600 text-white py-3 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailsPage;
