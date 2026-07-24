
import React from 'react';
import useTheme from '../hooks/useTheme';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <span className="theme-toggle-label">Тема</span>
      <div
        className="theme-toggle-switch"
        data-theme={theme}
        onClick={toggleTheme}
      >
        <div className="icons">
          <span className="icon light">☀️</span>
          <span className="icon dark">🌙</span>
        </div>
        <div className="theme-toggle-slider"></div>
      </div>
    </div>
  );
};

export default ThemeToggle;
