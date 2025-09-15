
import React, { useState, useMemo } from 'react';
import { HotelProperty, NewHotelData } from '../types';
import HotelCard from './HotelCard';
import { Icon } from './Icon';
import AddPropertyModal from './AddPropertyModal';

interface DashboardProps {
  hotels: HotelProperty[];
  onSelectHotel: (hotel: HotelProperty) => void;
  onAddProperty: (data: NewHotelData) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ hotels, onSelectHotel, onAddProperty }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = ['All', 'A by Adina', 'Adina', 'Collection by TFE'];

  const filteredHotels = useMemo(() => {
    let brandFilteredHotels = hotels;

    if (activeFilter !== 'All') {
      brandFilteredHotels = hotels.filter(hotel => {
        if (activeFilter === 'A by Adina') {
          return hotel.name.startsWith('A by Adina');
        }
        if (activeFilter === 'Adina') {
          return hotel.name.startsWith('Adina') && !hotel.name.startsWith('A by Adina');
        }
        if (activeFilter === 'Collection by TFE') {
          return hotel.name.startsWith('The EVE');
        }
        return true;
      });
    }

    if (!searchQuery) {
      return brandFilteredHotels;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    return brandFilteredHotels.filter(
      hotel =>
        hotel.name.toLowerCase().includes(lowercasedQuery) ||
        hotel.location.toLowerCase().includes(lowercasedQuery)
    );
  }, [hotels, activeFilter, searchQuery]);
  
  const handleAddProperty = (data: NewHotelData) => {
    onAddProperty(data);
    setIsModalOpen(false);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center bg-gray-200 dark:bg-neutral-800 p-1 rounded-lg space-x-1 self-start sm:self-center">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeFilter === filter
                  ? 'bg-white text-indigo-700 shadow dark:bg-neutral-900 dark:text-indigo-400'
                  : 'text-gray-600 hover:text-black dark:text-neutral-300 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon type="search" className="w-5 h-5 text-gray-400 dark:text-neutral-500" />
              </span>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-black dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              />
            </div>
             {/* Add Property Button */}
             <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center space-x-2 bg-black dark:bg-indigo-600 text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
                aria-label="Add new property"
              >
                <Icon type="plus" className="w-4 h-4" />
                <span className="hidden sm:inline">Add Property</span>
              </button>
        </div>
      </div>
      
      <p className="mb-4 text-sm text-gray-600 dark:text-neutral-400">
        Showing {filteredHotels.length} propert{filteredHotels.length === 1 ? 'y' : 'ies'}.
      </p>

      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} onClick={() => onSelectHotel(hotel)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">No Hotels Found</h3>
          <p className="text-gray-500 dark:text-neutral-400 mt-1">Try adjusting your filter or search query.</p>
        </div>
      )}
      
      <AddPropertyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddProperty={handleAddProperty}
      />
    </div>
  );
};

export default Dashboard;