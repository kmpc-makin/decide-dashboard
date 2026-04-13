export type KPICategory = 'ecological' | 'economic' | 'social';

export type KPITrend = 'up' | 'down' | 'stable';

export type ChartType = 'progress' | 'bar' | 'line' | 'donut' | 'gauge' | 'area' | 'trend';

export interface HistoricalDataPoint {
  date: Date;
  value: number;
}

export interface KPIMetadata {
  scope?: string;
  frequency?: string;
  [key: string]: any;
}

export interface KPI {
  _id?: string;
  identifier: string;
  category: KPICategory;
  title: string;
  value: number;
  unit: string;
  target: number;
  trend: KPITrend;
  chartType: ChartType;
  dataSource: string;
  kpiSource: string;
  lastUpdated: Date;
  historicalData?: HistoricalDataPoint[];
  metadata?: KPIMetadata;
}

export interface CreateKPIInput extends Omit<KPI, '_id' | 'lastUpdated'> {
  lastUpdated?: Date;
}

export interface UpdateKPIInput extends Partial<Omit<KPI, '_id'>> {
  identifier: string;
}

// Category colour mapping for UI components (mock / demo route only).
export const CATEGORY_COLORS: Record<
  KPICategory,
  { primary: string; light: string; dark: string; barBg: string }
> = {
  ecological: {
    primary: '#10B981',
    light: '#D1FAE5',
    dark: '#047857',
    barBg: '#12B981',
  },
  economic: {
    primary: '#3B82F6',
    light: '#DBEAFE',
    dark: '#1D4ED8',
    barBg: '#3C82F6',
  },
  social: {
    primary: '#8B5CF6',
    light: '#EDE9FE',
    dark: '#6D28D9',
    barBg: '#8B5CF6',
  },
};

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
