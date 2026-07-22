import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://privacy-toolbox.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
