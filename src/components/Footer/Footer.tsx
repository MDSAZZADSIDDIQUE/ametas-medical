'use client';

import Link from 'next/link';
import { useContent } from '@/hooks/useContent';
import { useEditor } from '@/context/EditorContext';
import { Editable } from '@/components/Editable/Editable';

const Footer = () => {
  const { content, loading, language } = useContent();
  const { isEditor } = useEditor();

  if (loading) return null;

  const getLinkHref = (href: string) => {
    let finalHref = href.startsWith('/') ? `/ametas${href}` : href;
    if (href === '/') finalHref = '/ametas/';
    
    if (isEditor && !href.startsWith('http') && !href.includes('downloads')) {
      return `${finalHref}${finalHref.includes('?') ? '&' : '?'}preview=true`;
    }
    return finalHref;
  };

  const navItems = [
    { name: language === 'de' ? 'KONTAKT' : 'CONTACT', href: '/contact' },
    { name: language === 'de' ? 'IMPRESSUM' : 'IMPRINT', href: '/imprint' },
    { name: language === 'de' ? 'DATENSCHUTZ' : 'DATA PROTECTION', href: '/data-protection' },
    { name: language === 'de' ? 'AGB' : 'TERMS OF USE', href: '/downloads/Allgemeine_Geschftsbedingungen_der_AMETAS_medical_GmbH_Stand.pdf', external: true },
    { name: language === 'de' ? 'RETOUREN' : 'RETURN POLICY', href: '/downloads/Retouren_AMETAS.pdf', external: true },
  ];

  return (
    <footer className="bg-primary text-white pt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 mb-16">
          <div>
            <h4 className="text-xl font-semibold mb-8 tracking-widest uppercase">
              {language === 'de' ? 'NAVIGATION' : 'NAVIGATION'}
            </h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={getLinkHref(item.href)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-all"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-8 tracking-widest uppercase">
              {language === 'de' ? 'KONTAKT' : 'CONTACT'}
            </h4>
            <div className="space-y-2 opacity-90">
              <Editable contentKey="company_name">
                <p className="font-bold text-lg mb-4">{content.company_name || 'AMETAS MEDICAL GMBH'}</p>
              </Editable>
              
              <Editable contentKey="company_address">
                <div className="space-y-1">
                  {content.company_address?.split(', ').map((line, i) => (
                    <p key={i}>{line.toUpperCase()}</p>
                  )) || (
                    <>
                      <p>CHRISTOPHSTRASSE 6-8,</p>
                      <p>09212 LIMBACH-OBERFROHNA</p>
                      <p>GERMANY</p>
                    </>
                  )}
                </div>
              </Editable>

              <div className="mt-8 pt-6 border-t border-white/20 space-y-4">
                <Editable contentKey="company_fax">
                  <p><span className="font-bold mr-3">{language === 'de' ? 'FAX' : 'FAX'}:</span> {content.company_fax || '+49 3722 4696292'}</p>
                </Editable>
                <Editable contentKey="company_email">
                  <p><span className="font-bold mr-3">{language === 'de' ? 'EMAIL' : 'EMAIL'}:</span> {content.company_email || 'INFO@AMETAS-MEDICAL.DE'}</p>
                </Editable>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary py-5 text-primary text-center font-medium text-sm">
        <div className="container">
          <Editable contentKey="company_copyright">
            <p>{content.company_copyright || `AMETAS medical GmbH © ${new Date().getFullYear()} | Datenschutz`}</p>
          </Editable>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
