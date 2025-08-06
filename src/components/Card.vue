<template>
  <div class="col">
    <div class="card h-100" @click="$emit('click')" style="cursor: pointer">
      <img :src="pokemon.sprites.front_default" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
        <p class="card-text">
          Type: {{ pokemon.types.map((t) => t.type.name).join(", ") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["pokemon"]);
</script>
