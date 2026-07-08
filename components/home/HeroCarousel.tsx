"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { Event } from '@/lib/mockData';

interface HeroCarouselProps {
  events: Event[];
}

export default function HeroCarousel({ events }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  if (!events || events.length === 0) return null;

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] bg-zinc-900 overflow-hidden group">
      {/* Slides */}
      {events.map((event, index) => (
        <div
          key={event.id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.title || 'Evento Destacado'}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-black to-accent flex items-center justify-center">
                <span className="text-white/20 font-bold text-6xl uppercase">{event.title ? event.title.substring(0,3) : 'EVT'}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
          </div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 pb-16">
            <div className="max-w-7xl mx-auto flex flex-col items-start">
              <span className="px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg">
                Evento Destacado
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight shadow-sm max-w-4xl">
                {event.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-6 text-zinc-300 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-sm md:text-base">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-sm md:text-base">{event.location}</span>
                </div>
              </div>

              <button className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all transform hover:scale-105">
                Comprar Entradas
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentIndex ? "bg-accent w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
