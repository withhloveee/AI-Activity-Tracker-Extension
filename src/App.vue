<template>
  <div class="app-container">
    <div class="header">
      <h1>Your AI activity this month</h1>
    </div>

    <div class="card">
      <Heatmap />
    </div>
  </div>
</template>

<script setup>
import Heatmap from './components/Heatmap.vue'
</script>

<style>
:root {
  color-scheme: light dark;
}

body {
  margin: 0;
  width: 250px;

  font-family:
    Inter,
    system-ui,
    sans-serif;
}

.app-container {
  width: 100%;
  box-sizing: border-box;

  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
}

.header h1 {
  margin: 0;

  font-size: 1.4rem;
  font-weight: 700;
}

.header p {
  margin: 6px 0 0 0;

  font-size: 0.85rem;
  opacity: 0.7;
}

.card {
  margin-top: 16px;

  border-radius: 16px;
  padding: 16px;

  background: light-dark(
    #ffffff,
    #1f2937
  );

  border: 1px solid light-dark(
    #e5e7eb,
    #374151
  );

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.08);
}

@media (prefers-color-scheme: dark) {
  body {
    background: #111827;
    color: #f9fafb;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background: #f8fafc;
    color: #111827;
  }
}
</style>