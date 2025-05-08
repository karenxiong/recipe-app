"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import SearchForm from "@/components/SearchForm";
import PaginationNumbers from "@/components/PaginationNumbers";
import RecipeCards from "@/components/RecipeCards";

import { searchRecipes } from "@/utils/spoonacular";

const RECIPES_PER_PAGE = 5;

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [cuisine, setCuisine] = useState("");

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [cuisine, page]);

  const handleSearch = async ({ goToFirstPage = false } = {}) => {
    let pageToSearch = page;
    if (goToFirstPage && page !== 1) {
      setPage(1);
      return;
    }

    setLoading(true);
    setError(null);

    const offset = (pageToSearch - 1) * RECIPES_PER_PAGE;

    try {
      const data = await searchRecipes(
        searchInput,
        cuisine,
        offset,
        RECIPES_PER_PAGE
      );
      setHasSearched(true);
      setRecipes(data.results || []);
      setTotalResults(data.totalResults || 0);
      setTotalPages(Math.ceil(data.totalResults / RECIPES_PER_PAGE));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="flex mx-auto max-w-7xl px-4 my-8">
        <div className="py-16 md:py-10">
          <h1 className="mb-6 font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Discover <span className="italic text-coral">delicious</span>{" "}
            recipes for every occasion
          </h1>
          <SearchForm
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            cuisine={cuisine}
            setCuisine={setCuisine}
            fetchRecipes={() => {
              handleSearch({ goToFirstPage: true });
            }}
          />
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
        {hasSearched && (
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium">
            <span className="text-coral text-semibold">{totalResults}</span>{" "}
            {totalResults === 1 ? "recipe found" : "recipes found"}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {loading && (
            <p className="text-gray-500 col-span-full text-center">
              Loading recipes...
            </p>
          )}

          {error && (
            <p className="text-red-500 col-span-full text-center">{error}</p>
          )}

          {!loading && hasSearched && recipes.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No recipes found. Try something else!
            </p>
          )}

          {!loading &&
            recipes.map((recipe) => (
              <RecipeCards key={recipe.id} recipe={recipe} />
            ))}
        </div>
        <PaginationNumbers
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          pageSize={RECIPES_PER_PAGE}
        />
      </section>
    </>
  );
}
