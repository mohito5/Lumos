
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavChrome } from '../../context/ButtonManagerContext';

const CharacterSubPageLayout = () => {
  const { setButtonType, setBackPath } = useNavChrome();

  useEffect(() => {
    // Устанавливаем кнопку "Назад" при монтировании этого макета
    setButtonType(['back']);
    setBackPath('/characters');

    // Сбрасываем при размонтировании
    return () => {
      setButtonType(null);
      setBackPath(null);
    };
  }, [setButtonType, setBackPath]);

  return (
    <div className="character-sub-page">
      {/* 
        Теперь Outlet отвечает за отображение всего контента, 
        включая заголовок и сетку Masonry.
      */}
      <Outlet />
    </div>
  );
};

export default CharacterSubPageLayout;
