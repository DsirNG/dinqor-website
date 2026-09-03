export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon-512.png' }
      ]
    }
  },
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16,
        propList: ['*'],
        selectorBlackList: ['html'], // don't convert root font-size
        minPixelValue: 2 // don't convert tiny borders etc.
      }
    }
  }
})
