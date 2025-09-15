import React from 'react';
import { HotelProperty } from '../types';
import { Icon } from './Icon';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  hotels: HotelProperty[];
  selectedHotelId?: string;
  onHotelChange: (hotelId: string) => void;
  onBack?: () => void;
  onAddTemplate?: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ hotels, selectedHotelId, onHotelChange, onBack, onAddTemplate, theme, onToggleTheme }) => {
  return (
    <header className="bg-[#f7f3ef] dark:bg-neutral-800/50 shadow-md dark:shadow-black/20 border-b border-transparent dark:border-neutral-700/50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="text-black dark:text-gray-200 hover:bg-black/10 dark:hover:bg-white/10 p-1 rounded-full transition-colors"
                aria-label="Back to dashboard"
              >
                <Icon type="arrowLeft" className="w-4 h-4" />
              </button>
            )}
            <img src="https://media.tfehotels.com/static-v1/website/images/logos/svg/TFE-black.svg" alt="TFE Hotels" className="w-[120px] h-auto dark:invert" />
          </div>

          <div className="flex items-center space-x-4">
             <span className="hidden md:block text-lg font-medium text-black dark:text-gray-200 tracking-tight">
              TFE GXP Emails Platform
            </span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            {selectedHotelId && (
              <>
                <div className="relative">
                  <select
                    value={selectedHotelId}
                    onChange={(e) => onHotelChange(e.target.value)}
                    className="appearance-none bg-white dark:bg-neutral-700 text-sm font-medium text-black dark:text-gray-200 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-4 pr-10 py-2"
                    aria-label="Select a hotel"
                  >
                    {hotels.map(hotel => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <Icon type="chevronDown" className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                {onAddTemplate && (
                  <button
                    onClick={onAddTemplate}
                    className="flex items-center space-x-2 bg-black dark:bg-indigo-600 text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
                    aria-label="Add new template"
                  >
                    <Icon type="plus" className="w-4 h-4" />
                    <span className="hidden sm:inline">New Template</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;