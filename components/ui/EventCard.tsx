"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  event: any;
}

export default function EventCard({ event }: EventCardProps) {
  const [imgError, setImgError] = useState(false);
  const validImageUrl = event.imageUrl && !imgError;

  return (
    <div className="group flex flex-col bg-white dark:bg-[#121214] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
      
      {/* Contenedor de Imagen */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-800 flex items-center justify-center">
        {validImageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title || 'Evento'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-purple-800 flex items-center justify-center">
            <span className="text-white/50 font-bold text-2xl uppercase tracking-widest">{event.title ? event.title.substring(0,2) : 'EV'}</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-xs font-semibold rounded-full shadow-sm">
            {event.category || 'General'}
          </span>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-lg leading-tight mb-3 text-zinc-900 dark:text-white line-clamp-2 group-hover:text-accent transition-colors">
          {event.title || 'Evento sin título'}
        </h3>
        
        <div className="flex flex-col gap-2 mb-4 mt-auto">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{event.date || 'Fecha por definir'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="truncate">{event.location || 'Lugar por definir'}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Desde</span>
            <span className="font-bold text-lg text-zinc-900 dark:text-white">S/ {event.price ? Number(event.price).toFixed(2) : '0.00'}</span>
          </div>
          <button className="px-4 py-2 bg-accent/10 hover:bg-accent text-accent hover:text-white font-medium rounded-lg text-sm transition-colors">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
