import { medusaClient } from "@/medusaClient";
import CategoryFilterClient from "@/components/CategoryFilterClient";

interface CategoryPageProps {
  params: { category: string };
}

export async function generateStaticParams() {
  const { collections } = await medusaClient.collections.list();
  if (!collections || collections.length === 0) {
    console.error("No collections found.");
    return [];
  }
  return collections.map((collection: { id: string }) => ({
    category: collection.id,
  }));
}

 const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = params;

  try {
    const { products } = await medusaClient.products.list({
      collection_id: category ? [category] : [],
    });

    console.log("Fetched products:", products); 

    const validProducts = products?.filter(
      (product: { id: string }) => product.id
    ) || [];

    if (validProducts.length === 0) {
      return (
        <section className="container mx-auto py-20 px-4">
          <p>No products found for this category.</p>
        </section>
      );
    }

    return (
      <section className="container mx-auto py-20 px-4">
        <div className="container mx-auto py-10">
          <CategoryFilterClient initialProducts={validProducts} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <section className="container mx-auto py-20 px-4">
        <p>Failed to load products. Please try again later.</p>
      </section>
    );
  }
};

export default CategoryPage