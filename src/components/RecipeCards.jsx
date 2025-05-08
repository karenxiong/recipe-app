import Image from "next/image";
import Link from "next/link";

import { HeartIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";

function RecipeCards({ recipe }) {
  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="flex flex-col items-center justify-center p-4 w-full"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950 h-full w-full flex flex-col">
        <Image
          src={recipe.image}
          alt={`Image of ${recipe.title}`}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
          style={{ aspectRatio: "600/400", objectFit: "cover" }}
        />
        <div className="p-4 space-y-2">
          <h3 className="text-md font-semibold flex justify-center text-wrap">
            {recipe.title}
          </h3>
        </div>
        <div>
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
        </div>
      </div>
    </Link>
  );
} 
export default RecipeCards;