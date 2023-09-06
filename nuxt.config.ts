// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    //'@nuxt/devtools',
    '@nuxtjs/google-fonts',
    '@hypernym/nuxt-anime'

  ],
  plugins: [
  ],
  tailwindcss: {
    cssPath: "~/assets/main.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
  },
  anime: {
    provide: true
  }
})

