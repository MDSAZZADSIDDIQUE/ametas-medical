'use client';

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { useContent } from "@/hooks/useContent";
import { Editable } from "@/components/Editable/Editable";

export default function ContactPage() {
  const { content, loading, language } = useContent();

  if (loading) return null;

  const title = language === 'de' ? 'KONTAKT' : 'CONTACT';

  return (
    <>
      <Navbar />
      <BreadcrumbBanner title={title} currentPage={title} />
      <main className="section-padding">
        <div className="container">
          <Editable contentKey="contact_page_title">
            <h2 className="text-primary text-5xl font-light mb-12 uppercase">
              {content.contact_page_title || title}
            </h2>
          </Editable>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            <div>
              <h3 className="text-lg font-semibold text-text-main mb-5 uppercase tracking-wider">
                {language === 'de' ? 'ADRESSE' : 'ADDRESS'}:
              </h3>
              <Editable contentKey="company_address" type="markdown">
                <div className="text-text-light space-y-1">
                  {content.company_address?.split(', ').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </Editable>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-main mb-5 uppercase tracking-wider">
                {language === 'de' ? 'TELEFON / FAX' : 'PHONE / FAX'}:
              </h3>
              <Editable contentKey="company_fax">
                <p className="text-text-light">{content.company_fax || '+49 3722 4696292'}</p>
              </Editable>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-main mb-5 uppercase tracking-wider">
                {language === 'de' ? 'E-MAIL' : 'E-MAIL'}:
              </h3>
              <div className="text-text-light space-y-4">
                <Editable contentKey="company_email">
                  <p>{content.company_email || 'info@ametas-medical.de'}</p>
                </Editable>
                <Editable contentKey="vcard_text">
                  <p className="text-sm text-text-muted">
                    {content.vcard_text || (language === 'de' ? 'Informationen herunterladen als: ' : 'Download information as: ')}
                    <strong className="text-text-main cursor-pointer hover:text-primary transition-colors">vCard</strong>
                  </p>
                </Editable>
              </div>
            </div>
          </div>

          {/* New Dynamic Area for additional contact info or maps */}
          <div className="mt-20 border-t pt-10">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
              {language === 'de' ? 'Zusätzliche Informationen' : 'Additional Information'}
            </h3>
            <Editable contentKey="contact_extra_text" type="rich-text" value={content.contact_extra_text}>
              <div className="prose max-w-none text-text-light">
                {content.contact_extra_text ? null : (
                  <p>{language === 'de' ? 'Hier können Sie zusätzliche Informationen wie Öffnungszeiten oder Wegbeschreibungen hinzufügen.' : 'You can add additional information here like opening hours or location descriptions.'}</p>
                )}
              </div>
            </Editable>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
