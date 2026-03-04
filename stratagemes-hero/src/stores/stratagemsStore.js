import { defineStore } from 'pinia'
import stratagemsData from '@/data/stratagems.json'

export const useStratagemsStore = defineStore('stratagems', {
  state: () => ({
    allStratagems: stratagemsData.stratagems.sort(),
    unlockedStratagems: [],
    selectedStratagems: [],
    searchQuery: '',
    difficultyFilter: [] 
  }),
  getters: {
    filteredStratagems(state) {
      return state.allStratagems.filter(s => {
        const matchesSearch =
          !state.searchQuery ||
          s.name.toLowerCase().includes(state.searchQuery.toLowerCase())

        const matchesDifficulty =
          state.difficultyFilter.length === 0 ||
          state.difficultyFilter.includes(s.difficulty)

        return matchesSearch && matchesDifficulty
      })
    },
  },
  actions: {
    unlockStratagem(stratagemId) {
      const stratagem = this.allStratagems.find(s => s.id === stratagemId)
      if (stratagem && !this.unlockedStratagems.includes(stratagem)) {
        this.unlockedStratagems.push(stratagem)
      }
    },
    toggleStratagemSelection(stratagem) {
      const index = this.selectedStratagems.findIndex(
        s => s.id === stratagem.id
      )

      if (index === -1) {
        this.selectedStratagems.push(stratagem)
      } else {
        this.selectedStratagems.splice(index, 1)
      }
    },
    getPlayableStratagems() {
      if (this.selectedStratagems.length > 0) {
        return this.selectedStratagems
      }

      if (this.unlockedStratagems.length > 0) {
        return this.unlockedStratagems
      }

      return this.allStratagems
   },
    getRandomStratagem() {
      const available = this.getPlayableStratagems()
      
      
      const randomIndex = Math.floor(Math.random() * available.length)
      const selected = available[randomIndex]
      
      return selected
    },
    resetFilters() {
      this.searchQuery = ''
      this.difficultyFilter = []
    },
  }
})