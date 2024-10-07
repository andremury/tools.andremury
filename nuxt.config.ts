// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  // plugins: ['~/plugins/vue-gtm.client.ts'],
  modules: [
    '@bootstrap-vue-next/nuxt',
    "@nuxtjs/i18n",
    "@nuxt/image",
    // "@nuxtjs/device",
    // "@nuxtjs/sitemap",
  ],

  routeRules: {
    '/': {
      prerender: true,
    }
  },

  nitro: {
    compressPublicAssets: true,
  },

  i18n: {
    locales: ['pt'],
    defaultLocale: 'pt',
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/global.scss',
    // 'vue3-toastify/dist/index.css',
  ],

  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },

  runtimeConfig: {
    public: {
      // firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY,
      // firebaseAuthDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      // firebaseDatabaseUrl: process.env.NUXT_FIREBASE_DATABASE_URL,
      // firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      // firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      // firebaseMessagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      // firebaseAppId: process.env.NUXT_FIREBASE_APP_ID,
      // emulators: {
      //   auth: {
      //     port: 9099,
      //     url: 'http://localhost',
      //   },
      //   // firestore: {
      //   //   port: 8085,
      //   //   url: 'http://127.0.0.1',
      //   // },
      // }
    }
  },

  // site: {
  //   url: process.env.NUXT_BASE_URL || 'http://localhost:8080',
  // },

  // sitemap: {
  //   sources: ['/api/sitemap'],
  // },
  build: {
    transpile: ['@fortawesome/vue-fontawesome'],
  },

  vite: {
    build: {
      terserOptions: {
        compress: true,
        mangle: true,
      },
      cssMinify: true,
      manifest: true,
      target: 'esnext',
      minify: 'terser',
    },
  },

  compatibilityDate: '2024-09-17',
});
