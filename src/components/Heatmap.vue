<template>
  <div class="github-container">

    <div class="month-label">
      {{ heatmap.monthName }}
    </div>

    <div class="graph">
      <div class="weekdays">
        <div
          v-for="day in weekdays"
          :key="day"
        >
          {{ day }}
        </div>
      </div>
      <div class="heatmap">
        <div
          v-for="(cell,index) in heatmap.cells"
          :key="index"
          class="cell"
          :class="cell ? getLevel(cell.count) : 'empty'"
          :title="cell ? `${cell.count} times on ${cell.date}.` : ''"
        />

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { generateGitHubMonth, getLevel } from '../composables/useHeatmap'

const usageData = ref({})

// {changes} and {area} are provided by the browser.
function updateUsageFromStorage(changes, area) {
  if (area === 'local' && changes.usage) {
    usageData.value = changes.usage.newValue || {}
  }
}

onMounted(async () => {
  const result = await chrome.storage.local.get('usage')
  usageData.value = result.usage || {}

  chrome.storage.onChanged.addListener(updateUsageFromStorage)
})

// to handle {leaking memory}
onUnmounted(() => {
  chrome.storage.onChanged.removeListener(updateUsageFromStorage)
})

const weekdays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const heatmap = computed(() =>
  generateGitHubMonth(usageData.value)
)
</script>

<style scoped>
.github-container {
  width: fit-content;
}

.month-label {
  margin-left: 55px;
  margin-bottom: 8px;
  font-weight: 600;
}

.graph {
  display: flex;
  gap: 10px;
}

.weekdays {
  display: grid;
  grid-template-rows: repeat(7, 14px);
  gap: 4px;
  font-size: 12px;
}

.heatmap {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 14px);
  gap: 4px;
}

.cell {
  width: 14px;
  height: 14px;
  border-radius: 2px;
}

.empty {
  background: transparent;
}

.level-0 {
  background: #ebedf0;
}

.level-1 {
  background: #9be9a8;
}

.level-2 {
  background: #40c463;
}

.level-3 {
  background: #30a14e;
}

.level-4 {
  background: #216e39;
}
</style>
