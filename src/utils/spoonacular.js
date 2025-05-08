const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const BASE_URL = "https://api.spoonacular.com";

const fetchFromSpoonacular = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("apiKey", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }
  return res.json();
};

export const searchRecipes = (query, cuisine = "", offset = 0, number = 5) => {
  return fetchFromSpoonacular("/recipes/complexSearch", {
    query,
    cuisine,
    offset,
    number,
    addRecipeInformation: true,
  });
};

export const getRecipeById = (id) => {
  return fetchFromSpoonacular(`/recipes/${id}/information`);
};

export const getCuisines = () => {
  return fetchFromSpoonacular("/recipes/cuisines");
};
