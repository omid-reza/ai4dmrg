<script setup lang="ts">
import { format } from 'date-fns';
const config = useRuntimeConfig();
const currentYear = format(new Date(), 'yyyy');
</script>
<template>
  <div class="mt-2 flex items-center justify-center gap-1 text-xs text-neutral-400 mb-4 mt-3">
    <a class="font-semibold transition hover:text-white" href="/">AI4DMRG</a>
    - by
    <a class="font-semibold transition hover:text-white" href="/about">AI4DM Reading Group Team</a>
    {{ currentYear }}
  </div>
</template>