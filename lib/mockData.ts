export type Category = {
  id: string;
  name: string;
  icon?: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  category: string;
  imageUrl: string;
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
    title: 'Festival Rock Lima 2026',
    date: '15 Octubre 2026',
    location: 'Estadio Nacional, Lima',
    price: 150,
    category: 'Conciertos',
    imageUrl: 'https://images.unsplash.com/photo-1540039155733-d7696d819924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isDestacado: true,
  },
  {
    id: 'e2',
    title: 'Obra: El Rey León',
    date: '20 Noviembre 2026',
    location: 'Teatro Peruano Japonés',
    price: 80,
    category: 'Teatro',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d0330a151f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isDestacado: true,
  },
  {
    id: 'e3',
    title: 'Perú vs Brasil - Eliminatorias',
    date: '05 Septiembre 2026',
    location: 'Estadio Nacional, Lima',
    price: 120,
    category: 'Deportes',
    imageUrl: 'https://images.unsplash.com/photo-1518605368461-1ee71165920f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isDestacado: true,
  },
  {
    id: 'e4',
    title: 'Fiesta de Año Nuevo 2027',
    date: '31 Diciembre 2026',
    location: 'Club Cultural, Miraflores',
    price: 200,
    category: 'Fiestas',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e5',
    title: 'Concierto Sinfónico Anime',
    date: '10 Agosto 2026',
    location: 'Gran Teatro Nacional',
    price: 95,
    category: 'Conciertos',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e6',
    title: 'Curso: NestJS & Next.js Master',
    date: '01 Septiembre 2026',
    location: 'Online',
    price: 50,
    category: 'Cursos',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];
