// components/SmoothHalftonePixels/SmoothHalftonePixels.jsx
import React, { useRef, useEffect } from 'react';

// 🔹 Bayer 4x4 матрица для УПОРЯДОЧЕННОГО прореживания
// Значения 0-15: чем меньше число, тем "важнее" пиксель
const BAYER_4X4 = [
  [ 0, 8, 2,10],
  [12, 4,14, 6],
  [ 3,11, 1, 9],
  [15, 7,13, 5]
];

const SmoothHalftonePixels = ({ 
    gridSize = 6,          // ⚠️ Минимум 4 для производительности
    pixelSize = 5,         // Оптимально: 60-75% от gridSize
    speed = 0.002,
    gradientHeight = 0.2,  // Насколько высоко поднимается базовый градиент
    blobStrength = 0.1,    // Сила влияния пятен на плотность
    color = '#fff',
    opacity = 0.85,
    className = ''
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        
        let animationId;
        let time = 0;
        let width, height;

        // Пятна: крупные, медленные, для плавного слияния
        const blobs = [
            { x: 0.3, y: 0.5, r: 0.22, sx: 0.3, sy: 0.2, p: 0 },
            { x: 0.7, y: 0.4, r: 0.25, sx: -0.4, sy: 0.3, p: 2 },
            { x: 0.5, y: 0.6, r: 0.20, sx: 0.2, sy: -0.3, p: 4 },
            { x: 0.2, y: 0.7, r: 0.18, sx: -0.3, sy: -0.2, p: 1 },
        ];

        function resize() {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = color;
            ctx.globalAlpha = opacity;

            const minDim = Math.min(width, height);

            // Предсчитываем позиции пятен (оптимизация)
            const activeBlobs = blobs.map(b => ({
                x: width * (b.x + Math.sin(time * b.sx + b.p) * 0.12),
                y: height * (b.y + Math.cos(time * b.sy + b.p) * 0.10),
                r: b.r * minDim,
                r2: (b.r * minDim) ** 2
            }));

            // Проходим по сетке
            for (let y = 0; y < height; y += gridSize) {
                const yNorm = y / height; // 0 (верх) → 1 (низ)

                for (let x = 0; x < width; x += gridSize) {
                    
                    // ─────────────────────────────────────
                    // 1. ВЫЧИСЛЯЕМ ЖЕЛАЕМУЮ ПЛОТНОСТЬ (0.0 → 1.0+)
                    // ─────────────────────────────────────
                    
                    // Базовый вертикальный градиент
                    let density = yNorm * gradientHeight;

                    // Добавляем влияние пятен (metaballs)
                    for (const b of activeBlobs) {
                        const dx = x - b.x;
                        const dy = y - b.y;
                        const distSq = dx * dx + dy * dy;
                        // Мягкое квадратичное затухание влияния
                        const influence = Math.max(0, 1 - distSq / b.r2);
                        density += influence * blobStrength;
                    }

                    // Нормализуем плотность в диапазон [0, 1] для прореживания
                    // >1.0 = сплошная заливка, <0 = пусто
                    const targetDensity = Math.max(0, Math.min(1, density));

                    // ─────────────────────────────────────
                    // 2. УПОРЯДОЧЕННОЕ ПРОРЕЖИВАНИЕ (Bayer dithering)
                    // ─────────────────────────────────────
                    
                    // Получаем "приоритет" пикселя из матрицы (0 = самый важный)
                    const bayerPriority = BAYER_4X4[x % 4][y % 4]; // 0...15
                    
                    // Нормализуем приоритет: 0.0 (важный) → 0.9375 (менее важный)
                    const normalizedPriority = bayerPriority / 16;

                    // 🔹 КЛЮЧЕВОЙ МОМЕНТ:
                    // Рисуем пиксель, если его приоритет "достаточно хорош" 
                    // для текущей целевой плотности.
                    // 
                    // Примеры:
                    // • targetDensity = 1.0 → normalizedPriority < 1.0 → ВСЕ пиксели
                    // • targetDensity = 0.5 → только приоритеты 0-7 → шахматный паттерн
                    // • targetDensity = 0.25 → только приоритеты 0-3 → редкая сетка
                    // • targetDensity = 0.0 → ни одного пикселя
                    if (normalizedPriority < targetDensity) {
                        ctx.fillRect(x, y, pixelSize, pixelSize);
                    }
                }
            }

            time += speed;
            animationId = requestAnimationFrame(draw);
        }

        resize();
        draw();
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, [gridSize, pixelSize, speed, gradientHeight, blobStrength, color, opacity]);

    return (
        <canvas 
            ref={canvasRef} 
            className={`smooth-halftone ${className}`}
            style={{ 
                position: 'absolute', 
                top: 0, left: 0, 
                width: '100%', height: '100%',
                pointerEvents: 'none',
                zIndex: 1 
            }} 
        />
    );
};

export default SmoothHalftonePixels;