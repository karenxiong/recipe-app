import React, { useState } from "react";
import { CUISINES } from "@/utils/cuisines";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function SearchInput({ onSearch, selectedCuisine, setSelectedCuisine }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit} role="search">
      <div className="flex w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-nowrap flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-l-1 border-t-1 border-b-1 border-r-0.5 border-gray-300 rounded-l-lg hover:bg-gray-50">
            {selectedCuisine || "All Cuisines"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-60 overflow-auto bg-white"
          >
            {CUISINES.map((cuisine) => (
              <DropdownMenuItem
                key={cuisine}
                className={selectedCuisine === cuisine ? "text-coral" : ""}
                onClick={() =>
                  setSelectedCuisine(
                    cuisine === "All Cuisines" ? null : cuisine
                  )
                }
              >
                {cuisine}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <label className="sr-only" htmlFor="recipe-search">
          Search for a recipe
        </label>
        <div className="relative w-full flex-grow items-baseline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            className="py-3 pl-10 pr-3 w-full flex-grow border-solid border-1 border-gray-300 rounded-r-xl focus:outline-coral"
            type="text"
            id="recipe-search"
            name="search"
            placeholder="Search for a recipe..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <Button className="h-auto px-4 bg-coral rounded-xl font-bold text-white hover:bg-darkcoral">
        Search
      </Button>
    </form>
  );
}
export default SearchInput;
