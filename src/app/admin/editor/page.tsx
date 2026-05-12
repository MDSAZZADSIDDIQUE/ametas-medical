'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Save, 
  Loader2, 
  Smartphone,
  Tablet,
  Monitor,
  Edit3,
  X,
  Type,
  Code,
  FileText,
  Home,
  RefreshCw,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { RichTextEditor } from '@/components/RichTextEditor/RichTextEditor';

export default function VisualEditor() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [editMode, setEditMode] = useState<'text' | 'markdown' | 'rich-text'>('text');
  const [language, setLanguage] = useState<string>('uk');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetchBlocks(language);
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'EDIT_ELEMENT') {
        setSelectedKey(event.data.key);
        if (event.data.editType) setEditMode(event.data.editType);
      }
      if (event.data.type === 'LANG_CHANGE') {
        setLanguage(event.data.lang);
        fetchBlocks(event.data.lang);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [language]);

  const fetchBlocks = async (lang: string) => {
    const res = await fetch(`/api/admin/content?lang=${lang}`);
    const data = await res.json();
    setBlocks(data);
    setLoading(false);
  };

  const getBlock = (key: string) => {
    const existing = blocks.find(b => b.key === key);
    if (existing) return existing;
    return { key, value: '' };
  };

  const handleUpdate = (key: string, value: string) => {
    setBlocks(prev => {
      const exists = prev.find(b => b.key === key);
      if (exists) {
        return prev.map(b => b.key === key ? { ...b, value } : b);
      } else {
        return [...prev, { key, value, language }];
      }
    });
    
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'LIVE_UPDATE', key, value }, '*');
    }
  };

  const saveSelected = async () => {
    if (!selectedKey) return;
    const block = getBlock(selectedKey);

    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        body: JSON.stringify({ 
          id: block.id, 
          key: block.key, 
          value: block.value,
          lang: language
        }),
      });
      if (res.ok) {
        const updatedBlock = await res.json();
        setBlocks(prev => prev.map(b => b.key === selectedKey ? updatedBlock : b));
        setMessage('Saved!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage('Error');
    } finally {
      setSaving(false);
    }
  };

  const navigateToHome = () => {
    if (iframeRef.current) {
      iframeRef.current.src = '/?preview=true';
    }
    setSelectedKey(null);
  };

  const reloadPreview = () => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = currentSrc;
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  const selectedBlock = selectedKey ? getBlock(selectedKey) : null;

  return (
    <div className="h-[calc(100vh-64px)] -m-8 flex overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-slate-700 flex items-center text-sm uppercase tracking-wider">
              <Edit3 size={16} className="mr-2 text-primary" />
              Editor
            </h3>
            <div className="flex items-center gap-1 bg-slate-200 rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-600">
              <Globe size={10} /> {language.toUpperCase()}
            </div>
          </div>
          {selectedKey && (
            <button onClick={() => setSelectedKey(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!selectedKey ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-slate-400 text-sm font-medium">Select an element to edit</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Editing Language</p>
                <div className="flex gap-2 justify-center">
                  {['de', 'uk', 'us'].map((l) => (
                    <button 
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`px-3 py-1 rounded-md text-xs font-bold uppercase transition-all ${language === l ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-slate-200'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-3 italic">Changes will only apply to the selected language.</p>
              </div>
              <button 
                onClick={navigateToHome}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all text-xs font-bold"
              >
                <Home size={14} /> BACK TO HOME
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{selectedKey}</span>
                <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200">
                  <button onClick={() => setEditMode('text')} className={`p-1 ${editMode === 'text' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}><Type size={14} /></button>
                  <button onClick={() => setEditMode('markdown')} className={`p-1 ${editMode === 'markdown' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}><Code size={14} /></button>
                  <button onClick={() => setEditMode('rich-text')} className={`p-1 ${editMode === 'rich-text' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}><FileText size={14} /></button>
                </div>
              </div>

              {editMode === 'rich-text' ? (
                <RichTextEditor content={selectedBlock?.value || ''} onChange={(val) => handleUpdate(selectedKey, val)} />
              ) : (
                <textarea 
                  value={selectedBlock?.value || ''}
                  onChange={(e) => handleUpdate(selectedKey, e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-4 text-sm font-mono min-h-[300px] outline-none focus:ring-1 focus:ring-primary shadow-inner"
                />
              )}

              <button 
                onClick={saveSelected}
                disabled={saving}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {saving ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
                {message || `SAVE FOR ${language.toUpperCase()}`}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col bg-slate-200/50 relative">
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <button onClick={navigateToHome} className="p-2 text-slate-400 hover:text-primary transition-all hover:bg-slate-50 rounded" title="Go to Home Page"><Home size={20} /></button>
            <button onClick={reloadPreview} className="p-2 text-slate-400 hover:text-primary transition-all hover:bg-slate-50 rounded" title="Reload Preview"><RefreshCw size={18} /></button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setViewport('mobile')} className={`p-2 rounded transition-all ${viewport === 'mobile' ? 'bg-primary text-white shadow-lg' : 'text-slate-400'}`}><Smartphone size={18} /></button>
            <button onClick={() => setViewport('tablet')} className={`p-2 rounded transition-all ${viewport === 'tablet' ? 'bg-primary text-white shadow-lg' : 'text-slate-400'}`}><Tablet size={18} /></button>
            <button onClick={() => setViewport('desktop')} className={`p-2 rounded transition-all ${viewport === 'desktop' ? 'bg-primary text-white shadow-lg' : 'text-slate-400'}`}><Monitor size={18} /></button>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold border border-emerald-100 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Editing {language}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center">
          <motion.div 
            animate={{ width: viewport === 'mobile' ? 375 : viewport === 'tablet' ? 768 : '100%' }}
            className={`h-full bg-white shadow-2xl rounded-t-lg overflow-hidden border border-slate-300 relative mx-auto`}
          >
            <iframe ref={iframeRef} src={`/?preview=true&lang=${language}`} className="w-full h-full border-none" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
