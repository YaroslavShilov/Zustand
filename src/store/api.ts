export const BASE_URL = "https://pokeapi.co/api/v2";
export const getImgUrl = (pokemonId: number | string): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
