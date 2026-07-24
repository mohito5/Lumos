// BlobPattern.jsx
import React, { useEffect, useRef } from 'react';
import '../assets/styles/pattern.css';

const BlobPattern = ({ padding = 16, className = '' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const lastMoveRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const CANVAS_WIDTH = 1024;
    const CANVAS_HEIGHT = 576;
    
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // НАСТРОЙКИ
    const CELL_SIZE = 64;
    const OVERLAP = 8;
    const CORNER_RADIUS = 8;
    const BLUR_AMOUNT = 4;
    const THRESHOLD = 120;
    const OPACITY = 255;
    const MOVE_INTERVAL = 100;
    
    // Отступы
    const PADDING_X = (padding / 100) * CANVAS_WIDTH;
    const PADDING_Y = (padding / 100) * CANVAS_HEIGHT;
    
    // Сетка
    const COLS = Math.floor((CANVAS_WIDTH - PADDING_X * 2) / CELL_SIZE);
    const ROWS = Math.floor((CANVAS_HEIGHT - PADDING_Y * 2) / CELL_SIZE);
    
    const MIN_COL = 0;
    const MAX_COL = COLS - 1;
    const MIN_ROW = 0;
    const MAX_ROW = ROWS - 1;

    const colToX = (col) => PADDING_X + col * CELL_SIZE;
    const rowToY = (row) => PADDING_Y + row * CELL_SIZE;

    // Создаём частицы
    const createParticles = () => {
      const particles = [];
      const maxParticles = Math.floor(COLS * ROWS * 0.5);
      const occupied = new Set();

      for (let i = 0; i < maxParticles; i++) {
        let col, row, key;
        do {
          col = Math.floor(Math.random() * COLS);
          row = Math.floor(Math.random() * ROWS);
          key = `${col},${row}`;
        } while (occupied.has(key));
        
        occupied.add(key);

        particles.push({
          col,
          row,
          vx: Math.random() > 0.5 ? 1 : -1,
          vy: 0,
          direction: 'horizontal',
          stuck: false,
          stuckUntil: 0,
          stuckWith: null,
          id: i,
          moving: false,
          progress: 0,
          prevCol: col,
          prevRow: row,
          nextCol: null,
          nextRow: null
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    // Отрисовка
    const drawParticles = () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = CANVAS_WIDTH;
      tempCanvas.height = CANVAS_HEIGHT;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.fillStyle = '#d6dc82';

      particlesRef.current.forEach(p => {
        const renderX = p.moving 
          ? colToX(p.prevCol) + (colToX(p.col) - colToX(p.prevCol)) * p.progress
          : colToX(p.col);
        const renderY = p.moving
          ? rowToY(p.prevRow) + (rowToY(p.row) - rowToY(p.prevRow)) * p.progress
          : rowToY(p.row);

        tempCtx.beginPath();
        tempCtx.roundRect(
          renderX - OVERLAP/2,
          renderY - OVERLAP/2,
          CELL_SIZE + OVERLAP,
          CELL_SIZE + OVERLAP,
          CORNER_RADIUS
        );
        tempCtx.fill();
      });

      ctx.filter = `blur(${BLUR_AMOUNT}px)`;
      ctx.drawImage(tempCanvas, 0, 0);
      ctx.filter = 'none';
      
      const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > THRESHOLD) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
          data[i + 3] = OPACITY;
        } else {
          data[i + 3] = 0;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    // Обновление движения с ПРАВИЛЬНОЙ проверкой столкновений
    // Обновление движения с ПРАВИЛЬНОЙ проверкой столкновений и соседства
const updateParticles = () => {
  const now = Date.now();

  // Шаг 1: Сбрасываем целевые позиции
  particlesRef.current.forEach(p => {
    p.nextCol = null;
    p.nextRow = null;
  });

  // Шаг 2: Проверяем прилипшие частицы
  particlesRef.current.forEach(p => {
    if (p.stuck && now > p.stuckUntil) {
      p.stuck = false;
      p.stuckWith = null;
      
      if (Math.random() > 0.5) {
        p.direction = p.direction === 'horizontal' ? 'vertical' : 'horizontal';
      }
      
      if (p.direction === 'horizontal') {
        p.vx = Math.random() > 0.5 ? 1 : -1;
        p.vy = 0;
      } else {
        p.vx = 0;
        p.vy = Math.random() > 0.5 ? 1 : -1;
      }
    }
  });

  // Вспомогательная функция: проверка соседства (касание по стороне)
  const isAdjacent = (c1, r1, c2, r2) => {
    return (Math.abs(c1 - c2) === 1 && r1 === r2) ||  // горизонтальные соседи
           (Math.abs(r1 - r2) === 1 && c1 === c2);     // вертикальные соседи
  };

  // Шаг 3: Планируем движения
  particlesRef.current.forEach(p => {
    if (p.stuck || p.moving) return;

    const newCol = p.col + p.vx;
    const newRow = p.row + p.vy;

    // Проверка границ
    if (newCol < MIN_COL || newCol > MAX_COL || newRow < MIN_ROW || newRow > MAX_ROW) {
      if (p.direction === 'horizontal') p.vx = -p.vx;
      else p.vy = -p.vy;
      return;
    }

    // 🔍 ПРОВЕРКА 1: Целевая ячейка занята?
    const targetOccupied = particlesRef.current.find(other => 
      other.id !== p.id && 
      !other.moving &&
      other.col === newCol && 
      other.row === newRow
    );

    if (targetOccupied) {
      if (!targetOccupied.stuck) {
        // Прилипаем к свободной частице
        p.stuck = true;
        p.stuckWith = targetOccupied.id;
        p.stuckUntil = now + 3000 + Math.random() * 5000;
        
        targetOccupied.stuck = true;
        targetOccupied.stuckWith = p.id;
        targetOccupied.stuckUntil = p.stuckUntil;
      }
      // Если занята прилипшей — просто отскакиваем
      if (p.direction === 'horizontal') p.vx = -p.vx;
      else p.vy = -p.vy;
      return;
    }

    // 🔍 ПРОВЕРКА 2: Будет ли касание с соседней частицей?
    const adjacentParticle = particlesRef.current.find(other => 
      other.id !== p.id && 
      !other.moving &&
      isAdjacent(newCol, newRow, other.col, other.row)
    );

    if (adjacentParticle) {
      // Прилипаем к соседу!
      p.stuck = true;
      p.stuckWith = adjacentParticle.id;
      p.stuckUntil = now + 3000 + Math.random() * 4000;
      
      // Если сосед не прилипший — приклеиваем и его
      if (!adjacentParticle.stuck) {
        adjacentParticle.stuck = true;
        adjacentParticle.stuckWith = p.id;
        adjacentParticle.stuckUntil = p.stuckUntil;
      }
      return; // Не двигаемся, остаёмся на месте
    }

    // 🔍 ПРОВЕРКА 3: Конфликт движений (две частицы в одну ячейку)
    const willCollide = particlesRef.current.some(other => 
      other.id !== p.id &&
      !other.stuck &&
      !other.moving &&
      other.nextCol === newCol &&
      other.nextRow === newRow
    );

    if (willCollide) {
      if (p.direction === 'horizontal') p.vx = -p.vx;
      else p.vy = -p.vy;
      return;
    }

    // Всё чисто — планируем движение
    p.nextCol = newCol;
    p.nextRow = newRow;
  });

  // Шаг 4: Применяем движения
  particlesRef.current.forEach(p => {
    if (p.stuck || p.moving || p.nextCol === null) return;

    p.prevCol = p.col;
    p.prevRow = p.row;
    p.col = p.nextCol;
    p.row = p.nextRow;
    p.moving = true;
    p.progress = 0;
    p.nextCol = null;
    p.nextRow = null;
  });
};

    // Основной цикл
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (timestamp - lastMoveRef.current > MOVE_INTERVAL) {
        updateParticles();
        lastMoveRef.current = timestamp;
      }

      // Обновляем прогресс анимации
      particlesRef.current.forEach(p => {
        if (p.moving) {
          p.progress += 0.08;
          if (p.progress >= 1) {
            p.moving = false;
            p.progress = 0;
          }
        }
      });

      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [padding]);

  return (
    <div className={`blob-pattern-container ${className}`}>
      <canvas ref={canvasRef} className="blob-pattern-canvas" />
    </div>
  );
};

export default BlobPattern;