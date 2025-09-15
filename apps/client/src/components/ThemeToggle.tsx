import React from 'react';
import { Icon } from './Icon';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full text-black dark:text-gray-200 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Icon type="moon" className="w-5 h-5" />
      ) : (
        <Icon type="sun" className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
