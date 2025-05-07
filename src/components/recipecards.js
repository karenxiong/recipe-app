import Image from "next/image";

function RecipeCards() {
  return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
        <Image
          src="/images/heroimage.png"
          alt="Product Image"
          width={600}
          height={400}
          className="w-full h-64 object-cover"
          style={{ aspectRatio: "600/400", objectFit: "cover" }}
        />
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</h3>        </div>
      </div>
  )
} 
export default RecipeCards;