import React from "react";
import { ALL_CUISINES, CUISINES } from "@/utils/cuisines";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function SearchForm({
  searchInput,
  setSearchInput,
  cuisine,
  setCuisine,
  fetchRecipes,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit} role="search">
      <div className="flex w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-nowrap flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-l-1 border-t-1 border-b-1 border-r-0.5 border-gray-300 rounded-l-lg hover:bg-gray-50 cursor-pointer">
            {cuisine || ALL_CUISINES}
            <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-60 overflow-auto bg-white border-gray-300"
          >
            {CUISINES.map((currentCuisine) => (
              <DropdownMenuItem
                key={currentCuisine}
                className={`${
                  currentCuisine === cuisine ? "text-coral" : ""
                } cursor-pointer hover:bg-gray-100`}
                onClick={() => {
                  setCuisine(
                    currentCuisine === ALL_CUISINES ? "" : currentCuisine
                  );
                }}
              >
                {currentCuisine}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <label className="sr-only" htmlFor="recipe-search">
          Search for a recipe
        </label>
        <div className="relative w-full flex-grow items-baseline">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            className="py-3 pl-10 pr-3 w-full flex-grow border-solid border-1 border-gray-300 rounded-r-xl focus:outline-coral"
            type="text"
            id="recipe-search"
            name="search"
            placeholder="Search for recipe..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
      </div>
      <Button className="h-auto px-4 bg-coral rounded-xl font-bold text-white hover:bg-darkcoral">
        Search
      </Button>
    </form>
  );
}
export default SearchForm;
