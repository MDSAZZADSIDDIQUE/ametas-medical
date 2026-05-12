'use client';

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { useContent } from "@/hooks/useContent";
import { Editable } from "@/components/Editable/Editable";
import { DynamicSection } from "@/components/Editable/DynamicSection";

export default function DataProtectionPage() {
  const { content, loading, language } = useContent();

  if (loading) return null;

  const title = language === 'de' ? 'DATENSCHUTZ' : 'DATA PROTECTION';

  return (
    <>
      <Navbar />
      <BreadcrumbBanner title={title} currentPage={title} />
      <main className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Core Legal Blocks */}
            <Editable contentKey="dp_main_markdown" type="markdown" value={content.dp_main_markdown} />
            <Editable contentKey="dp_matomo_markdown" type="markdown" value={content.dp_matomo_markdown} />

            {/* Dynamic Zone: User can add anything here */}
            <div className="border-t pt-10 mt-10">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">
                {language === 'de' ? 'Zusätzliche Abschnitte' : 'Additional Sections'}
              </h3>
              <DynamicSection section="dp_extra" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
