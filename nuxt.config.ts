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
    buildAssetsDir: '/_nuxt/'
  },
  nitro: {
    preset: 'github-pages',
    output: {
      publicDir: 'docs'
    }
  },
  router: {
    options: {
      hashMode: false
    }
  },
  ssr: true
})
