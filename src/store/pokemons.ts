import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { buildURL } from "../tools/tools.ts";
import { BASE_URL, getImgUrl } from "./api.ts";

export type FetchPokemonsParams = {
  takeCount: number;
  offset: number;
};

type Pokemon = {
  id: number | string;
  name: string;
  image: string;
  url: string;
};

type PokemonsState = {
  list: Pokemon[];
  isLoading: boolean;
  error: string | null;
};

type PokemonsActions = {
  fetchPokemons: (params: FetchPokemonsParams) => void;
};

const pokemonsSlice: StateCreator<PokemonsActions & PokemonsState> = (
  set,
  getState,
) => ({
  list: [],
  isLoading: false,
  error: null,
  fetchPokemons: async ({ takeCount, ...params }) => {
    try {
      set({ isLoading: true });

      const url = buildURL(BASE_URL + "/pokemon", {
        ...params,
        limit: takeCount,
      });
      const resp = await fetch(url);
      const json: { results: { name: string; url: string }[] } =
        await resp.json();

      const list = json.results.map(({ name, url }) => {
        const id = url.split("/").at(-2)!;
        return {
          id,
          name,
          image: getImgUrl(id),
          url,
        };
      });

      set({ list: [...getState().list, ...list], isLoading: false });
    } catch (err) {
      console.error(err);
      set({ error: "fetchPokemons: something went wrong" });
    }
  },
});

export const usePokemonsStore = create<PokemonsActions & PokemonsState>()(
  devtools(pokemonsSlice),
);
