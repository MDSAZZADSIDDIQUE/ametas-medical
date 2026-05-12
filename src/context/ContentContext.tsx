'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ContentContextType {
  content: Record<string, string>;
  slides: any[];
  loading: boolean;
  language: string;
  changeLanguage: (lang: string) => void;
  refresh: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<{ blocks: any[], slides: any[] }>({ blocks: [], slides: [] });
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState<string>('uk');

  const fetchContent = useCallback(async (lang: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/content?lang=${lang}`);
      const json = await res.json();
      setData(json);
      
      const map: Record<string, string> = {};
      json.blocks?.forEach((b: any) => {
        map[b.key] = b.value;
      });
      setContent(map);
    } catch (err) {
      console.error('Failed to fetch content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize language from localStorage or URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    const savedLang = localStorage.getItem('site_lang') || 'uk';
    const initialLang = urlLang || savedLang;
    
    setLanguage(initialLang);
    fetchContent(initialLang);
  }, [fetchContent]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'LIVE_UPDATE') {
        const { key, value } = event.data;
        setContent(prev => ({ ...prev, [key]: value }));
      }
      if (event.data.type === 'LANG_CHANGE') {
        const newLang = event.data.lang;
        setLanguage(newLang);
        fetchContent(newLang);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fetchContent]);

  const changeLanguage = (newLang: string) => {
    setLanguage(newLang);
    localStorage.setItem('site_lang', newLang);
    fetchContent(newLang);
    
    // Notify iframes (for editor sync)
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.contentWindow?.postMessage({ type: 'LANG_CHANGE', lang: newLang }, '*');
    });
  };

  return (
    <ContentContext.Provider value={{ 
      ...data, 
      content, 
      loading, 
      language, 
      changeLanguage, 
      refresh: () => fetchContent(language) 
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
