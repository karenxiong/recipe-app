import Link from "next/link";
import Image from "next/image";
import SearchInput from "@/components/searchinput";
import RecipeCards from "@/components/recipecards";

export default function Home() {
  return (
    <>
      {/* Header with subtle pattern background */}
      <header className="relative border-b border-gray-100">
        <div className="container relative mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center py-4">
            <Link
              href="/"
              className="text-3xl font-serif italic tracking-wide text-coral"
            >
              recipes
            </Link>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="flex mx-auto max-w-7xl px-4 my-8">
        <div className="py-16 md:py-10">
          <h1 className="mb-6 font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Discover <span className="italic text-coral">delicious</span>{" "}
            recipes for every occasion
          </h1>
          <SearchInput />
        </div>
        <div className="relative w-full px-6 py-16 md:px-12 md:py-24 hidden md:block ml-8">
          <Image
            className="object-cover rounded-xl"
            src="/images/heroimage.png"
            alt="Delicious spread of pastries"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>
      {/* Recipe Search Results */}
      <section className="container mx-auto px-4 pb-12 max-w-7xl">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium">
          <span className="text-coral text-semibold">2</span> recipes found
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          <RecipeCards />
          <RecipeCards />
          <RecipeCards />
          <RecipeCards />
          <RecipeCards />
        </div>
      </section>
      {/* Featured Recipes */}
      <section className="container mx-auto px-4 pb-12 max-w-7xl">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium">
          Featured recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          <RecipeCards />
          <RecipeCards />
          <RecipeCards />
        </div>
      </section>
    </>
  );
}
