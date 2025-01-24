import { medusaClient } from "@/medusaClient";
import CategoryFilterClient from "@/components/CategoryFilterClient";

interface CategoryPageProps {
  params: { category: string };
}

export async function generateStaticParams() {
  const { collections } = await medusaClient.collections.list();

  return collections.map((collection: { id: string }) => ({
    category: collection.id,
  }));
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = params;

  const { products } = await medusaClient.products.list({
    collection_id: category ? [category] : [],
  });

  const validProducts = products.filter((product: { id: string }) => product.id);

  return (
    <section className="container mx-auto py-20 px-4">
      <div className="container mx-auto py-10">
        <CategoryFilterClient initialProducts={validProducts} />
      </div>
    </section>
  );
};

export default CategoryPage;
