import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxthub/core', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    preference: 'light',
  },

  app: {
    // Replace 'my-nuxt-site' with your repository name
    baseURL: '/ai4dmrg/'
  },
  // Ensure the project is treated as a static site
  ssr: true,
  nitro: {
    preset: 'github-pages'
  }
})
