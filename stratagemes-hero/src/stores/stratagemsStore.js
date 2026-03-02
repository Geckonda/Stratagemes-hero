import { defineStore } from 'pinia'
import stratagemsData from '@/data/stratagems.json'

export const useStratagemsStore = defineStore('stratagems', {
  state: () => ({
    allStratagems: stratagemsData.stratagems.sort(),
    unlockedStratagems: []
  }),
  
  actions: {
    unlockStratagem(stratagemId) {
      const stratagem = this.allStratagems.find(s => s.id === stratagemId)
      if (stratagem && !this.unlockedStratagems.includes(stratagem)) {
        this.unlockedStratagems.push(stratagem)
      }
    },
    
    getRandomStratagem() {
      const available = this.unlockedStratagems.length 
        ? this.unlockedStratagems 
        : this.allStratagems
      
      
      const randomIndex = Math.floor(Math.random() * available.length)
      const selected = available[randomIndex]
      
      return selected
    }
  }
})