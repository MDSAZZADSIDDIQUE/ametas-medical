'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  Loader2, 
  CheckCircle,
  Building,
  Mail,
  MapPin,
  Phone,
  Copyright
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ContentBlock {
  id: string;
  key: string;
  value: string;
  type: string;
  section: string;
}

export default function SettingsPage() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    const res = await fetch('/api/admin/content');
    const data = await res.json();
    // Filter for global section only
    setBlocks(data.filter((b: any) => b.section === 'global'));
    setLoading(false);
  };

  const saveBlock = async (id: string, value: string) => {
    setSaving(id);
    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        body: JSON.stringify({ id, value }),
      });
      setMessage('Settings updated!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving.');
    } finally {
      setSaving(null);
    }
  };

  const handleValueChange = (id: string, newValue: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, value: newValue } : b));
  };

  const saveAll = async () => {
    setSaving('all');
    for (const block of blocks) {
      await fetch('/api/admin/content', {
        method: 'PUT',
        body: JSON.stringify({ id: block.id, value: block.value }),
      });
    }
    setMessage('All settings saved!');
    setTimeout(() => setMessage(''), 3000);
    setSaving(null);
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  const getIcon = (key: string) => {
    if (key.includes('name')) return <Building size={18} />;
    if (key.includes('address')) return <MapPin size={18} />;
    if (key.includes('email')) return <Mail size={18} />;
    if (key.includes('fax') || key.includes('phone')) return <Phone size={18} />;
    if (key.includes('copyright')) return <Copyright size={18} />;
    return <Building size={18} />;
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Global Site Settings</h1>
          <p className="text-slate-500 text-sm">Manage company information, contact details, and footer settings.</p>
        </div>
        <div className="flex gap-3">
          {message && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl flex items-center text-sm"
            >
              <CheckCircle size={16} className="mr-2" />
              {message}
            </motion.div>
          )}
          <button 
            onClick={saveAll}
            disabled={saving === 'all'}
            className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
          >
            {saving === 'all' ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Save size={18} className="mr-2" />}
            Save All
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {blocks.map(block => (
          <div 
            key={block.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
              {getIcon(block.key)}
            </div>
            
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{block.key.replace('company_', '').replace(/_/g, ' ')}</label>
              <input 
                type="text"
                value={block.value}
                onChange={(e) => handleValueChange(block.id, e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>

            <button 
              onClick={() => saveBlock(block.id, block.value)}
              disabled={saving === block.id}
              className="px-4 py-2 text-primary hover:bg-primary/5 rounded-lg text-sm font-bold transition-all flex items-center"
            >
              {saving === block.id ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span className="ml-2 hidden md:inline">Save</span>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
        <h4 className="text-blue-800 font-bold mb-2 flex items-center">
          <MapPin size={18} className="mr-2" />
          Tip: Formatting Address
        </h4>
        <p className="text-blue-700 text-sm">
          Use commas (`, `) to separate lines in your address. For example: 
          <code className="bg-white/50 px-1 rounded ml-1 font-mono">123 Street, City, Country</code>. 
          The website will automatically break these into new lines.
        </p>
      </div>
    </div>
  );
}
