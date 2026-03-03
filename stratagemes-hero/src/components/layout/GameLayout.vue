<template>
  <div class="game-layout">
    <aside class="sidebar">
      <slot name="sidebar"></slot>
    </aside>
    <main class="main-content"
    :style="backgroundStyle">
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script setup>
// Этот компонент просто предоставляет структуру
import { computed } from 'vue';
const baseUrl = import.meta.env.BASE_URL
const backgroundStyle = computed(() => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(${baseUrl}super-earth-bg.webp) no-repeat center / cover`
}))
</script>

<style scoped>
.game-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  height: 100vh;
}

.sidebar {
  background-color: #2a2a2a;
  border-right: 2px solid #4a4a4a;

  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.main-content{  
  background-color: var(--primary-background);
}
</style>