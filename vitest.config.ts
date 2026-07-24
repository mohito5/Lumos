import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Отдельный конфиг (не через vite.config.js) — чтобы тестовый раннер не был
// завязан на прод-конфиг сборки. jsdom нужен на будущее (если появятся
// тесты, рендерящие хуки/компоненты через @testing-library/react) — сами
// текущие тесты (materialsCalculator/useResourceAllocator/telegramSyncManager)
// тестируют чистые функции и в DOM не нуждаются, но jsdom дешёвый по старту
// и не заставляет выбирать окружение отдельно под каждый будущий тест-файл.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['tests/**/*.test.{js,ts,jsx,tsx}'],
  },
});
