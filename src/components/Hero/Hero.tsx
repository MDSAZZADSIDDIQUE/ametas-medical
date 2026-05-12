'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useContent } from '@/hooks/useContent';
import { Editable } from '@/components/Editable/Editable';

const Hero = () => {
  const { slides: dbSlides, content, loading } = useContent();
  const [current, setCurrent] = useState(0);

  const slides = dbSlides.length > 0 ? dbSlides : [
    { id: '1', image: '/images/slider/slider1.jpg', title: '', subtitle: '' },
    { id: '2', image: '/images/slider/slider2.jpg', title: '', subtitle: '' },
    { id: '3', image: '/images/slider/slider3.jpg', title: '', subtitle: '' },
  ];

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-120px)] bg-slate-900 flex items-center justify-center">
        <div className="text-slate-500 animate-pulse font-light tracking-widest uppercase">Loading Ametas...</div>
      </div>
    );
  }

  return (
    <section className="relative h-[calc(100vh-120px)] min-h-[500px] lg:min-h-[600px] w-full overflow-hidden group bg-slate-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title || `Slide ${index + 1}`}
            fill
            className="object-cover brightness-75"
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      <div className="absolute inset-0 z-20 flex items-center bg-gradient-to-r from-black/40 to-transparent">
        <div className="container">
          <div className="max-w-[800px] text-white">
            <Editable contentKey="hero_title">
              <h1 className="text-4xl lg:text-7xl leading-tight mb-5 uppercase font-semibold fade-in">
                {content.hero_title || 'SUSTAINABLE AND WELL THOUGHT-OUT SOLUTIONS'}
              </h1>
            </Editable>
            <Editable contentKey="hero_subtitle">
              <p className="text-lg lg:text-2xl font-light tracking-widest fade-in">
                {content.hero_subtitle || 'for health, care, quality and trust'}
              </p>
            </Editable>
          </div>
        </div>
      </div>

      {/* Dots navigation */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? 'bg-secondary w-8' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
