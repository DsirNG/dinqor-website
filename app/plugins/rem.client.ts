export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const setRem = () => {
      // Base width usually 1920 for desktop projects
      const baseWidth = 1920
      // Base font size we'll use for postcss-pxtorem (usually 16 or 100)
      const baseSize = 16

      const clientWidth = document.documentElement.clientWidth || window.innerWidth
      if (!clientWidth) return

      // Compute font-size
      let fontSize = (clientWidth / baseWidth) * baseSize

      // Set limits
      const minFontSize = 12
      const maxFontSize = 32
      fontSize = Math.max(minFontSize, Math.min(fontSize, maxFontSize))

      document.documentElement.style.fontSize = fontSize + 'px'
    }

    // Initialize
    setRem()

    // Add event listeners
    window.addEventListener('resize', setRem)
    window.addEventListener('orientationchange', setRem)
  }
})
