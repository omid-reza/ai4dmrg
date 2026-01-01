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
</script>
<template>
  <div class="flex flex-col gap-3 p-4">
    <Session v-for="session in events" :title="session.title" :type="session.type" :speakers="session.speakers" :session_time="session.session" :tags="session.tags" />
  </div>
</template>