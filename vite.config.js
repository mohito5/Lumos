import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          if (_req.originalUrl.endsWith(".wasm")) {
            res.setHeader("Content-Type", "application/wasm");
          }
          next();
        });
      },
    },
    // Service Worker — раньше opencv.js/opencv.wasm (~7МБ) и статические
    // иконки (элементы, шаблоны цифр, аватары и т.д.) перекачивались заново
    // при каждом визите (только обычный HTTP-кэш браузера, без контроля над
    // стратегией). Теперь после ПЕРВОЙ успешной загрузки эти файлы уходят в
    // Cache Storage и отдаются мгновенно из кэша — заметно сокращает время
    // первого запуска OCR при повторных заходах.
    //
    // manifest:false — это Telegram Mini App (открывается внутри Telegram),
    // не отдельное устанавливаемое PWA со своей иконкой на рабочем столе —
    // задача только в кэшировании, не в "добавить на экран".
    VitePWA({
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        // Прекэш (сразу при установке SW) — только сам app shell: JS/CSS/
        // HTML/шрифты. НЕ включает сюда PNG-иконки/wasm — они кэшируются
        // лениво через runtimeCaching ниже, при первом реальном запросе, а
        // не форсированно для всех пользователей сразу (та же логика, что
        // и у lazy-загрузки самого opencv.js — см. CvLoaderContext.jsx).
        globPatterns: ["**/*.{js,css,html,ttf,woff,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            // opencv.js + opencv.wasm
            urlPattern: /\/opencv\.(js|wasm)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "opencv-wasm",
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Статические иконки/спрайты/шаблоны цифр — public/assets/**
            urlPattern: /\/assets\/.*\.(png|jpg|jpeg|svg|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-icons",
              expiration: { maxEntries: 1000, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // /api/uid/... СОЗНАТЕЛЬНО не перехватывается здесь — у него уже
          // есть собственная edge-кэш-политика через Cache-Control/ttl из
          // Enka (см. functions/api/uid/[uid].js, X-Ttl-Source). Дублировать
          // эту логику ещё и в Service Worker — источник рассинхрона
          // (пользователь мог бы увидеть устаревший профиль дольше, чем
          // рассчитывает сам API).
        ],
      },
    }),
  ],
  server: {
    fs: {
      strict: false,
    },
    // Enka.Network не отдаёт Access-Control-Allow-Origin, поэтому прямой
    // fetch с фронтенда всегда падает по CORS. Проксируем запрос через
    // dev-сервер (server-to-server запрос не подчиняется CORS) — фронтенд
    // как и раньше ходит по относительному /api/uid/..., просто dev-сервер
    // прозрачно перенаправляет его на enka.network.
    // ВАЖНО: этот прокси работает только при `npm run dev`. В production
    // этот же CORS-обход даёт functions/api/uid/[uid].js — Cloudflare Pages
    // Function с тем же относительным путём /api/uid/..., так что фронтенду
    // не нужно знать, какое из двух сейчас отвечает.
    proxy: {
      "/api/uid": {
        target: "https://enka.network",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // РАНЬШЕ: весь сторонний код (react, framer-motion, dnd-kit,
        // i18next, zustand и т.д.) уходил в тот же бандл, что и код
        // приложения — значит любой деплой (даже правка одной строки в
        // приложении) инвалидировал браузерный кэш и для vendor-части
        // тоже, хотя сами библиотеки не менялись месяцами. React.lazy()
        // (см. App.jsx) решает другую задачу — не грузить код СТРАНИЦ,
        // которые пользователь не открывал; manualChunks — про то, чтобы
        // ЧАСТО меняющийся код приложения и РЕДКО меняющийся код
        // библиотек жили в разных файлах с разными хэшами.
        //
        // Пробовал ещё разбить сам vendor на 'vendor-react' отдельно от
        // остального (react/react-dom меняются реже framer-motion/i18next)
        // — Rollup предупредил про circular chunk (scheduler и другие
        // внутренности react-dom оказались нужны обеим частям в обе
        // стороны). Не стоит того, чтобы форсировать через workaround —
        // единый vendor-чанк даёт основную часть выигрыша (кэш приложения
        // и кэш библиотек больше не связаны) без хрупкости.
        //
        // @sentry/browser сюда сознательно не включён — он загружается
        // ДИНАМИЧЕСКИ (см. src/core/services/errorTracking.ts) и поэтому
        // Rollup и так выносит его в собственный чанк, отдельно от
        // остального vendor-кода, без ручной настройки.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          return "vendor";
        },
      },
    },
  },
});
