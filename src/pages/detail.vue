<template>
  <div class="container py-4" v-if="pokemon">
    <h2 class="mb-3">{{ pokemon.name.toUpperCase() }}</h2>

    <!-- <img :src="pokemon.sprites.front_default" class="img-fluid" /> -->
    <!-- <div class="card align-items-center" style="width: 18rem">
      <img :src="pokemon.sprites.front_default" class="card-img-top" />
    </div> -->
    <div class="col text-center">
      <div class="card mx-auto" style="width: 18rem">
        <img :src="pokemon.sprites.front_default" class="card-img-top" />
      </div>
    </div>

    <div class="col text-center mt-3">
      <p><strong>Height:</strong> {{ pokemon.height }}</p>
      <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
      <p>
        <strong>Types:</strong>
        {{ pokemon.types.map((t) => t.type.name).join(", ") }}
      </p>

      <div class="mt-4">
        <input
          v-model="editName"
          class="form-control mb-2"
          placeholder="Edit Name"
        />
        <button class="btn btn-primary" @click="updateInfo">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>
<!-- <template>
  <div>
    <h2>Pokémon Detail Page</h2>
    <p>ID: {{ $route.params.id }}</p>
  </div>
</template> -->

<script setup>
import { useRoute } from "vue-router";
// import { usePokemonApi } from "@/store/usePokemonApi";
import { usePokemonApi } from "@/stores/pokemon-api";
import { ref, computed } from "vue";

const route = useRoute();
const id = parseInt(route.params.id);
const store = usePokemonApi();

const pokemon = computed(() => store.pokemonList.find((p) => p.id === id));
const editName = ref(pokemon.value?.name || "");

function updateInfo() {
  store.updatePokemon(id, { name: editName.value });
}
</script>
