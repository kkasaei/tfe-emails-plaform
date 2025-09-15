import React, { useState, useEffect } from 'react';
import { HotelProperty, EmailTemplate, GuestJourneyStage, NewHotelData } from './types';
import { mockHotels, mockTemplates, baseTemplates } from './data/mockData';
import Dashboard from './components/Dashboard';
import TemplateEditor from './components/TemplateEditor';
import Header from './components/Header';
import AddPropertyModal from './components/AddPropertyModal';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [hotels, setHotels] = useState<HotelProperty[]>(mockHotels);
  const [selectedHotel, setSelectedHotel] = useState<HotelProperty | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [activeTemplate, setActiveTemplate] = useState<EmailTemplate | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setDefaultTemplateForHotel = (hotel: HotelProperty) => {
    const hotelTemplates = templates.filter(t => t.hotelId === hotel.id);
    const defaultTemplate = 
      hotelTemplates.find(t => t.stage === GuestJourneyStage.PRE_ARRIVAL) || 
      hotelTemplates[0] || 
      null;
    setActiveTemplate(defaultTemplate);
  };

  const handleSelectHotel = (hotel: HotelProperty) => {
    setSelectedHotel(hotel);
    setDefaultTemplateForHotel(hotel);
  };

  const handleBackToDashboard = () => {
    setSelectedHotel(null);
    setActiveTemplate(null);
  };

  const handleHotelChange = (hotelId: string) => {
    const newHotel = hotels.find(h => h.id === hotelId);
    if (newHotel) {
      setSelectedHotel(newHotel);
      setDefaultTemplateForHotel(newHotel);
    }
  };

  const handleSelectTemplate = (template: EmailTemplate) => {
    setActiveTemplate(template);
  };

  const handleSaveTemplate = (templateId: string, mjml: string) => {
    setTemplates(prevTemplates =>
      prevTemplates.map(t =>
        t.id === templateId ? { ...t, mjml } : t
      )
    );
  };

  const handleAddTemplate = () => {
    if (!selectedHotel) return;

    const nameInput = prompt('Enter a name for the new template:');
    if (!nameInput || nameInput.trim() === '') {
      if (nameInput !== null) {
        alert('Template name cannot be empty.');
      }
      return;
    }
    const name = nameInput.trim();

    const stages = Object.values(GuestJourneyStage);
    const stagePrompt = `Select a stage for this template:\n\n${stages.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    const stageInput = prompt(stagePrompt);
    if (!stageInput) return;

    const stageIndex = parseInt(stageInput, 10) - 1;
    if (isNaN(stageIndex) || stageIndex < 0 || stageIndex >= stages.length) {
      alert('Invalid stage selected.');
      return;
    }
    const stage = stages[stageIndex];

    // Validation: Check for uniqueness within the hotel and stage
    const isDuplicate = templates.some(
      t => t.hotelId === selectedHotel.id && t.stage === stage && t.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`A template with the name "${name}" already exists in the "${stage}" stage for this hotel. Please try again with a unique name.`);
      return;
    }
    
    const newTemplate: EmailTemplate = {
      id: `t${Date.now()}`,
      hotelId: selectedHotel.id,
      name,
      stage,
      mjml: `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" color="#333" font-family="helvetica">
          New Template: ${name}
        </mj-text>
        <mj-text color="#555">
          Start building your amazing email here!
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`,
    };

    setTemplates(prevTemplates => [...prevTemplates, newTemplate]);
    setActiveTemplate(newTemplate);
  };
  
  const handleAddProperty = (newHotelData: NewHotelData) => {
    const newHotel: HotelProperty = {
        id: `hotel-${Date.now()}`,
        ...newHotelData,
    };

    setHotels(prevHotels => [...prevHotels, newHotel]);

    // This logic ensures new template IDs are unique
    let lastTemplateId = templates.reduce((maxId, t) => {
        const idNum = parseInt(t.id.replace('t', ''), 10);
        return idNum > maxId ? idNum : maxId;
    }, 0);

    const newTemplates = baseTemplates.map(baseTemplate => ({
        id: `t${++lastTemplateId}`,
        hotelId: newHotel.id,
        name: baseTemplate.name,
        stage: baseTemplate.stage,
        mjml: baseTemplate.mjml,
    }));

    setTemplates(prevTemplates => [...prevTemplates, ...newTemplates]);
  };


  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 font-sans">
      <Header 
        hotels={hotels}
        selectedHotelId={selectedHotel?.id}
        onHotelChange={handleHotelChange}
        onBack={selectedHotel ? handleBackToDashboard : undefined}
        onAddTemplate={selectedHotel ? handleAddTemplate : undefined}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {!selectedHotel ? (
          <Dashboard hotels={hotels} onSelectHotel={handleSelectHotel} onAddProperty={handleAddProperty} />
        ) : (
          <TemplateEditor
            key={selectedHotel.id} // Ensures component state resets on hotel change
            hotel={selectedHotel}
            templates={templates.filter(t => t.hotelId === selectedHotel.id)}
            activeTemplate={activeTemplate}
            onSelectTemplate={handleSelectTemplate}
            onSaveTemplate={handleSaveTemplate}
          />
        )}
      </main>
    </div>
  );
};

export default App;