'use client';

import Image from 'next/image';
import { useContent } from '@/hooks/useContent';
import { Editable } from '@/components/Editable/Editable';

const IconSections = () => {
  const { content, loading } = useContent();

  if (loading) return (
    <section className="bg-primary py-16 text-white text-center">
      <div className="animate-pulse">Loading sections...</div>
    </section>
  );

  const assetPrefix = '/ametas';
  const sections = [
    {
      key: 'icon_1_title',
      icon: `${assetPrefix}/images/icons/AMETAS_Icons_Medicals.png`,
      hoverIcon: `${assetPrefix}/images/icons/AMETAS_Icons_Medicals_gelb.png`,
      title: content.icon_1_title || 'ADVANCED MEDICALS',
    },
    {
      key: 'icon_2_title',
      icon: `${assetPrefix}/images/icons/AMETAS_Icons_Technologies.png`,
      hoverIcon: `${assetPrefix}/images/icons/AMETAS_Icons_Technologies_gelb.png`,
      title: content.icon_2_title || 'EXCELLENT TECHNOLOGIES',
    },
    {
      key: 'icon_3_title',
      icon: `${assetPrefix}/images/icons/AMETAS_Icons_Science.png`,
      hoverIcon: `${assetPrefix}/images/icons/AMETAS_Icons_Science_gelb.png`,
      title: content.icon_3_title || 'APPLIED SCIENCES',
    }
  ];

  return (
    <section className="bg-primary py-16 text-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {sections.map((item, index) => {
            const titleParts = item.title.split(' ');
            const firstPart = titleParts[0];
            const remainingPart = titleParts.slice(1).join(' ');

            return (
              <div key={index} className="group flex flex-col items-center text-center transition-all duration-300">
                <div className="relative w-36 h-36 lg:w-44 lg:h-44 bg-secondary rounded-full flex items-center justify-center mb-8 transition-all duration-300 group-hover:-translate-y-3 group-hover:bg-white shadow-xl">
                  <Image 
                    src={item.icon} 
                    alt={item.title} 
                    width={80} 
                    height={80} 
                    className="absolute object-contain transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image 
                    src={item.hoverIcon} 
                    alt={item.title} 
                    width={80} 
                    height={80} 
                    className="absolute object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <Editable contentKey={item.key}>
                  <h3 className="text-xl lg:text-2xl font-light tracking-wider">
                    {firstPart} <span className="font-bold">{remainingPart}</span>
                  </h3>
                </Editable>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IconSections;
