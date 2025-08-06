<template>
  <div class="container py-4" v-if="pokemon">
    <div class="col text-center">
      <div class="card mx-auto card border-warning" style="width: 18rem">
        <img :src="pokemon.sprites.front_default" class="card-img-top" />
      </div>
    </div>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <div class="mt-4">
            <!-- Row: Name -->
            <div class="d-flex align-items-center mb-3">
              <label class="me-3 mb-0 text-end" style="width: 80px"
                ><strong>Name:</strong></label
              >
              <input
                v-model="editName"
                class="form-control"
                placeholder="Edit Name"
              />
            </div>

            <!-- Row: Height -->
            <div class="d-flex align-items-center mb-3">
              <label class="me-3 mb-0 text-end" style="width: 80px"
                ><strong>Height:</strong></label
              >
              <input :value="pokemon?.height" class="form-control" disabled />
            </div>

            <!-- Row: Weight -->
            <div class="d-flex align-items-center mb-3">
              <label class="me-3 mb-0 text-end" style="width: 80px"
                ><strong>Weight:</strong></label
              >
              <input :value="pokemon?.weight" class="form-control" disabled />
            </div>

            <!-- Row: Types -->
            <div class="d-flex align-items-center mb-4">
              <label class="me-3 mb-0 text-end" style="width: 80px"
                ><strong>Types:</strong></label
              >
              <input
                :value="pokemon.types.map((t) => t.type.name).join(', ')"
                class="form-control"
                disabled
              />
            </div>

            <div class="d-flex justify-content-center gap-2">
              <!-- Back Button -->
              <button class="btn btn-secondary w-40" @click="router.push('/')">
                Back
              </button>

              <!-- Save Button -->
              <button
                class="btn btn-primary w-40"
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
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { usePokemonApi } from "@/stores/pokemon-api";
import { ref, computed, watchEffect } from "vue";

const route = useRoute();
const router = useRouter();

const id = parseInt(route.params.id);
const store = usePokemonApi();

const pokemon = computed(() => store.pokemonList.find((p) => p.id === id));
const editName = ref(pokemon.value?.name || "");
const saving = ref(false);

watchEffect(() => {
  if (!pokemon?.value) {
    router.push("/");
  }
});

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
