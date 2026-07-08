"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, Menu, LogOut } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Cargar usuario guardado
  useEffect(() => {
    const savedUser = localStorage.getItem('tickora_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('tickora_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tickora_user');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
                  Tickora
                </span>
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full leading-5 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition-colors"
                  placeholder="Busca eventos, artistas o lugares..."
                />
              </div>
            </div>

            {/* Navigation & Profile */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm font-medium text-zinc-600 hover:text-accent dark:text-zinc-300 dark:hover:text-accent transition-colors">
                Conciertos
              </Link>
              <Link href="#" className="text-sm font-medium text-zinc-600 hover:text-accent dark:text-zinc-300 dark:hover:text-accent transition-colors">
                Teatro
              </Link>
              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800"></div>
              <Link href="/dashboard" className="text-sm font-medium text-zinc-600 hover:text-accent dark:text-zinc-300 dark:hover:text-accent transition-colors">
                API Test
              </Link>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <Link 
                    href="/eventos/crear"
                    className="flex items-center justify-center bg-accent/10 hover:bg-accent text-accent hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all border border-accent/20 hover:border-accent"
                  >
                    Crear Evento
                  </Link>
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center border border-accent/20">
                      {user.nombre.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.nombre}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  <User className="w-4 h-4" />
                  Ingresar
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button className="p-2 rounded-md text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
            </div>
            
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
