import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-[#09090b] border-t border-zinc-200 dark:border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
                Tickora
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              La plataforma más moderna para descubrir y gestionar tus eventos favoritos.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-wider uppercase mb-4">
              Descubrir
            </h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Conciertos</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Teatro</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Deportes</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Familia</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-wider uppercase mb-4">
              Tickora
            </h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Acerca de nosotros</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Vende tus entradas</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Puntos de venta</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Términos y condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-wider uppercase mb-4">
              Atención al Cliente
            </h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="text-sm text-zinc-500 hover:text-accent dark:text-zinc-400 dark:hover:text-accent transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-zinc-400 xl:text-center">
            &copy; 2026 Tickora Inc. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0 text-zinc-400">
            {/* Aquí podrían ir iconos de métodos de pago o redes sociales */}
            <span className="text-sm">Pagos 100% Seguros</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
