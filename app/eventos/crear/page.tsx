"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, Calendar, MapPin, Tag, DollarSign, Users, Type, AlignLeft } from 'lucide-react';
import Image from 'next/image';

export default function CrearEventoPage() {
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    lugar: '',
    fecha_evento: '',
    precio: '',
    categoria: 'Conciertos',
    entradas_disponibles: ''
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const savedUser = localStorage.getItem('tickora_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Redirigir si no está logueado
      router.push('/');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!imageFile) {
        throw new Error('Por favor, selecciona una imagen para el evento.');
      }
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://44.223.102.185:3000';

      // PASO 1: Subir Imagen a S3
      const imageFormData = new FormData();
      imageFormData.append('file', imageFile);

      const uploadRes = await fetch(`${API_URL}/eventos/upload`, {
        method: 'POST',
        body: imageFormData,
      });

      if (!uploadRes.ok) {
        throw new Error('Error al subir la imagen al servidor S3');
      }

      const uploadData = await uploadRes.json();
      const image_url = uploadData.image_url || uploadData.imageUrl; // Por si acaso

      if (!image_url) {
        throw new Error('El servidor no devolvió la URL de la imagen.');
      }

      // PASO 2: Crear Evento en MongoDB
      const eventPayload = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        lugar: formData.lugar,
        fecha_evento: new Date(formData.fecha_evento).toISOString(),
        precio: Number(formData.precio),
        categoria: formData.categoria,
        entradas_disponibles: Number(formData.entradas_disponibles),
        image_url: image_url,
        creador_id: user.id || user._id, // Depende de cómo venga del backend en el login
      };

      const createRes = await fetch(`${API_URL}/eventos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      });

      if (!createRes.ok) {
        throw new Error('Error al crear el evento en la base de datos');
      }

      // Éxito: Redirigir al inicio
      router.push('/');
      
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado al procesar tu solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <div className="min-h-screen bg-zinc-50 dark:bg-black"></div>; // Loading o redireccionando

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
            Crea tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Evento</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Completa los detalles para publicar tu evento en Tickora.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-lg rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 sm:p-10">
            
            {error && (
              <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm flex items-center">
                <span className="font-semibold mr-2">¡Ups!</span> {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
              
              {/* PORTADA (Full Width) */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Portada del Evento
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-300 dark:border-zinc-700 border-dashed rounded-2xl hover:border-accent dark:hover:border-accent transition-colors relative overflow-hidden group">
                  <div className="space-y-2 text-center z-10 relative">
                    {!imagePreview ? (
                      <>
                        <UploadCloud className="mx-auto h-12 w-12 text-zinc-400 group-hover:text-accent transition-colors" />
                        <div className="flex text-sm text-zinc-600 dark:text-zinc-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white dark:bg-zinc-800 rounded-md font-medium text-accent hover:text-accent/80 focus-within:outline-none px-1"
                          >
                            <span>Sube una imagen</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required />
                          </label>
                          <p className="pl-1">o arrástrala y suéltala aquí</p>
                        </div>
                        <p className="text-xs text-zinc-500">PNG, JPG, GIF hasta 5MB</p>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                         <label htmlFor="file-upload" className="cursor-pointer">
                            <span className="px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full text-sm font-medium backdrop-blur-sm transition-colors shadow-lg">Cambiar Imagen</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                         </label>
                      </div>
                    )}
                  </div>
                  {imagePreview && (
                    <Image src={imagePreview} alt="Preview" fill className="object-cover absolute inset-0 z-0 opacity-40 dark:opacity-50" />
                  )}
                </div>
              </div>

              {/* TÍTULO */}
              <div className="sm:col-span-2">
                <label htmlFor="titulo" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <Type className="w-4 h-4 text-accent" />
                  Título del Evento
                </label>
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  required
                  value={formData.titulo}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-4 py-3 transition-colors"
                  placeholder="Ej. Concierto de Rock en Vivo"
                />
              </div>

              {/* DESCRIPCIÓN */}
              <div className="sm:col-span-2">
                <label htmlFor="descripcion" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <AlignLeft className="w-4 h-4 text-accent" />
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={4}
                  required
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-4 py-3 transition-colors resize-none"
                  placeholder="Cuéntanos más sobre qué trata este evento..."
                />
              </div>

              {/* LUGAR */}
              <div>
                <label htmlFor="lugar" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  Lugar / Ubicación
                </label>
                <input
                  type="text"
                  name="lugar"
                  id="lugar"
                  required
                  value={formData.lugar}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-4 py-3 transition-colors"
                  placeholder="Ej. Estadio Nacional"
                />
              </div>

              {/* FECHA Y HORA */}
              <div>
                <label htmlFor="fecha_evento" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  Fecha y Hora
                </label>
                <input
                  type="datetime-local"
                  name="fecha_evento"
                  id="fecha_evento"
                  required
                  value={formData.fecha_evento}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-4 py-3 transition-colors"
                />
              </div>

              {/* CATEGORÍA */}
              <div>
                <label htmlFor="categoria" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <Tag className="w-4 h-4 text-accent" />
                  Categoría
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  required
                  value={formData.categoria}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-4 py-3 transition-colors"
                >
                  <option>Conciertos</option>
                  <option>Teatro</option>
                  <option>Deportes</option>
                  <option>Festivales</option>
                  <option>Cultura</option>
                  <option>Tecnología</option>
                </select>
              </div>

              {/* ENTRADAS */}
              <div>
                <label htmlFor="entradas_disponibles" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <Users className="w-4 h-4 text-accent" />
                  Entradas Disponibles (Aforo)
                </label>
                <input
                  type="number"
                  name="entradas_disponibles"
                  id="entradas_disponibles"
                  required
                  min="1"
                  value={formData.entradas_disponibles}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-4 py-3 transition-colors"
                  placeholder="Ej. 150"
                />
              </div>

              {/* PRECIO */}
              <div className="sm:col-span-2 md:col-span-1">
                <label htmlFor="precio" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  <DollarSign className="w-4 h-4 text-accent" />
                  Precio por Entrada ($)
                </label>
                <input
                  type="number"
                  name="precio"
                  id="precio"
                  required
                  min="0"
                  step="0.01"
                  value={formData.precio}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-4 py-3 transition-colors"
                  placeholder="Ej. 50.00"
                />
              </div>
              
            </div>

            <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white transition-all transform ${
                  isSubmitting 
                    ? 'bg-zinc-400 dark:bg-zinc-600 cursor-not-allowed' 
                    : 'bg-accent hover:bg-accent/90 hover:scale-[1.02] hover:shadow-accent/30'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando Evento...
                  </span>
                ) : (
                  'Publicar Evento'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
