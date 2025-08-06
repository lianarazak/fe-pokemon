<template>
  <div class="container py-4" v-if="pokemon">
    <h2 class="mb-3">{{ pokemon.name.toUpperCase() }}</h2>

    <div class="col text-center">
      <div class="card mx-auto" style="width: 18rem">
        <img :src="pokemon.sprites.front_default" class="card-img-top" />
      </div>
    </div>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 text-center">
          <p><strong>Height:</strong> {{ pokemon.height }}</p>
          <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
          <p>
            <strong>Types:</strong>
            {{ pokemon.types.map((t) => t.type.name).join(", ") }}
          </p>

          <div class="mt-4">
            <div class="d-flex align-items-center mb-3">
              <label class="me-2 mb-0"><strong>Name:</strong></label>
              <input
                v-model="editName"
                class="form-control"
                placeholder="Edit Name"
                style="max-width: 300px"
              />
            </div>

            <!-- <button class="btn btn-primary w-100" @click="updateInfo">
              Save Changes
            </button> -->
            <button
              class="btn btn-primary w-100"
              :disabled="saving"
              @click="updateInfo"
            >
              <span
                v-if="saving"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              {{ saving ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { usePokemonApi } from "@/stores/pokemon-api";
import { ref, computed } from "vue";

const route = useRoute();
const router = useRouter();

const id = parseInt(route.params.id);
const store = usePokemonApi();

const pokemon = computed(() => store.pokemonList.find((p) => p.id === id));
const editName = ref(pokemon.value?.name || "");
const saving = ref(false);

const updateInfo = async () => {
  saving.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    store.updatePokemon(id, { name: editName.value });
    router.push("/");
  } catch (error) {
    console.error("Save failed", error);
  } finally {
    saving.value = false;
  }
};
</script>
