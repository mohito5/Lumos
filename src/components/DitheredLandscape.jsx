import React, { useRef, useEffect } from 'react';

const BAYER_8X8 = [
    [ 0, 32,  8, 40,  2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44,  4, 36, 14, 46,  6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [ 3, 35, 11, 43,  1, 33,  9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47,  7, 39, 13, 45,  5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21]
];

// Smoothstep function to create sharp but smooth transitions
function smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
}

const DitheredLandscape = ({ 
    gridSize = 2,
    pixelSize = 2,
    densityFactor = 1.0, 
    color = '#8da5bb',
    opacity = 1.0,
    className = ''
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        
        let width, height;
        let animationFrameId;

        function getPatternDensity(x, y, w, h, time) {
            // Layer 1: Large, slow-moving organic shapes that define the mask
            const voidX = x + Math.sin(y * 0.001 + time * 0.2) * 120;
            const voidY = y + Math.cos(x * 0.0008 - time * 0.2) * 100;
            const voidVal = (Math.sin(voidX * 0.0025) * Math.cos(voidY * 0.003) + 1) / 2;

            // Use smoothstep to create a high-contrast mask for the shapes.
            // This value will be ~1 inside shapes and ~0 outside.
            const shapeMask = smoothstep(0.4, 0.55, voidVal);

            // If the mask value is very low, it's outside a shape. Return 0 for empty space.
            if (shapeMask < 0.01) {
                return 0;
            }

            // Layer 2: A different, faster pattern to create texture *within* the shapes
            const patternX = x + Math.sin(y * 0.008 + time * 2.0) * 40;
            const patternY = y + Math.cos(x * 0.006 - time * 2.0) * 30;
            const patternVal = (Math.sin((patternX + patternY) * 0.03) + Math.cos(patternX * 0.04) + 2) / 4;
            
            // The final density is the detailed pattern, multiplied by the shape mask.
            // This ensures the pattern only exists inside the shapes.
            return patternVal * shapeMask;
        }

        function resize() {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }

        function draw(time) {
            const timeSec = time / 12000;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = color;
            ctx.globalAlpha = opacity;

            for (let y = 0; y < height; y += gridSize) {
                for (let x = 0; x < width; x += gridSize) {
                    
                    // Get the base density. This will be 0 for any point outside a shape.
                    let density = getPatternDensity(x, y, width, height, timeSec);

                    // If density is 0, there's nothing to draw, so we skip to the next pixel.
                    if (density <= 0) {
                        continue;
                    }

                    // Horizontal Gradient: This is only applied to pixels *inside* the shapes.
                    const normalizedX = x / width;
                    const gradientFade = Math.pow(1.0 - normalizedX, 1.5);
                    density *= gradientFade;
 
                    // Dithering Logic
                    const targetDensity = density * densityFactor;
                    const bayerThreshold = BAYER_8X8[y % 8][x % 8] / 64.0;
 
                    if (targetDensity > bayerThreshold) {
                        ctx.fillRect(x, y, pixelSize, pixelSize);
                    }
                }
            }
        }
        
        function animate(time) {
            if (!width || !height) {
                resize();
            }
            draw(time);
            animationFrameId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gridSize, pixelSize, densityFactor, color, opacity]);

    return (
        <canvas 
            ref={canvasRef} 
            className={`dithered-landscape ${className}`}
            style={{ 
                position: 'absolute', 
                top: 0, left: 0, 
                width: '100%', height: '100%',
                pointerEvents: 'none',
                zIndex: 0 
            }} 
        />
    );
};

export default DitheredLandscape;
