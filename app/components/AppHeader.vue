<script setup lang="ts">
</script>

<template>
  <div class="flex ps-4 pe-4 justify-between  mt-2 mb-2">
    <NuxtLink class="title text-2xl font-semibold tracking-tight" to="/">
      AI4DMRG
    </NuxtLink>
    <div class="flex gap-2 justify-end">
      <UButton icon="i-lucide-newspaper" size="md" color="neutral" variant="soft">Subscribe to our Newsletter</UButton>
      <UButton icon="i-lucide-lightbulb" size="md" color="neutral" variant="soft">Suggest a speaker</UButton>
      <UButton icon="i-lucide-user" size="md" color="neutral" variant="soft" to="/about" label="About Us" />
    </div>
  </div>
</template>