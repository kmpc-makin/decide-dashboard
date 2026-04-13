export type Sector = 'textile' | 'batteries' | 'food' | 'packaging' | 'energy' | 'recycling' | 'smart-city';

export interface BusinessModel {
  id: string;
  name: string;
  description: string;
  sector: Sector;
  logo?: string;
  website?: string;
  established?: number;
  location?: string;
}

export const SECTOR_COLORS: Record<Sector, { primary: string; light: string; dark: string }> = {
  textile: {
    primary: '#EC4899', // pink-500
    light: '#FCE7F3',   // pink-100
    dark: '#BE185D'     // pink-700
  },
  batteries: {
    primary: '#F59E0B', // amber-500
    light: '#FEF3C7',   // amber-100
    dark: '#D97706'     // amber-700
  },
  food: {
    primary: '#10B981', // emerald-500
    light: '#D1FAE5',   // emerald-100
    dark: '#047857'     // emerald-700
  },
  packaging: {
    primary: '#8B5CF6', // violet-500
    light: '#EDE9FE',   // violet-100
    dark: '#6D28D9'     // violet-700
  },
  energy: {
    primary: '#EF4444', // red-500
    light: '#FEE2E2',   // red-100
    dark: '#B91C1C'     // red-700
  },
  recycling: {
    primary: '#06B6D4', // cyan-500
    light: '#CFFAFE',   // cyan-100
    dark: '#0891B2'     // cyan-700
  },
  'smart-city': {
    primary: '#6366F1', // indigo-500
    light: '#E0E7FF',   // indigo-100
    dark: '#4F46E5'     // indigo-700
  }
};

export const SECTOR_LABELS: Record<Sector, string> = {
  textile: 'Textile',
  batteries: 'Batteries',
  food: 'Food',
  packaging: 'Packaging',
  energy: 'Energy',
  recycling: 'Recycling',
  'smart-city': 'Smart City'
};
