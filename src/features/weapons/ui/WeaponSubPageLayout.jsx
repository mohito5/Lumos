
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavChrome } from '../../../shared/lib/context/ButtonManagerContext';

const WeaponSubPageLayout = () => {
  const { setButtonType, setBackPath } = useNavChrome();

  useEffect(() => {
    setButtonType(['back']);
    setBackPath('/weapons');

    return () => {
      setButtonType(null);
      setBackPath(null);
    };
  }, [setButtonType, setBackPath]);

  return (
    <div className="weapon-sub-page wd">
      <Outlet />
    </div>
  );
};

export default WeaponSubPageLayout;
