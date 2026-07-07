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
          :title="cell ? `${cell.date} - ${cell.count}` : ''"
        />

      </div>

    </div>

  </div>
</template>

<script setup>
import { generateGitHubMonth, getLevel } from '../composables/useHeatmap'

const weekdays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const testData = {
  '2026-07-01': 0,
  '2026-07-02': 1,
  '2026-07-03': 2,
  '2026-07-04': 3,
  '2026-07-05': 4,

  '2026-07-06': 0,
  '2026-07-07': 1,
  '2026-07-08': 2,
  '2026-07-09': 3,
  '2026-07-10': 4,

  '2026-07-11': 0,
  '2026-07-12': 1,
  '2026-07-13': 2,
  '2026-07-14': 3,
  '2026-07-15': 4,

  '2026-07-16': 0,
  '2026-07-17': 1,
  '2026-07-18': 2,
  '2026-07-19': 3,
  '2026-07-20': 4
}

const heatmap = generateGitHubMonth(testData)
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