<script setup lang="ts">
const people = [
  {
    "name": "Omid Reza Heidari",
    "description": "Omid Reza Heidari recieved his M.Sc. from Concordia University, under the supervision of Professor Yang Wang and Professor Xinxin Zuo. Prior to that, he concluded his undergraduate studies at Islamic Azad University. His area of interest includes Multimodal Vision-Language, Large Language Models, Multimodal AI Agents, and Reinforcement Learning.",
    "image": "https://omid-reza.github.io/images/profile.jpg",
  },
  {
    "name": "Omid Reza Heidari",
    "description": "Omid Reza Heidari recieved his M.Sc. from Concordia University, under the supervision of Professor Yang Wang and Professor Xinxin Zuo. Prior to that, he concluded his undergraduate studies at Islamic Azad University. His area of interest includes Multimodal Vision-Language, Large Language Models, Multimodal AI Agents, and Reinforcement Learning.",
    "image": "https://omid-reza.github.io/images/profile.jpg",
  },
  {
    "name": "Omid Reza Heidari",
    "description": "Omid Reza Heidari recieved his M.Sc. from Concordia University, under the supervision of Professor Yang Wang and Professor Xinxin Zuo. Prior to that, he concluded his undergraduate studies at Islamic Azad University. His area of interest includes Multimodal Vision-Language, Large Language Models, Multimodal AI Agents, and Reinforcement Learning.",
    "image": "https://omid-reza.github.io/images/profile.jpg",
  },
  {
    "name": "Omid Reza Heidari",
    "description": "Omid Reza Heidari recieved his M.Sc. from Concordia University, under the supervision of Professor Yang Wang and Professor Xinxin Zuo. Prior to that, he concluded his undergraduate studies at Islamic Azad University. His area of interest includes Multimodal Vision-Language, Large Language Models, Multimodal AI Agents, and Reinforcement Learning.",
    "image": "https://omid-reza.github.io/images/profile.jpg",
  },
  {
    "name": "Omid Reza Heidari",
    "description": "Omid Reza Heidari recieved his M.Sc. from Concordia University, under the supervision of Professor Yang Wang and Professor Xinxin Zuo. Prior to that, he concluded his undergraduate studies at Islamic Azad University. His area of interest includes Multimodal Vision-Language, Large Language Models, Multimodal AI Agents, and Reinforcement Learning.",
    "image": "https://omid-reza.github.io/images/profile.jpg",
  },
]
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
    <UPageCard
        v-for="person in people"
        :key="person.name"
        :title="person.name"
        :description="person.description"
        orientation="vertical"
        reverse
    >
      <img :src="person.image" :alt="'Image of ' + person.name" class="w-full h-auto object-cover rounded-sm" />
    </UPageCard>
  </div>
</template>