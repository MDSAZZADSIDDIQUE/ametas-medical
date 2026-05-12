'use client';

import { Edit3 } from 'lucide-react';
import { useEditor } from '@/context/EditorContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface EditableProps {
  contentKey: string;
  children?: React.ReactNode;
  className?: string;
  type?: 'text' | 'markdown' | 'rich-text';
  value?: string;
}

export const Editable = ({ contentKey, children, className = "", type = 'text', value }: EditableProps) => {
  const { isEditor } = useEditor();

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditor) return;
    e.preventDefault();
    e.stopPropagation();
    
    // Detect if content is HTML to set the initial edit mode correctly
    const isHtml = value?.trim().startsWith('<');
    const detectedType = isHtml ? 'rich-text' : type;
    
    window.parent.postMessage({ 
      type: 'EDIT_ELEMENT', 
      key: contentKey, 
      editType: detectedType 
    }, '*');
  };

  const renderContent = () => {
    if (!value) return children;

    // If it's HTML (starts with <), always render as HTML regardless of 'type' prop
    if (value.trim().startsWith('<') || type === 'rich-text') {
      return (
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: value }} 
        />
      );
    }

    if (type === 'markdown') {
      return (
        <div className="prose max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
          >
            {value}
          </ReactMarkdown>
        </div>
      );
    }
    
    return value || children;
  };

  if (!isEditor) return <>{renderContent()}</>;

  return (
    <div 
      onClick={handleClick}
      className={`
        relative group cursor-pointer transition-all rounded-lg
        border-2 border-dashed border-primary/20 bg-primary/5 
        hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10
        ${className}
      `}
    >
      <div className="absolute -top-3 -right-3 bg-primary text-white p-1.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 z-50 border-2 border-white">
        <Edit3 size={14} />
      </div>
      
      <div className="absolute -top-6 left-0 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">
        {contentKey.replace(/_/g, ' ')}
      </div>

      <div className="p-1">
        {renderContent()}
      </div>
    </div>
  );
};
