import Image from "next/image";

function RecipeCards({ recipe }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
      <Image
        src={recipe.image}
        alt={`Image of ${recipe.title}`}
        width={600}
        height={400}
        className="w-full h-64 object-cover"
        style={{ aspectRatio: "600/400", objectFit: "cover" }}
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
      </div>
    </div>
  );
} 
export default RecipeCards;