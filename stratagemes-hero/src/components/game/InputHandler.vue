<template>
  <div class="input-handler">
    <!-- Невидимый компонент, только эмитит события -->
  </div>
</template>

<script setup>
import { useKeyHandler } from '@/composables/useKeyHandler'

const emit = defineEmits(['input'])

useKeyHandler((direction) => {
  emit('input', direction)
})
</script>