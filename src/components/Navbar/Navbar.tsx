'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContent } from '@/hooks/useContent';
import { useEditor } from '@/context/EditorContext';
import { Editable } from '@/components/Editable/Editable';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
  const { content, loading, language, changeLanguage } = useContent();
  const { isEditor } = useEditor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading && !language) return (
    <header className="h-[90px] lg:h-[120px] bg-white flex items-center shadow-md sticky top-0 z-[1000] animate-pulse">
      <div className="container">
        <div className="h-10 w-48 bg-slate-100 rounded"></div>
      </div>
    </header>
  );

  const getLinkHref = (href: string) => {
    if (isEditor && !href.startsWith('http') && !href.includes('downloads')) {
      return `${href}?preview=true`;
    }
    return href;
  };

  const navItems = [
    { name: language === 'de' ? 'KONTAKT' : 'CONTACT', href: '/contact' },
    { name: language === 'de' ? 'IMPRESSUM' : 'IMPRINT', href: '/imprint' },
    { name: language === 'de' ? 'DATENSCHUTZ' : 'DATA PROTECTION', href: '/data-protection' },
    { name: language === 'de' ? 'AGB' : 'TERMS OF USE', href: '/downloads/Allgemeine_Geschftsbedingungen_der_AMETAS_medical_GmbH_Stand.pdf', external: true },
    { name: language === 'de' ? 'RETOUREN' : 'RETURN POLICY', href: '/downloads/Retouren_AMETAS.pdf', external: true },
  ];

  const languages = [
    { code: 'de', name: 'German', flag: '/images/icons/flags/de.png' },
    { code: 'uk', name: 'UK English', flag: '/images/icons/flags/uk.png' },
    { code: 'us', name: 'US English', flag: '/images/icons/flags/us.png' },
  ];

  return (
    <header className="h-[90px] lg:h-[120px] bg-white flex items-center shadow-md sticky top-0 z-[1000]">
      <div className="container">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link href={getLinkHref("/")} className="flex items-center shrink-0">
            <Editable contentKey="site_logo">
              <Image 
                src={content.site_logo || "/images/logo/Logo_Ametas.png"} 
                alt="AMETAS medical" 
                width={300} 
                height={80} 
                priority
                className="object-contain w-auto h-12 lg:h-20"
              />
            </Editable>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-col items-end gap-3">
            <nav>
              <ul className="flex items-center gap-6">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={getLinkHref(item.href)}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-[0.8rem] font-bold text-primary hover:text-secondary transition-colors tracking-widest"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex gap-4 items-center">
              <div className="flex gap-3">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`transition-all hover:scale-110 border-2 rounded-sm overflow-hidden ${language === lang.code ? 'border-primary shadow-sm scale-110' : 'border-transparent opacity-60'}`}
                    title={lang.name}
                  >
                    <Image src={lang.flag} alt={lang.name} width={24} height={15} className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[90px] bg-white z-[999] p-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-8">
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={getLinkHref(item.href)} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-primary tracking-widest block">{item.name}</Link>
                </li>
              ))}
            </ul>
            <div className="h-px bg-slate-100" />
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Globe size={14} /> Language</span>
              <div className="flex gap-4">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => { changeLanguage(lang.code); setIsMenuOpen(false); }}
                    className={`flex items-center gap-2 font-bold px-3 py-2 rounded-lg border ${language === lang.code ? 'bg-primary text-white border-primary' : 'text-primary border-slate-200'}`}
                  >
                    <Image src={lang.flag} alt={lang.name} width={24} height={15} /> {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
