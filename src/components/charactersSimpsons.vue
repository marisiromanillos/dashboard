<script setup lang="ts">
import { onMounted } from 'vue'
import { useSimpsonsApi } from '@/stores/character'

const simpsonsStore = useSimpsonsApi()

onMounted(() => {
  simpsonsStore.fetchCharacters(5)
})
</script>
<template>
  <div v-if="simpsonsStore.isLoading">loading...</div>
  <div v-else-if="simpsonsStore.error">{{ simpsonsStore.error }}</div>
  <div v-else-if="simpsonsStore.characters.length > 0">
    <div v-for="(character, index) in simpsonsStore.characters" :key="index">
      <p class="text-black">{{ character.character }}</p>
      <p class="text-black">{{ character.quote }}</p>
      <img :src="character.image" />
    </div>
  </div>
</template>
