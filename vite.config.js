import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

export const viteBaseConfig = {
  plugins: [vue(), vueJsx()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@codingtalk-vue-toolkit': resolve(__dirname, './dist_publish'),
    },
  },
  css: {
    postcss: {
      plugins: [
        require('postcss-px-to-viewport')({
          unitToConvert: 'px',
          viewportWidth: 1920,
          viewportHeight: 1080,
          unitPrecision: 3,
          propList: [
            '*'
          ],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true
        })
      ]
    }
  }
}

export default defineConfig(viteBaseConfig)
