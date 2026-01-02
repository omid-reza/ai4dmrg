<script setup lang="ts">
export interface EventItem {
  title: string;
  speakers: string[];
  type: string;
  session: SessionTime;
  tags: string[];
}

const events: EventItem[] = [
  {
    title: "Scaling Agent Systems",
    speakers: ["Yubin Kim"],
    type: "paper",
    session: {
      date: "2025-02-25",
      startTime: "10:00 AM",
      timezone: "EDT",
    },
    tags: ["Machine Learning", "LLM"]
  },
  {
    title: "Scaling Agent Systems",
    speakers: ["Yubin Kim"],
    type: "paper",
    session: {
      date: "2026-02-25",
      startTime: "10:00 AM",
      timezone: "EDT",
    },
    tags: ["Machine Learning", "LLM"]
  },
  {
    title: "Future of AI Ethics",
    speakers: ["Dr. Smith", "Sarah Chen"],
    type: "academic",
    session: {
      date: "2026-03-12",
      startTime: "2:00 PM",
      timezone: "PDT"
    },
    tags: ["AI", "Research Operation"]
  }
];
const now = new Date();
const upcomingEvents = computed(() => {
  return events.filter(event => {
    const eventDateTime = new Date(`${event.session.date} ${event.session.startTime}`);
    return eventDateTime > now;
  });
});

const pastEvents = computed(() => {
  return events.filter(event => {
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