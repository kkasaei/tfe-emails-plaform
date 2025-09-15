
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HotelProperty, EmailTemplate } from '../types';
import TemplateList from './TemplateList';
import { Icon } from './Icon';

// This is a browser-version of mjml. It will be available on the window object
// after the script in index.html loads.
declare global {
  interface Window {
    mjml: (mjml: string, options: object) => { html: string; errors: any[] };
  }
}

type ViewMode = 'desktop' | 'mobile';

interface TemplateEditorProps {
  hotel: HotelProperty;
  templates: EmailTemplate[];
  activeTemplate: EmailTemplate | null;
  onSelectTemplate: (template: EmailTemplate) => void;
  onSaveTemplate: (templateId: string, mjml: string) => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  hotel,
  templates,
  activeTemplate,
  onSelectTemplate,
  onSaveTemplate,
}) => {
  const [mjmlCode, setMjmlCode] = useState<string>('');
  const [renderedHtml, setRenderedHtml] = useState<string>('');
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [mjmlErrors, setMjmlErrors] = useState<any[]>([]);

  // For resizable panels
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorPaneRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    // Sync the editor's code with the active template from props
    setMjmlCode(activeTemplate?.mjml || '');
    setMjmlErrors([]);
    setSaveState('idle'); // Reset save state when template changes
  }, [activeTemplate]);

  const handleSave = () => {
    if (!activeTemplate) return;
    setSaveState('saving');
    onSaveTemplate(activeTemplate.id, mjmlCode);
    // Simulate async operation and provide user feedback
    setTimeout(() => {
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 1500);
    }, 500);
  };
  
  const renderMjml = useCallback(() => {
    if (!mjmlCode.trim()) {
      setRenderedHtml('');
      setMjmlErrors([]);
      setIsRendering(false);
      return;
    }

    if (typeof window.mjml === 'function') {
      try {
        setIsRendering(true);
        const { html, errors } = window.mjml(mjmlCode.replace(/{{hotelName}}/g, hotel.name), {});
        
        if (errors.length > 0) {
          console.error('MJML Errors:', errors);
          setMjmlErrors(errors);
        } else {
          setRenderedHtml(html);
          setMjmlErrors([]);
        }
      } catch (e: any) {
        console.error('Error rendering MJML', e);
        setMjmlErrors([{ formattedMessage: e.message || 'An unknown parsing error occurred.' }]);
      } finally {
        setTimeout(() => setIsRendering(false), 300); // add a small delay to prevent flickering
      }
    } else {
        setRenderedHtml('<p>MJML renderer not available.</p>');
    }
  }, [mjmlCode, hotel.name]);

  useEffect(() => {
    const renderTimeout = setTimeout(renderMjml, 500);
    return () => clearTimeout(renderTimeout);
  }, [mjmlCode, renderMjml]);

  // --- Panel Resizing Logic ---
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !editorPaneRef.current || !editorContainerRef.current) {
      return;
    }
    const containerRect = editorContainerRef.current.getBoundingClientRect();
    const newEditorWidth = e.clientX - containerRect.left;
    
    // Set constraints for resizing
    const minWidth = containerRect.width * 0.25; // 25% minimum width
    const maxWidth = containerRect.width * 0.75; // 75% maximum width

    if (newEditorWidth > minWidth && newEditorWidth < maxWidth) {
      editorPaneRef.current.style.width = `${newEditorWidth}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);


  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-110px)] bg-white dark:bg-neutral-800 rounded-lg shadow-xl dark:shadow-black/20 overflow-hidden">
      {/* Left Panel: Template List */}
      <div className="w-full md:w-1/4 lg:w-1/5 border-r border-gray-200 dark:border-neutral-700 overflow-y-auto shrink-0">
        <TemplateList
          templates={templates}
          activeTemplateId={activeTemplate?.id || null}
          onSelectTemplate={onSelectTemplate}
        />
      </div>

      <div ref={editorContainerRef} className="flex flex-row flex-grow min-w-0">
        {/* Middle Panel: MJML Editor */}
        <div ref={editorPaneRef} className="w-1/2 flex flex-col min-w-[200px] relative">
          <div className="p-3 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center bg-gray-50 dark:bg-neutral-800 shrink-0">
            <h3 className="font-semibold text-gray-700 dark:text-neutral-300">MJML Editor</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                disabled={!activeTemplate || saveState === 'saving'}
                className="px-4 py-1.5 text-sm text-center bg-black dark:bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all font-semibold disabled:bg-indigo-400 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed"
              >
                {saveState === 'idle' && 'Save'}
                {saveState === 'saving' && 'Saving...'}
                {saveState === 'saved' && 'Saved!'}
              </button>
            </div>
          </div>
          <div className="flex-grow relative">
            <textarea
              value={mjmlCode}
              onChange={(e) => setMjmlCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm border-0 resize-none focus:ring-0 bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-200 placeholder:text-gray-400 dark:placeholder:text-neutral-500 absolute inset-0"
              placeholder="Enter MJML code here..."
            />
          </div>
          {mjmlErrors.length > 0 && (
            <div className="flex-shrink-0 max-h-48 overflow-y-auto bg-red-50 dark:bg-red-900/20 border-t-2 border-red-200 dark:border-red-500/30">
              <div className="flex justify-between items-center p-2 border-b border-red-200/50 dark:border-red-500/20">
                <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">
                  {mjmlErrors.length} Error{mjmlErrors.length > 1 ? 's' : ''}
                </h4>
                <button onClick={() => setMjmlErrors([])} className="text-red-500 dark:text-red-400 hover:bg-red-200/50 dark:hover:bg-red-900/30 p-1 rounded-full">
                  <Icon type="close" className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2">
                {mjmlErrors.map((error, index) => (
                  <div key={index} className="font-mono text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap p-1 rounded">
                    {error.formattedMessage}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Resizer Handle */}
        <div 
          className="w-px cursor-col-resize bg-gray-200 dark:bg-neutral-700 hover:bg-indigo-400 dark:hover:bg-indigo-500 transition-colors duration-200"
          onMouseDown={handleMouseDown}
        />

        {/* Right Panel: Preview */}
        <div className="flex flex-col flex-grow min-w-0">
          <div className="p-3 flex justify-between items-center bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 shrink-0">
            <h3 className="font-semibold text-gray-700 dark:text-neutral-300">Preview</h3>
            <div className="flex items-center space-x-2">
               <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-gray-500 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700'}`}
                aria-label="Desktop view"
              >
                <Icon type="desktop" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-gray-500 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700'}`}
                aria-label="Mobile view"
              >
                <Icon type="mobile" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-grow p-4 bg-neutral-200 dark:bg-neutral-900 overflow-auto relative">
            {isRendering && (
               <div className="absolute inset-0 bg-white/75 dark:bg-black/75 flex items-center justify-center z-10">
                  <Icon type="spinner" className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
              </div>
            )}
            <iframe
              srcDoc={renderedHtml}
              title="Email Preview"
              className={`mx-auto bg-white rounded-md shadow-lg transition-all duration-300 ${viewMode === 'desktop' ? 'w-full' : 'w-[375px]'}`}
              style={{ height: '100%' }}
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
