<template>
  <div class="game-layout">
    <aside class="sidebar">
      <slot name="sidebar"></slot>
    </aside>
    <main class="main-content">
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script setup>
// Этот компонент просто предоставляет структуру
</script>

<style scoped>
.game-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  min-height: 100vh;
}

.sidebar {
  background-color: #2a2a2a;
  border-right: 2px solid #4a4a4a;
}

.main-content {
  background-color: #1a1a1a;
}
</style>