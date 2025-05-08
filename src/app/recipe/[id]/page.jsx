import Image from "next/image";
import Link from "next/link";
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
    <main className="container max-w-5xl px-6 py-12 mx-auto">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="inline-block mb-6 text-coral font-medium hover:font-semibold"
      >
        ← Back to Home
      </Link>
      <article>
        {/* Header Section */}
        <header>
          <div className="flex gap-2 justify-center mb-4 flex-wrap">
            {recipe.diets.map((diet) => (
              <Chip key={diet} name={diet} />
            ))}
          </div>
          <h1 className="flex justify-center text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
            {recipe.title}
          </h1>
          <div className="flex justify-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-sm md:text-base">
              <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-coral" />
              {recipe.readyInMinutes} minutes
            </div>
            <div className="flex items-center gap-1 text-sm md:text-base">
              <UsersIcon className="w-4 h-4 md:w-5 md:h-5 text-coral" />
              {recipe.servings} servings
            </div>
            <div className="flex items-center gap-1 text-sm md:text-base">
              <HeartIcon className="w-4 h-4 md:w-5 md:h-5 text-coral" />
              {recipe.aggregateLikes}
            </div>
          </div>
        </header>

        {/* Recipe Image */}
        <Image
          className="rounded-lg mb-6 w-full h-auto"
          src={recipe.image}
          alt={recipe.title}
          width={600}
          height={400}
          priority
        />

        {/* Recipe Summary */}
        <section aria-labelledby="recipe summary" className="mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4">
            Recipe overview
          </h2>
          <p
            className="leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          ></p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recipe Ingredients */}
          <section
            aria-labelledby="recipe ingredients"
            className="mb-6 bg-gray-100 rounded-md p-6"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4">
              Ingredients
            </h2>
            <ul className="list-none space-y-2">
              {recipe.extendedIngredients.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-coral before:text-xl"
                >
                  {item.original}
                </li>
              ))}
            </ul>
          </section>

          {/* Recipe Instructions */}
          <section aria-labelledby="recipe instructions">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4">
              Instructions
            </h2>
            {recipe.analyzedInstructions?.[0]?.steps?.length > 0 ? (
              <ol className="list-none space-y-4 leading-relaxed">
                {recipe.analyzedInstructions[0].steps.map((step, index) => (
                  <li
                    key={`${step.number}-${index}`}
                    className="relative pl-12"
                  >
                    <span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full border-1 border-coral text-coral text-xl">
                      {step.number}
                    </span>
                    {step.step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500">No instructions available.</p>
            )}
          </section>
        </div>
      </article>
    </main>
  );
}
