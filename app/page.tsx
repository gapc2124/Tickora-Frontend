import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryFilter from '@/components/home/CategoryFilter';
import EventGrid from '@/components/home/EventGrid';
import { mockCategories } from '@/lib/mockData';

// Petición directa a la base de datos (NestJS)
async function getEvents() {
  try {
    const res = await fetch('http://localhost:3000/eventos', { 
      cache: 'no-store' // Para que siempre traiga datos frescos
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function Home() {
  const dbEvents = await getEvents();
  
  const destacados = dbEvents.filter((e: any) => e.isDestacado);
  const proximos = dbEvents.filter((e: any) => !e.isDestacado);

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans">
      <Navbar />
      
      <main>
        {/* Banner principal con los eventos más importantes */}
        {destacados.length > 0 && <HeroCarousel events={destacados} />}
        
        {/* Filtro pegajoso de categorías */}
        <CategoryFilter categories={mockCategories} />
        
        <div className="bg-zinc-50 dark:bg-[#0a0a0c] min-h-screen pt-4 pb-12">
          
          {destacados.length > 0 && (
            <EventGrid 
              title="Eventos Destacados" 
              subtitle="Los eventos más esperados de la temporada"
              events={destacados} 
            />
          )}
          
          <EventGrid 
            title={dbEvents.length > 0 ? "Próximos Eventos" : "Aún no hay eventos registrados"} 
            events={proximos.length > 0 ? proximos : dbEvents} 
            viewAllLink={dbEvents.length > 0 ? "/eventos" : undefined}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
