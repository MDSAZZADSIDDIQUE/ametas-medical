'use client';

import { useContent } from '@/hooks/useContent';
import { Editable } from '@/components/Editable/Editable';

const Welcome = () => {
  const { content, loading } = useContent();

  if (loading) return null;

  const defaultPortfolio = `
<ul>
  <li>LICENSING AND ACQUISITION OF GENERIC MEDICINES</li>
  <li>MARKETING, SALES AND LIFE CYCLE MANAGEMENT OF MEDICINES IN VARIOUS THERAPEUTIC AREAS AND GENERICS</li>
</ul>
  `;

  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24 items-start">
          <div>
            <Editable contentKey="welcome_title">
              <h2 className="text-primary text-4xl lg:text-5xl font-semibold mb-8 relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-16 after:h-1 after:bg-secondary">
                {content.welcome_title || 'WELCOME!'}
              </h2>
            </Editable>
            <Editable contentKey="welcome_text" type="rich-text" value={content.welcome_text}>
              <p className="text-text-light text-lg leading-relaxed mb-10">
                {content.welcome_text || `AMETAS medical GmbH was founded in 2017. As a pharmaceutical company from the center of Germany, 
                our focus is on therapeutic needs, the healing of diseases and the relief of symptoms. 
                Our aim is our service obligations towards our patients at a high level of economy, 
                supply security, quality and technical expertise.`}
              </p>
            </Editable>
          </div>
          <div className="bg-bg-light p-8 lg:p-10 rounded-2xl shadow-sm">
            <Editable contentKey="portfolio_title">
              <h3 className="text-2xl font-medium text-text-main mb-8">
                {content.portfolio_title || 'OUR PORTFOLIO'}
              </h3>
            </Editable>
            
            <div className="portfolio-list">
              <style jsx>{`
                .portfolio-list :global(ul) {
                  list-style-type: none !important;
                  padding-left: 0 !important;
                  margin: 0 !important;
                }
                .portfolio-list :global(li) {
                  position: relative;
                  padding-left: 2rem;
                  font-weight: 500;
                  margin-bottom: 1.5rem;
                  color: #4a5568;
                  font-size: 1rem;
                }
                .portfolio-list :global(li::before) {
                  content: '•';
                  position: absolute;
                  left: 0;
                  color: var(--color-primary);
                  font-size: 2rem;
                  top: -0.5rem;
                }
              `}</style>
              
              <Editable 
                contentKey="portfolio_items_html" 
                type="rich-text" 
                value={content.portfolio_items_html || defaultPortfolio}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
