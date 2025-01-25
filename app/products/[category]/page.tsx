import { medusaClient } from "@/medusaClient";
import CategoryFilterClient from "@/components/CategoryFilterClient";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
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
};

export default CategoryPage;