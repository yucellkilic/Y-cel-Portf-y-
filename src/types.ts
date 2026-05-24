export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  color: string;
  stats: { label: string; value: string }[];
  hologramType: 'sphere' | 'torus' | 'wave' | 'dna';
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  accentColor: string;
  systemCode: string;
}

export type ActiveScene = 'hero' | 'about' | 'services' | 'webgl' | 'projects' | 'contact';
