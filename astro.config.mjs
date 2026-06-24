import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://privacy-toolbox.com',
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      target: 'es2022',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('pdf-lib')) return 'pdf-tools';
            if (id.includes('exifr')) return 'image-tools';
          }
        }
      }
    }
  }
});
