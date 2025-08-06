<template>
  <div class="container py-4">
    <!-- <div> -->
    <h1>Pokémon</h1>

    <div class="row mb-3">
      <div class="col-12 col-md-4">
        <input
          v-model="search"
          class="form-control"
          placeholder="Search Pokémon..."
        />
      </div>
    </div>

    <Loader v-if="loading" />
    <div v-else class="row row-cols-1 row-cols-md-4 g-4">
      <!-- <div v-else class="row row-cols-md-4 g-4"> -->
      <Card
        v-for="pokemon in filteredPokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
        @click="goToDetail(pokemon.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePokemonApi } from "@/stores/pokemon-api";
import Card from "@/components/Card.vue";
import Loader from "@/components/Loader.vue";
import { useRouter } from "vue-router";

const store = usePokemonApi();
const search = ref("");
const router = useRouter();

onMounted(() => {
  if (!store.pokemonList.length) store.fetchPokemon();
});

const filteredPokemon = computed(() =>
  store.pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const loading = computed(() => store.loading);

function goToDetail(id) {
  router.push(`/pokemon/${id}`);
}
</script>
