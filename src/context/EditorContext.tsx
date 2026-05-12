'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const EditorContext = createContext({ isEditor: false });

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditor, setIsEditor] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsEditor(window.self !== window.top && searchParams.get('preview') === 'true');
  }, [searchParams]);

  return (
    <EditorContext.Provider value={{ isEditor }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
