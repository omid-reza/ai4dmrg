import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    preference: 'dark',
  },
  app: {
    baseURL: '/ai4dmrg/',
    buildAssetsDir: '/ai4dmrg/_nuxt'
  },
  nitro: {
    preset: 'github-pages',
    baseURL: '/ai4dmrg/'
  },
  router: {
    options: {
      hashMode: false
    }
  },
  ssr: true
})
