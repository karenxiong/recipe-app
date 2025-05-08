import Image from "next/image";
import Chip from "@/components/ui/chip";

import { HeartIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";

import { getRecipeById } from "@/utils/spoonacular";

export default async function RecipePage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { id } = params;
  const recipe = await getRecipeById(id);
  return (
    <main className="container max-w-4xl px-6 py-12 mx-auto">
      <div className="flex gap-2 justify-center mb-4">
        {recipe.diets.map((diet) => (
          <Chip key={diet} name={diet} />
        ))}
      </div>
      <h1 className="flex justify-center text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
        {recipe.title}
      </h1>
      <div className="flex justify-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm md:text-md">
          <ClockIcon className="w-4 h-4 text-coral" />
          {recipe.readyInMinutes} minutes
        </div>
        <div className="flex items-center gap-1 text-sm">
          <UsersIcon className="w-4 h-4 text-coral" />
          {recipe.servings} servings
        </div>
        <div className="flex items-center gap-1 text-sm">
          <HeartIcon className="w-4 h-4 text-coral" />
          {recipe.aggregateLikes}
        </div>
      </div>
      <Image
        className="rounded-lg mb-6 w-full h-auto"
        src={recipe.image}
        alt={recipe.title}
        width={800}
        height={600}
        priority
      />
      <div className="mb-6">
        <h2 className="text-lg font-serif font-semibold mb-1">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.extendedIngredients.map((item) => (
            <li key={item.id}>{item.original}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-serif font-semibold mb-1">Instructions</h2>
        {recipe.analyzedInstructions?.[0]?.steps?.length > 0 ? (
          <ol className="list-decimal list-inside space-y-2 leading-relaxed">
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No instructions available.</p>
        )}
      </div>
    </main>
  );
}
