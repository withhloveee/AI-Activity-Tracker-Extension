<template>
  <div v-for="(cell,index) in data.cells" :key="index">
    {{ cell }}
  </div>

</template>

<script setup>
import { generateGitHubMonth } from './composables/useHeatmap'

const data = generateGitHubMonth()
console.log(data);
</script>