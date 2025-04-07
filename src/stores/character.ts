import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

interface Simpsons {
  quote: string
  character: string
  image: string
  characterDirection: string
}

export const useSimpsonsApi = defineStore('simpsonsCharacters', () => {
  const characters = ref<Simpsons[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  async function fetchCharacters(count: number = 1) {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get<Simpsons[]>(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=${count}`,
      )
      characters.value = response.data
      console.log(response)
    } catch (err) {
      console.error('failed to fetch', err)
      error.value = 'failed to fetch'
      characters.value = []
    } finally {
      isLoading.value = false
    }
  }
  return {
    characters,
    isLoading,
    error,
    fetchCharacters,
  }
})
