<script setup lang="ts">
const itemsData = [
  { title: "Machine Learning", color: "warning" },
  { title: "LLM", color: "error" },
  { title: "AI", color: "info" },
  { title: "Operation Research", color: "success" },
  { title: "Safety", color: "info" },
  { title: "RAG", color: "error" },
  { title: "Reinforcement Learning", color: "warning" },
  { title: "Decision Making", color: "success" },
  { title: "Optimization", color: "success" },
  { title: "Game Theory", color: "neutral" },
  { title: "Probabilistic Models", color: "neutral" }
];
const grid = [];
const rows = 3;
const cols = 4;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    grid.push({ r, c });
  }
}

const shuffledGrid = grid.sort(() => Math.random() - 0.5);
const items = itemsData.map((item, index) => {
  const slot = shuffledGrid[index];
  const left = (slot.c * (100 / cols)) + (Math.random() * 5);
  const top = (slot.r * (100 / rows)) + (Math.random() * 5);
  return {
    ...item,
    left,
    top,
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
    duration: 2 + Math.random() * 3
  };
});
</script>

<template>
  <UPageCard
      title="AI4DM Reading Group"
      description="A collaborative space for researchers and practitioners to discuss cutting-edge developments in AI for Decision Making..."
      orientation="horizontal"
      highlight
      highlight-color="neutral"
  >
    <div class="right-card relative w-full h-48 rounded-md p-4 overflow-visible">
      <div
          v-for="(item, index) in items"
          :key="index"
          class="floating-badge"
          :style="{
          '--init-left': `${item.left}%`,
          '--init-top': `${item.top}%`,
          '--move-x': `${item.x}px`,
          '--move-y': `${item.y}px`,
          '--duration': `${item.duration}s`
        }"
      >
        <UBadge size="md" :color="item.color" variant="subtle" class="pointer-events-none select-none">
          {{ item.title }}
        </UBadge>
      </div>
    </div>

    <div class="informations mt-4">
      <div>Every week on Thursdays</div>
      <div class="past-recordings text-sm text-gray-500">
        Past recordings could be found on our YouTube channel
      </div>
    </div>
  </UPageCard>
</template>

<style scoped lang="postcss">
.floating-badge {
  position: absolute;
  /* Set initial random position */
  left: var(--init-left);
  top: var(--init-top);

  display: inline-block;
  animation: float-around var(--duration) ease-in-out infinite alternate;
  will-change: transform;
}

@keyframes float-around {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(var(--move-x), var(--move-y));
  }
}
</style>