import React from 'react';
import EventCard from '@/components/ui/EventCard';
import { Event } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EventGridProps {
  title: string;
  subtitle?: string;
  events: Event[];
  viewAllLink?: string;
}

export default function EventGrid({ title, subtitle, events, viewAllLink }: EventGridProps) {
  if (!events || events.length === 0) return null;

  return (
    <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>
        
        {viewAllLink && (
          <Link 
            href={viewAllLink}
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {viewAllLink && (
        <div className="mt-8 flex justify-center sm:hidden">
           <Link 
            href={viewAllLink}
            className="px-6 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            Ver todos los eventos
          </Link>
        </div>
      )}
    </section>
  );
}
