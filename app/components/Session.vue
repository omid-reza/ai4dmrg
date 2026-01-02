<script setup lang="ts">
import {slugify} from "~~/utils/slugify";
export interface SessionTime {
  id: string | number;
  date: string;
  startTime: string;
  timezone: string;
}

const props = defineProps<{
  title: string;
  speakers: Array<string>;
  type: string;
  session_time: SessionTime;
  tags: string[];
}>();

const speakers = computed(() => {
  const label = props.speakers.length > 1 ? 'Speakers' : 'Speaker';
  return `${label}: ${props.speakers.join(', ')}`;
});

const TYPE_MAP: Record<string, string> = {
  paper: 'warning',
  academic: 'error',
  industry: 'info',
  community: 'success'
};
const session_type_color = computed(() => TYPE_MAP[props.type] || 'neutral');

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
  <NuxtLink :to="`/sessions/${props.session_time.date}/${slugify(props.title)}`">
    <UPageCard
        :title="props.title"
        :description="speakers"
        orientation="horizontal"
        spotlight
        :spotlight-color="session_type_color"
    >
      <div class="flex flex-col gap-5">
        <div class="flex justify-end">
          <div class="text-xl font-medium">
            <div class="flex justify-between gap-1">
              <span class="text-gray-300">  {{ props.session_time.date }} </span>
              <span class="text-gray-300">{{ props.session_time.startTime }}</span>
              <span class="text-sm text-gray-600">{{ props.session_time.timezone }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <UBadge v-for="tag in props.tags" size="md" :color="getTagColor(tag)" variant="subtle" >{{ tag }}</UBadge>
        </div>
      </div>
    </UPageCard>
  </NuxtLink>
</template>