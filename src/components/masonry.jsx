import React, { useState, useEffect, useMemo } from 'react';
import '../assets/styles/masonry.css';

const MasonryGrid = ({ children, gap = 1 }) => {
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);

  // Определяем ориентацию экрана и обновляем состояние при ее изменении
  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");

    const handleOrientationChange = (e) => {
      setIsPortrait(e.matches);
    };

    // Добавляем слушатель для события изменения ориентации
    mediaQuery.addEventListener('change', handleOrientationChange);

    // Очищаем слушатель при размонтировании компонента
    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  // Разделяем дочерние элементы на две колонки с помощью useMemo для эффективности
  const { leftColumn, rightColumn } = useMemo(() => {
    const left = [];
    const right = [];
    React.Children.forEach(children, (child) => {
      // Игнорируем null/undefined дочерние элементы
      if (!child) return;

      // Если у элемента есть prop column={2}, отправляем его в правую колонку
      if (child.props.column === 2) {
        right.push(child);
      } else {
        // В противном случае (по умолчанию) — в левую
        left.push(child);
      }
    });
    return { leftColumn: left, rightColumn: right };
  }, [children]);

  // --- Рендеринг ---

  // В портретной ориентации: одна колонка
  if (isPortrait) {
    return (
      <div 
        className="masonry-grid-portrait" 
        style={{ display: 'flex', flexDirection: 'column', gap: `${gap}rem` }}
      >
        {children}
      </div>
    );
  }

  // В альбомной ориентации: две колонки
  return (
    <div 
      className="masonry-grid-landscape" 
      style={{ display: 'flex', alignItems: 'flex-start', gap: `${gap}rem` }}
    >
      {/* Левая колонка */}
      <div 
        className="masonry-column" 
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${gap}rem` }}
      >
        {leftColumn}
      </div>
      {/* Правая колонка */}
      <div 
        className="masonry-column" 
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${gap}rem` }}
      >
        {rightColumn}
      </div>
    </div>
  );
};

export default MasonryGrid;
