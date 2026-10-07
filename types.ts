export enum Category {
  Patrimonial = 'PATRIMONIAL E SABERES',
  Eventos = 'EVENTOS CULTURAIS',
  Documentarios = 'DOCUMENTÁRIOS',
  MeioAmbiente = 'MEIO AMBIENTE',
  Bioeconomia = 'BIOECONOMIA',
  Gestao = 'GESTÃO CULTURAL',
  // Retrocompatibilidade
  Educacao = 'PATRIMONIAL E SABERES',
  Tecnologia = 'EVENTOS CULTURAIS',
  Idiomas = 'DOCUMENTÁRIOS',
  Sustentabilidade = 'MEIO AMBIENTE',
  Alimentos = 'BIOECONOMIA',
  ENEM = 'PATRIMONIAL E SABERES', 
  EJA = 'GESTÃO CULTURAL'
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  lastProgress?: number; // Tempo em segundos onde o usuário parou
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link';
  url: string;
  isDownloaded?: boolean; 
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CourseModule {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  category: Category;
  description: string;
  instructor: string;
  thumbnail: string;
  heroImage: string;
  progress: number;
  duration: string;
  modulesCount: number;
  modules?: CourseModule[];
  materials?: Material[];
  quiz?: QuizQuestion[];
}

export interface UserProfile {
  name: string;
  email: string;
  cpf: string;
  avatar: string;
  level: number;
  badges: string[];
  plan: string;
}

export interface Certificate {
  id: string;
  title: string;
  date: string;
}
