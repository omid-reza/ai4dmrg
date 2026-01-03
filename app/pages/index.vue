<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 1. Define your Interfaces
export interface SessionTime {
  date: string;
  startTime: string;
  timezone: string;
}

export interface EventItem {
  title: string;
  speakers: string[];
  type: string;
  session: SessionTime;
  tags: string[];
}

const events = ref<EventItem[]>([]);
const now = new Date();

onMounted(async () => {
  try {
    const response = await fetch('./sessions.json');
    events.value = await response.json();
  } catch (error) {
    console.error("Failed to load events:", error);
  }
});

const upcomingEvents = computed(() => {
  return events.value.filter(event => {
    const eventDateTime = new Date(`${event.session.date} ${event.session.startTime}`);
    return eventDateTime > now;
  });
});

const pastEvents = computed(() => {
  return events.value.filter(event => {
    const eventDateTime = new Date(`${event.session.date} ${event.session.startTime}`);
    return eventDateTime <= now;
  });
});
</script>

<template>
  <div class="flex flex-col gap-3 ps-4 pe-4">
    <MainCard />
    <div class="upcoming" v-if="upcomingEvents.length > 0">
      Upcoming Sessions
    </div>
    <Session v-for="session in upcomingEvents" :title="session.title" :type="session.type" :speakers="session.speakers" :session_time="session.session" :tags="session.tags" />
    <div class="past" v-if="pastEvents.length > 0">
      Past Sessions
    </div>
    <Session v-for="session in pastEvents" :title="session.title" :type="session.type" :speakers="session.speakers" :session_time="session.session" :tags="session.tags" />
  </div>
</template>