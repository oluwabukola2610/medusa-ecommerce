import { medusaClient } from "@/medusaClient";
import CategoryFilterClient from "@/components/CategoryFilterClient";

interface CategoryPageProps {
  params: { category: string };
}


export async function generateStaticParams() {
  try {
    const { collections } = await medusaClient.collections.list();
    return collections.map((collection: { id: string }) => ({
      category: collection.id.toString()
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return []; 
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  try {
    const { category } = params;

    const { products } = await medusaClient.products.list({
      collection_id: category ? [category] : [],
    });

    const validProducts = products?.filter((product: { id: string }) => product.id) || [];

    return (
      <div>
        {validProducts.length > 0 ? (
          <CategoryFilterClient initialProducts={validProducts} />
        ) : (
          <div>No products found</div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Category page rendering error:", error);
    return <div>Error loading products</div>;
  }
};

export default CategoryPage