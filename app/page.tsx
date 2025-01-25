import ProductCard from "@/components/ProductCard";
import { medusaClient } from "@/medusaClient";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const { collections } = await medusaClient.collections.list();
  const { products } = await medusaClient.products.list();

  return (
    <>
      <section className="bg-[#F8F9FB] py-20 lg:h-screen flex items-center">
        <div className="container mx-auto flex flex-col items-center px-4 mt-16">
          <div className="w-full md:max-w-3xl flex flex-col items-center justify-center mt-12">
            <h1 className="text-[18px] md:text-[42px] text-black mb-4 text-center">
              Launch Your E-Commerce Platform with Trade Enablers and Next.js
            </h1>
            <p className="text-primary text-base mb-8 text-center">
              Easily start your online store using our ready-made templates and
              tools.
            </p>
            <Link
              href="/"
              className="bg-white text-black py-3 px-6 rounded shadow border flex items-center gap-3"
            >
              View on GitHub
            </Link>
          </div>
          <div className="w-full h-full lg:h-[70%] lg:w-[70%]">
            <Image
              src="/assets/Rocket.png"
              alt="Rocket Illustration"
              width={300}
              height={300}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto py-20 px-4">
          {collections.length > 0 ? (
            collections.map(
              (collection: { id: string; title?: string }, index: number) => (
                <CategorySection
                  key={collection.id}
                  category={{
                    id: collection.id,
                    title: collection.title || "Untitled Collection",
                  }}
                  products={products.filter(
                    (product: { collection: { id: string } }) =>
                      product.collection?.id === collection.id
                  )}
                  isLast={index === collections.length - 1}
                />
              )
            )
          ) : (
            <div>No collections found</div>
          )}
        </section>
    </>
  );
};

export default Home;

const CategorySection = ({
  category,
  products,
  isLast = false,
}: {
  category: { id: string; title: string };
  products: ProductProps[];
  isLast?: boolean;
}) => {
  return (
    <div className={`py-10 ${!isLast && "border-b"}`}>
      <span className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl text-black capitalize">
          {category?.title}
        </h2>
        <Link
          href={`/products/${category?.id}`}
          className="text-[#0073E6] text-base flex items-center gap-x-2"
        >
          See all <ArrowRight size={15} />
        </Link>
      </span>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
