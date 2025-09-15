import React from 'react';
import { HotelProperty } from '../types';
import { Icon } from './Icon';

interface HotelCardProps {
  hotel: HotelProperty;
  onClick: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-lg-dark overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 group"
      onClick={onClick}
    >
      <img className="h-48 w-full object-cover" src={hotel.imageUrl} alt={`Exterior of ${hotel.name}`} />
      <div className="p-4">
        <h3 className="text-md font-medium text-black dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors mb-1">{hotel.name}</h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-neutral-400">
          <Icon type="location" className="w-4 h-4 mr-1.5" />
          <span>{hotel.location}</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;