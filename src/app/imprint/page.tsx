'use client';

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BreadcrumbBanner from "@/components/BreadcrumbBanner/BreadcrumbBanner";
import { useContent } from "@/hooks/useContent";
import { Editable } from "@/components/Editable/Editable";

export default function ImprintPage() {
  const { content, loading, language } = useContent();

  if (loading) return null;

  const title = language === 'de' ? 'IMPRESSUM' : 'IMPRINT';

  return (
    <>
      <Navbar />
      <BreadcrumbBanner title={title} currentPage={title} />
      <main className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-16">
            <Editable contentKey="imprint_main_markdown" type="markdown" value={content.imprint_main_markdown} />
            
            <div className="border-t pt-10 mt-10">
              <h2 className="text-3xl font-light text-primary mb-8 uppercase tracking-wider">
                {language === 'de' ? 'Haftungsausschluss' : 'Disclaimer'}
              </h2>
              <Editable contentKey="imprint_disclaimer_markdown" type="markdown" value={content.imprint_disclaimer_markdown} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
