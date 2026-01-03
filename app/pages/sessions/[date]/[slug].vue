<script setup lang="ts">
import { ref, onMounted } from 'vue';

export interface SessionTime {
  date: string;
  startTime: string;
  timezone: string;
}

export interface EventItem {
  title: string;
  description: string;
  speakers: string[];
  type: string;
  session: SessionTime;
  tags: string[];
  speakersbio: string;
}

const route = useRoute();
const { date, slug } = route.params;
const events = ref<EventItem[]>([]);
const currentEvent = ref<EventItem | null>(null);
const seakerbio_is_expanded = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('../../sessions.json');
    events.value = await response.json();
    currentEvent.value = events.value.find(event => {
      const dateMatches = event.session.date === date;
      const eventSlug = useSlug(event.title);
      const slugMatches = eventSlug === slug;
      return dateMatches && slugMatches;
    }) || null;
  } catch (error) {
    console.error("Failed to load events:", error);
  }
  useHead({
    title: currentEvent.value ? currentEvent.value.title : 'Event Not Found'
  });
});

const TAG_COLORS: Record<string, string> = {
  'Machine Learning': 'warning',
  'LLM': 'error',
  'Research Operation': 'success',
  'AI': 'primary',
  'Artificial intelligence': 'primary',
  'Safety': 'info',
  'Reinforcement Learning': 'warning',
};

const getTagColor = (tag: string) => {
  return TAG_COLORS[tag] || 'neutral';
};
</script>

<template>
<div class="ps-4 pe-4">
  <UPageCard v-if="currentEvent" orientation="horizontal" highlight highlight-color="neutral" class="main-card">
    <template #title>
      <div class="flex items-center  justify-between gap-2">
        <span>{{ currentEvent.title }}</span>
        <UBadge :label="currentEvent.place" variant="subtle" size="sm" color="neutral" />
      </div>
    </template>
    <template #description>
      <div class="relative min-h-[4em]">
        <transition name="expand" mode="out-in">
          <div class="pt-4 text-sm text-gray-600 dark:text-gray-400" v-show="seakerbio_is_expanded">
            {{ currentEvent.description }}
          </div>
      </transition>
      </div>
    </template>
    <div class="right-card relative w-full h-full rounded-md overflow-visible pe-4 ps-4">
      <div class="flex justify-between">
<!--        TODO: Fix the speaker names-->
        <div>{{ currentEvent.speakers[0] }}</div>
          <UButton color="gray" variant="soft" size="xs" @click="seakerbio_is_expanded = !seakerbio_is_expanded" >
            {{ seakerbio_is_expanded ? 'Hide Bio and Description' : 'View Bio and Description' }}
          </UButton>
      </div>
      <transition name="expand">
        <div v-show="seakerbio_is_expanded" class="expand-container">
          <div class="pt-4 text-sm text-gray-600 dark:text-gray-400">
            {{ currentEvent.speakersbio }}
          </div>
        </div>
      </transition>
      <div>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 mt-4">
      <UBadge v-for="tag in currentEvent.tags" :key="tag" size="md" :color="getTagColor(tag)" variant="subtle" :label="tag" />
    </div>
  </UPageCard>
</div>
</template>

<style scoped lang="postcss">
.main-card{
  background-image: url("/bg/bg1.jpg");
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px; /* Set to a value larger than your content */
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>