export type Category = {
  id: string;
  name: string;
  icon?: string;
};

export type Event = {
  id?: string;
  _id?: string;
  titulo: string;
  fecha_evento: string | Date;
  lugar: string;
  precio: number;
  categoria: string;
  image_url: string;
  isDestacado?: boolean;
};

export const mockCategories: Category[] = [
  { id: '1', name: 'Todos' },
  { id: '2', name: 'Conciertos' },
  { id: '3', name: 'Teatro' },
  { id: '4', name: 'Deportes' },
  { id: '5', name: 'Fiestas' },
  { id: '6', name: 'Cursos' },
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    titulo: 'Festival Rock Lima 2026',
    fecha_evento: '15 Octubre 2026',
    lugar: 'Estadio Nacional, Lima',
    precio: 150,
    categoria: 'Conciertos',
    image_url: 'https://images.unsplash.com/photo-1540039155733-d7696d819924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isDestacado: true,
  },
  {
    id: 'e2',
    titulo: 'Obra: El Rey León',
    fecha_evento: '20 Noviembre 2026',
    lugar: 'Teatro Peruano Japonés',
    precio: 80,
    categoria: 'Teatro',
    image_url: 'https://images.unsplash.com/photo-1507676184212-d0330a151f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isDestacado: true,
  },
  {
    id: 'e3',
    titulo: 'Perú vs Brasil - Eliminatorias',
    fecha_evento: '05 Septiembre 2026',
    lugar: 'Estadio Nacional, Lima',
    precio: 120,
    categoria: 'Deportes',
    image_url: 'https://images.unsplash.com/photo-1518605368461-1ee71165920f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isDestacado: true,
  },
  {
    id: 'e4',
    titulo: 'Fiesta de Año Nuevo 2027',
    fecha_evento: '31 Diciembre 2026',
    lugar: 'Club Cultural, Miraflores',
    precio: 200,
    categoria: 'Fiestas',
    image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e5',
    titulo: 'Concierto Sinfónico Anime',
    fecha_evento: '10 Agosto 2026',
    lugar: 'Gran Teatro Nacional',
    precio: 95,
    categoria: 'Conciertos',
    image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e6',
    titulo: 'Curso: NestJS & Next.js Master',
    fecha_evento: '01 Septiembre 2026',
    lugar: 'Online',
    precio: 50,
    categoria: 'Cursos',
    image_url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];
