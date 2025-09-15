import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { NewHotelData } from '../../types';
import { Icon } from './Icon';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (data: NewHotelData) => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ isOpen, onClose, onAddProperty }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setName('');
      setLocation('');
      setImageUrl('');
    }
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert("File is too large. Please select a file smaller than 10MB.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim() || !imageUrl.trim()) {
      alert('Please fill out all fields and upload an image.');
      return;
    }
    onAddProperty({ name, location, imageUrl });
  };
  
  if (!isOpen) {
    return null;
  }

  const isFormValid = name.trim() && location.trim() && imageUrl.trim();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl w-full max-w-2xl min-w-[600px] m-4 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-neutral-700">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
            Add New Hotel Property
          </h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-gray-400 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="m-0">
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="hotel-name" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Hotel Name
              </label>
              <input
                type="text"
                id="hotel-name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-black dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Adina Apartment Hotel"
                required
              />
            </div>
             <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Location (City, Country)
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-black dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Berlin, Germany"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Thumbnail Image
              </label>
              <div className="mt-1">
                {!imageUrl ? (
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-neutral-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Icon type="image" className="mx-auto h-12 w-12 text-gray-400 dark:text-neutral-500" />
                      <div className="flex text-sm text-gray-600 dark:text-neutral-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white dark:bg-neutral-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-neutral-800 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/jpg, image/webp" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-neutral-500">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <img src={imageUrl} alt="Thumbnail preview" className="w-full h-auto max-h-60 object-contain rounded-md bg-gray-100 dark:bg-neutral-700" />
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition-opacity opacity-0 group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end px-6 py-4 bg-gray-50 dark:bg-neutral-800/50 border-t border-gray-200 dark:border-neutral-700 rounded-b-xl">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-neutral-700 dark:text-neutral-200 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-neutral-600 mr-3"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!isFormValid}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black dark:bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;