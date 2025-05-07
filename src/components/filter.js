import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Filter() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2">
          All Cuisine{" "}
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
      <DropdownMenuContent>
        <DropdownMenuItem>American</DropdownMenuItem>
        <DropdownMenuItem>British</DropdownMenuItem>
        <DropdownMenuItem>Canadian</DropdownMenuItem>
        <DropdownMenuItem>French</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default Filter;
