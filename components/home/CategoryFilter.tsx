"use client";
import React, { useState } from 'react';
import { Category } from '@/lib/mockData';

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [activeId, setActiveId] = useState<string>('1'); // 'Todos' by default

  return (
    <div className="w-full bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-800 py-4 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeId === cat.id
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
