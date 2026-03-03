<template>
  <div class="stratagem-list">
    
    <div v-for="stratagem in sortedStratagems" :key="stratagem.id" class="stratagem-card">
      <div class="stratagem-header">
        <StratagemIcon 
          :icon-file="stratagem.icon" 
          :stratagem-name="stratagem.name"
        />
        <span class="stratagem-name">{{ stratagem.name }}</span>
        <span v-if="isUnlocked(stratagem)" class="unlocked">✓</span>
        <span class="difficulty" :class="'diff-' + stratagem.difficulty">
          {{ '★'.repeat(stratagem.difficulty) }}
        </span>
      </div>
      
      <!-- Отображение комбинации -->
      <div class="code-preview">
        <div 
          v-for="(direction, index) in stratagem.code" 
          :key="index"
          class="code-arrow"
        >
          <DirectionArrow 
            :direction="direction"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StratagemIcon from '../game/StratagemIcon.vue'
import DirectionArrow from '../game/DirectionArrow.vue'

const props = defineProps({
  stratagems: Array,
  unlocked: Array
})

const sortedStratagems = computed(() => {
  if (!props.stratagems) return []
  
  return [...props.stratagems].sort((a, b) => {
    if (a.difficulty !== b.difficulty) {
      return a.difficulty - b.difficulty
    }
    return a.name.localeCompare(b.name)
  })
})

const isUnlocked = (stratagem) => {
  return props.unlocked?.some(u => u.id === stratagem.id)
}
</script>

<style scoped>
.stratagem-list {
  color: white;
  background: var(--main-background);
  border-radius: 8px;
  padding: 0 15px;
  height: 100%;
  overflow-y: auto;
}

.stratagem-list h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--main-accent);
  text-align: center;
  font-size: 20px;
  border-bottom: 2px solid #4a4a4a;
  padding-bottom: 10px;
}

.stratagem-card {
  background: var(--primary-background);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #4a4a4a;
  transition: all 0.2s;
}

.stratagem-card:hover {
  border-color: var(--main-accent);
  transform: translateX(5px);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.stratagem-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.stratagem-name {
  flex: 1;
  font-size: 14px;
  font-weight: bold;
}

.unlocked {
  color: #4caf50;
  font-weight: bold;
}

.difficulty {
  font-size: 12px;
  min-width: 60px;
  text-align: right;
}

.diff-1 { color: #4caf50; }
.diff-2 { color: #8bc34a; }
.diff-3 { color: #ffc107; }
.diff-4 { color: #ff9800; }
.diff-5 { color: #f44336; }

/* Стили для превью комбинации */
.code-preview {
  display: flex;
  gap: 4px;
  justify-content: flex-start;
  padding-left: 44px; /* Выравнивание под иконку */
}

.code-arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

/* Стили для скроллбара */
.stratagem-list::-webkit-scrollbar {
  width: 8px;
}

.stratagem-list::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.stratagem-list::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 4px;
}

.stratagem-list::-webkit-scrollbar-thumb:hover {
  background: #5a5a5a;
}
</style>