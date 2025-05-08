"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "@/components/searchinput";
import RecipeCards from "@/components/recipecards";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { searchRecipes } from "@/utils/spoonacular";

export default function Home() {
  const RECIPES_PER_PAGE = 5;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchInputText, setSearchInputText] = useState("");

  const handleSearch = async (
    query,
    cuisine = selectedCuisine,
    pageNum = page
  ) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setPage(pageNum);
    setHasSearched(true);

    const offset = (pageNum - 1) * RECIPES_PER_PAGE;

    try {
      const data = await searchRecipes(
        query,
        cuisine,
        offset,
        RECIPES_PER_PAGE
      );
      setRecipes(data.results || []);
      setTotalResults(data.totalResults || 0);
      setTotalPages(Math.ceil(data.totalResults / RECIPES_PER_PAGE));
    } catch (err) {
      setError("Could not find recipes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
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
          <SearchInput
            value={searchInputText}
            onInputChange={setSearchInputText}
            onSearch={(query) => {
              setPage(1);
              handleSearch(query, selectedCuisine, 1);
            }}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={(cuisine) => {
              setPage(1);
              setSelectedCuisine(cuisine);
              handleSearch(searchInputText, cuisine, 1);
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
            {totalResults === 1 ? "recipe" : "recipes"} found
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

          {!loading && !hasSearched && (
            <p className="text-gray-500 col-span-full text-center">
              Start by searching for some{" "}
              <span className="italic text-coral">delicious</span> recipes!
            </p>
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
        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={`${
                    page === 1
                      ? "cursor-default text-gray-400"
                      : "cursor-pointer text-black hover:text-coral"
                  } transition`}
                  disabled={page === 1}
                  onClick={() => {
                    if (page > 1)
                      handleSearch(searchQuery, selectedCuisine, page - 1);
                    setPage(page - 1);
                  }}
                />
              </PaginationItem>
              {(() => {
                const pages = [];

                let startPage = Math.max(1, page - 2);
                let endPage = Math.min(
                  totalPages,
                  startPage + RECIPES_PER_PAGE - 1
                );

                if (endPage - startPage < RECIPES_PER_PAGE - 1) {
                  startPage = Math.max(1, endPage - RECIPES_PER_PAGE + 1);
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        className="cursor-pointer"
                        isActive={page === i}
                        onClick={() => {
                          if (page !== i)
                            handleSearch(searchQuery, selectedCuisine, i);
                          setPage(i);
                        }}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                return pages;
              })()}

              <PaginationItem>
                <PaginationNext
                  className={`${
                    page === totalPages
                      ? "cursor-default text-gray-400"
                      : "cursor-pointer text-black hover:text-coral"
                  } transition`}
                  disabled={page === totalPages}
                  onClick={() => {
                    if (page < totalPages)
                      handleSearch(
                        searchQuery,
                        selectedCuisine,
                        page + 1,
                        true
                      );
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </>
  );
}
