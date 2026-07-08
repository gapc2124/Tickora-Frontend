"use client";

import React, { useState } from "react";
import { Users, Calendar, Ticket, Send, Loader2 } from "lucide-react";

type ModuleType = "usuarios" | "eventos" | "entradas";

// Asegúrate de que NestJS esté corriendo en el 3000
const API_BASE_URL = "http://localhost:3000";

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState<ModuleType>("usuarios");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  
  // State for forms
  const [formData, setFormData] = useState<any>({});

  const modules = [
    { id: "usuarios", icon: Users, label: "Usuarios", color: "text-blue-400" },
    { id: "eventos", icon: Calendar, label: "Eventos", color: "text-purple-400" },
    { id: "entradas", icon: Ticket, label: "Entradas", color: "text-green-400" },
  ];

  const handleFetchAll = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(`${API_BASE_URL}/${activeModule}`);
      const data = await res.json();
      setResponse(data);
    } catch (error: any) {
      setResponse({ error: "Error de conexión: Verifica que NestJS esté corriendo y CORS esté habilitado." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    
    try {
      const res = await fetch(`${API_BASE_URL}/${activeModule}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);
      if (res.ok) setFormData({}); // Limpiar formulario si hubo éxito
    } catch (error: any) {
      setResponse({ error: "Error de conexión: Verifica que NestJS esté corriendo y CORS esté habilitado." });
    } finally {
      setLoading(false);
    }
  };
  
  // Formulario dinámico según el módulo seleccionado
  const renderForm = () => {
    switch (activeModule) {
      case "usuarios":
        return (
          <>
            <input className="glass-input p-3 rounded-xl w-full mb-3 text-sm placeholder:text-zinc-500" placeholder="Nombre" value={formData.nombre || ""} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
            <input className="glass-input p-3 rounded-xl w-full mb-3 text-sm placeholder:text-zinc-500" placeholder="Apellidos" value={formData.apellidos || ""} onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })} required />
            <input className="glass-input p-3 rounded-xl w-full mb-3 text-sm placeholder:text-zinc-500" type="email" placeholder="Email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input className="glass-input p-3 rounded-xl w-full mb-3 text-sm placeholder:text-zinc-500" type="password" placeholder="Contraseña (mínimo 6)" value={formData.password || ""} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <select className="glass-input p-3 rounded-xl w-full mb-4 text-sm text-zinc-400" value={formData.rol || "user"} onChange={(e) => setFormData({ ...formData, rol: e.target.value })}>
              <option value="user">Rol: User</option>
              <option value="admin">Rol: Admin</option>
              <option value="organizer">Rol: Organizer</option>
            </select>
          </>
        );
      case "eventos":
        return (
          <div className="text-zinc-400 text-sm mb-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <p>ℹ️ Formulario de Creación de Eventos pendiente de implementación en el UI.</p>
            <p className="mt-2 text-xs">Puedes usar el botón "GET All" para ver los existentes por ahora.</p>
          </div>
        );
      case "entradas":
         return (
          <div className="text-zinc-400 text-sm mb-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <p>ℹ️ Formulario de Creación de Entradas pendiente de implementación en el UI.</p>
            <p className="mt-2 text-xs">Puedes usar el botón "GET All" para ver las existentes por ahora.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans dark">
      {/* Sidebar Lateral */}
      <aside className="w-64 glass-panel border-r border-white/5 flex flex-col z-10 shadow-2xl">
        <div className="p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">
            Tickora
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-semibold">API Test Center</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => { setActiveModule(mod.id as ModuleType); setResponse(null); setFormData({}); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)] text-white border border-white/10" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? mod.color : "text-zinc-500"}`} />
                <span className="font-medium capitalize">{mod.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-6 text-xs text-zinc-600 border-t border-white/5 bg-black/20">
          <p className="font-semibold text-zinc-500 mb-1">Target API:</p> 
          <span className="text-green-400/90 font-mono tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {API_BASE_URL}
          </span>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-background to-background">
        <header className="p-10 pb-6">
          <h2 className="text-4xl font-light tracking-tight capitalize flex items-center gap-3">
            Módulo <span className="font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">{activeModule}</span>
          </h2>
          <p className="text-zinc-400 mt-2 text-lg font-light">Interactúa en tiempo real con la base de datos.</p>
        </header>

        <div className="flex-1 px-10 pb-10 overflow-hidden flex gap-8">
          
          {/* Panel de Acciones */}
          <div className="w-[400px] flex flex-col gap-6 overflow-y-auto pr-2">
            <div className="glass-panel p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:border-white/20 transition-all">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> Petición GET
              </h3>
              <p className="text-sm text-zinc-400 mb-5">Obtener lista completa de /{activeModule}.</p>
              <button 
                onClick={handleFetchAll}
                disabled={loading}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors py-3 rounded-xl font-medium flex justify-center items-center gap-2 text-sm text-white"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ejecutar GET All"}
              </button>
            </div>

            <div className="glass-panel p-6 rounded-2xl shadow-xl border-t-[3px] border-t-accent hover:shadow-2xl transition-all flex-1">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span> Petición POST
              </h3>
              <p className="text-sm text-zinc-400 mb-5">Crear un nuevo registro.</p>
              
              <form onSubmit={handleCreate}>
                {renderForm()}
                
                {activeModule === "usuarios" && (
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all py-3 rounded-xl font-medium flex justify-center items-center gap-2 text-sm mt-4"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Ejecutar POST</>}
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Visor de Respuesta JSON */}
          <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md z-10">
              <h3 className="text-sm font-semibold tracking-wide text-zinc-300 flex items-center gap-2">
                <span className="font-mono text-accent">{"{ }"}</span> Salida JSON
              </h3>
              {response && (
                <span className="text-xs font-mono text-zinc-500 px-2 py-1 bg-white/5 rounded-md">Status: Procesado</span>
              )}
            </div>
            
            <div className="p-6 overflow-auto flex-1 bg-[#050505] font-mono text-sm relative">
              {!response && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 gap-3">
                  <div className="w-16 h-16 border border-white/5 rounded-2xl flex items-center justify-center bg-white/[0.02]">
                    <span className="font-mono text-2xl">/</span>
                  </div>
                  <p>Esperando respuesta del servidor</p>
                </div>
              )}
              {loading && !response && (
                <div className="absolute inset-0 flex items-center justify-center text-accent">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              )}
              {response && (
                <pre className="text-green-400/90 whitespace-pre-wrap break-words leading-relaxed">
                  {JSON.stringify(response, null, 2)}
                </pre>
              )}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
