'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Save, 
  Image as ImageIcon,
  Loader2,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { motion, Reorder } from 'framer-motion';

interface HeroSlide {
  id: string;
  image: string;
  title: string | null;
  subtitle: string | null;
  order: number;
  isActive: boolean;
}

export default function HeroManagement() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const res = await fetch('/api/admin/hero');
    const data = await res.json();
    setSlides(data);
    setLoading(false);
  };

  const addSlide = () => {
    const newSlide: any = {
      id: `temp-${Date.now()}`,
      image: '/images/slider/slider1.jpg',
      title: 'New Slide Title',
      subtitle: 'New Slide Subtitle',
      order: slides.length,
      isActive: true,
      isNew: true
    };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (id: string, field: keyof HeroSlide, value: any) => {
    setSlides(slides.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteSlide = async (id: string) => {
    if (id.startsWith('temp-')) {
      setSlides(slides.filter(s => s.id !== id));
      return;
    }

    if (confirm('Are you sure you want to delete this slide?')) {
      await fetch(`/api/admin/hero?id=${id}`, { method: 'DELETE' });
      fetchSlides();
    }
  };

  const saveAll = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      for (const slide of slides) {
        if ((slide as any).isNew) {
          await fetch('/api/admin/hero', {
            method: 'POST',
            body: JSON.stringify({ ...slide, id: undefined }),
          });
        } else {
          await fetch('/api/admin/hero', {
            method: 'PUT',
            body: JSON.stringify(slide),
          });
        }
      }
      setMessage('All changes saved successfully!');
      fetchSlides();
    } catch (err) {
      setMessage('Error saving changes.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hero Slider Management</h1>
          <p className="text-slate-500 text-sm">Drag to reorder slides and update their content.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={addSlide}
            className="flex items-center px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium transition-all"
          >
            <Plus size={18} className="mr-2" />
            Add Slide
          </button>
          <button 
            onClick={saveAll}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Save size={18} className="mr-2" />}
            Save Changes
          </button>
        </div>
      </div>

      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl flex items-center"
        >
          <CheckCircle size={18} className="mr-2" />
          {message}
        </motion.div>
      )}

      <div className="grid gap-6">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row"
          >
            <div className="w-full md:w-64 h-40 relative bg-slate-100 flex-shrink-0">
              <Image src={slide.image} alt="Preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white rounded-lg text-primary hover:bg-primary hover:text-white transition-colors">
                  <ImageIcon size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Image URL</label>
                  <input 
                    type="text" 
                    value={slide.image} 
                    onChange={(e) => updateSlide(slide.id, 'image', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <select 
                    value={slide.isActive ? 'active' : 'inactive'}
                    onChange={(e) => updateSlide(slide.id, 'isActive', e.target.value === 'active')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Title</label>
                  <input 
                    type="text" 
                    value={slide.title || ''} 
                    onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Subtitle</label>
                  <input 
                    type="text" 
                    value={slide.subtitle || ''} 
                    onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t md:border-t-0 md:border-l border-slate-100 flex md:flex-col justify-between items-center gap-2">
              <div className="flex md:flex-col gap-2">
                <button 
                  onClick={() => {
                    if (index > 0) {
                      const newSlides = [...slides];
                      [newSlides[index], newSlides[index-1]] = [newSlides[index-1], newSlides[index]];
                      setSlides(newSlides.map((s, i) => ({ ...s, order: i })));
                    }
                  }}
                  className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-colors border border-transparent hover:border-slate-200"
                >
                  <MoveUp size={18} />
                </button>
                <button 
                  onClick={() => {
                    if (index < slides.length - 1) {
                      const newSlides = [...slides];
                      [newSlides[index], newSlides[index+1]] = [newSlides[index+1], newSlides[index]];
                      setSlides(newSlides.map((s, i) => ({ ...s, order: i })));
                    }
                  }}
                  className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-colors border border-transparent hover:border-slate-200"
                >
                  <MoveDown size={18} />
                </button>
              </div>
              <button 
                onClick={() => deleteSlide(slide.id)}
                className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
