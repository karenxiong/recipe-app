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
    if (res.status === 402) {
      throw new Error(
        "Your daily points limit of 150 has been reached. Reach out to Karen Xiong to get a new API KEY or use your own :)"
      );
    } else {
      throw new Error(`API error: ${res.statusText}`);
    }
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
    addRecipeInstructions: true,
  });
};

export const getRecipeById = (id) => {
  return fetchFromSpoonacular(`/recipes/${id}/information`);
};
