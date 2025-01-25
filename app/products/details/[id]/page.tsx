import ProductDetailsClient from "@/components/ProductDetails";
import { medusaClient } from "@/medusaClient";

export async function generateStaticParams() {
  try {
    const { products } = await medusaClient.products.list();
    return products.map((product: { id: string }) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function page({ params }: { params: { id: string } }) {
  try {
    const { product } = await medusaClient.products.retrieve(params.id);

    return (
      <div className="container mx-auto py-12 px-6 mt-12">  
        <h1 className="text-2xl font-semibold">{product.title}</h1>
          <ProductDetailsClient product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error retrieving product:", error);
    return <div>Error loading product details.</div>;
  }
}
