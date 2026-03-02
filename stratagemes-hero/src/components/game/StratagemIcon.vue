<template>
  <img 
    :src="iconPath" 
    :alt="stratagemName"
    class="stratagem-icon"
    :class="{ small, large }"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  iconFile: {
    type: String,
    required: true
  },
  stratagemName: {
    type: String,
    default: 'Стратагема'
  },
  small: Boolean,
  large: Boolean
})

const iconPath = computed(() => {
  // Vite автоматически обработает путь к assets

  return `/src/assets/icons/${props.iconFile}`
})
</script>

<style scoped>
.stratagem-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.stratagem-icon.small {
  width: 24px;
  height: 24px;
}

.stratagem-icon.large {
  width: 48px;
  height: 48px;
}
</style>