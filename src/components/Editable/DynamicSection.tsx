'use client';

import { useContent } from "@/hooks/useContent";
import { Editable } from "./Editable";
import { Plus } from "lucide-react";
import { useEditor } from "@/context/EditorContext";

interface DynamicSectionProps {
  section: string;
  className?: string;
}

export const DynamicSection = ({ section, className = "" }: DynamicSectionProps) => {
  const { content, loading, refresh } = useContent();
  const { isEditor } = useEditor();

  if (loading) return null;

  // Filter blocks that belong to this section
  // We'll look for content keys that we know are part of this section or have the section field set
  // In our hooks, 'content' is a key-value pair. We might need a better way to get section-specific blocks.
  
  // For now, let's assume dynamic blocks for a section have keys like: [section]_[timestamp]
  const dynamicBlocks = Object.entries(content)
    .filter(([key]) => key.startsWith(`${section}_`))
    .sort(); // Sort by key (which includes timestamp)

  const handleAdd = async () => {
    const title = window.prompt("Enter a name for this new block (e.g. 'Extra Info'):");
    if (!title) return;

    const key = `${section}_${Date.now()}`;
    const value = `## ${title}\nNew content goes here...`;

    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        body: JSON.stringify({ key, value, section }),
      });
      refresh(); // Refresh content to show the new block
    } catch (err) {
      alert("Error adding block");
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {dynamicBlocks.map(([key, value]) => (
        <Editable 
          key={key} 
          contentKey={key} 
          type="markdown" 
          value={value as string} 
        />
      ))}

      {isEditor && (
        <button 
          onClick={handleAdd}
          className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
        >
          <div className="bg-slate-100 group-hover:bg-primary group-hover:text-white p-1 rounded-full transition-colors">
            <Plus size={16} />
          </div>
          <span className="font-bold text-sm uppercase tracking-wider">Add New Block to {section}</span>
        </button>
      )}
    </div>
  );
};
