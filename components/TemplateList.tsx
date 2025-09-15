
import React from 'react';
import { EmailTemplate, GuestJourneyStage } from '../types';

interface TemplateListProps {
  templates: EmailTemplate[];
  activeTemplateId: string | null;
  onSelectTemplate: (template: EmailTemplate) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({ templates, activeTemplateId, onSelectTemplate }) => {
  const groupedTemplates = templates.reduce((acc, template) => {
    const stage = template.stage;
    if (!acc[stage]) {
      acc[stage] = [];
    }
    acc[stage].push(template);
    return acc;
  }, {} as Record<GuestJourneyStage, EmailTemplate[]>);

  const stageOrder = [
    GuestJourneyStage.PRE_ARRIVAL,
    GuestJourneyStage.CHECK_IN,
    GuestJourneyStage.ADD_ONS,
    GuestJourneyStage.CHECK_OUT,
    GuestJourneyStage.POST_STAY,
    GuestJourneyStage.GENERAL,
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">Email Templates</h2>
      <div className="space-y-6">
        {stageOrder.map(stage => (
          groupedTemplates[stage] && (
            <div key={stage}>
              <h3 className="text-xs font-semibold uppercase text-gray-500 dark:text-neutral-400 tracking-wider mb-2">{stage}</h3>
              <ul className="space-y-1">
                {groupedTemplates[stage].map(template => (
                  <li key={template.id}>
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                        activeTemplateId === template.id
                          ? 'bg-indigo-100 text-indigo-700 font-semibold dark:bg-indigo-900/50 dark:text-indigo-300'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-300 dark:hover:bg-neutral-700/50 dark:hover:text-white'
                      }`}
                    >
                      {template.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default TemplateList;