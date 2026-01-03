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
const seakerbio_is_expanded = ref(false);

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
</script>

<template>
<div class="ps-4 pe-4">
  <UPageCard
      v-if="currentEvent"
      :title="currentEvent.title"
      :description="currentEvent.description"
      orientation="horizontal"
      highlight
      highlight-color="neutral"
      class="main-card"
  >
    <div class="right-card relative w-full h-full rounded-md overflow-visible pe-4 ps-4">
      <div class="flex justify-between">
<!--        TODO: Fix the speaker names-->
        <div>{{ currentEvent.speakers[0] }}</div>
        <transition name="fade">
          <UButton
              color="gray"
              variant="soft"
              size="xs"
              @click="seakerbio_is_expanded = !seakerbio_is_expanded"
          >
            {{ seakerbio_is_expanded ? 'Hide Bio' : 'View Bio' }}
          </UButton>
        </transition>
      </div>
      <transition name="fade">
        <div v-if="seakerbio_is_expanded">
          {{ currentEvent.speakersbio }}
        </div>
      </transition>
    </div>
  </UPageCard>
</div>
</template>

<style scoped lang="postcss">
.main-card{
  background-image: url("/bg/bg1.jpg");
  //filter: blur(100px);
  //z-index: -1;
}
</style>