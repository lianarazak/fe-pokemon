import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonApi = defineStore("pokemon", {
  state: () => ({
    pokemonList: [],
    loading: false,
  }),
  actions: {
    async fetchPokemon() {
      this.loading = true;
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const data = res.data.results;

        // Fetch details of each Pokémon
        const detailedList = await Promise.all(
          data.map((pokemon) => axios.get(pokemon.url).then((res) => res.data))
        );

        this.pokemonList = detailedList;
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        this.loading = false;
      }
    },
    updatePokemon(id, updatedData) {
      const index = this.pokemonList.findIndex((p) => p.id === id);
      if (index !== -1)
        this.pokemonList[index] = {
          ...this.pokemonList[index],
          ...updatedData,
        };
    },
  },
});
