import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Отдельный конфиг (не через vite.config.js) — чтобы тестовый раннер не был
// завязан на прод-конфиг сборки. jsdom нужен для тестов React-компонентов
// через @testing-library/react (см. tests/setup.ts) — часть тестов (чистые
// функции: materialsCalculator/useResourceAllocator/telegramSyncManager/
// auto-detection и т.д.) в DOM не нуждается, но общее jsdom-окружение на
// весь набор дешевле, чем переключать environment отдельно по файлам.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['tests/**/*.test.{js,ts,jsx,tsx}'],
    setupFiles: ['./tests/setup.ts'],
  },
});
