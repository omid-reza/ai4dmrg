<script setup lang="ts">
import Tag from "~/components/Tag.vue";

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
  place: string;
}

const route = useRoute();
const { date, slug } = route.params;
const events = ref<EventItem[]>([]);
const currentEvent = ref<EventItem | null>(null);
const seakerbio_is_expanded = ref(true);
const event_is_joinable = ref(false);

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
    if (currentEvent.value !== null) {
      const { date } = currentEvent.value.session;
      const eventDate = new Date(date);
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + 2);
      deadline.setHours(23, 59, 59, 59);
      event_is_joinable.value = eventDate > deadline;
    }
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
    <UPageCard v-if="currentEvent" orientation="horizontal" highlight highlight-color="neutral" class="main-card">
      <template #title>
        <div class="flex justify-between items-start">
          <span class="flex-grow">{{ currentEvent.title }}</span>
          <Tag size="sm" :tag="currentEvent.place" class="shrink-0 ml-4" />
        </div>
      </template>
      <template #description>
        <transition name="expand" mode="out-in">
          <div class="relative min-h-[4em]" v-show="seakerbio_is_expanded">
              <div class="pt-4 text-sm text-gray-600 dark:text-gray-400">
                {{ currentEvent.description }}
              </div>
          </div>
        </transition>
      </template>
      <template #footer>
        <div class="flex flex-col justify-between gap-5">
          <div class="flex items-center gap-3">
            <Tag v-for="tag in currentEvent.tags" size="md" :tag="tag" />
          </div>
          <div>
            <UButton icon="i-lucide-calendar" size="md" color="neutral" variant="link" class="pointer-events-none">{{ currentEvent.session.date }}</UButton>
            <UButton icon="i-lucide-clock" size="md" color="neutral" variant="link" class="pointer-events-none"> {{currentEvent.session.startTime}} {{ currentEvent.session.timezone }}</UButton>
            <UButton v-if="event_is_joinable && (currentEvent.place == 'Online' || currentEvent.place == 'Hybrid')" icon="i-lucide-video" size="md" color="neutral" variant="ghost">Join</UButton>
          </div>
        </div>
      </template>
      <div class="right-card relative w-full h-full rounded-md overflow-visible pe-4 ps-4">
        <div class="flex justify-between">
          <div>{{ formatSpeakers(currentEvent.speakers) }}</div>
          <UButton color="gray" variant="soft" size="xs" @click="seakerbio_is_expanded = !seakerbio_is_expanded" :icon="seakerbio_is_expanded ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'">
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