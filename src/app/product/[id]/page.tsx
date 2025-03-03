import CustomImage from "@/components/image";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const ProductDetail = async ({ params }: Props) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);

    if (!res.ok) {
      console.error(`Product not found: ${params.id}`);
      return notFound();
    }

    const product = await res.json();

    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-6 pb-10">
        <CustomImage product={product} />

        <div className="divide-2">
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl">${product.price}</h2>
          </div>

          <div className="pt-8">
            <p className="text-xs md:text-sm">{product.description}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
};

export default ProductDetail;
