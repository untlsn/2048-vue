import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windi from 'vite-plugin-windicss';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), windi()],
  resolve: {
    alias: {
      '~': resolve('./src'),
    },
  },
});
