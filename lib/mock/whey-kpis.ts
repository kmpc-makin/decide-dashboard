/**
 * Hardcoded data for the Whey Protein CEBM entry. This is the
 * default selection until the pilot case is available through the
 * DECIDE data platform.
 */

export const WHEY_PROTEIN_URI = 'cebm:whey-protein-cebm';

export function isWheyProteinModel(uri: string | null): boolean {
  return uri === WHEY_PROTEIN_URI;
}

export const WHEY_PROTEIN_ENTRY = {
  uri: WHEY_PROTEIN_URI,
  label: 'Whey Protein CEBM',
  cebmType: 'Cycling',
  sector: 'Food',
  region: 'Germany',
  maturityLevel: 'Prototype',
  strategy: 'Repurpose',
} as const;

// ---------------------------------------------------------------------------
// Section A data
// ---------------------------------------------------------------------------

export interface WheyProfile {
  uri: string;
  label: string;
  cebmType: string;
  sector: string;
  region: string;
  maturityLevel: string;
  strategies: string[];
  valuePropositions: string[];
  customerSegments: string[];
  keyPartners: string[];
}

export const WHEY_PROFILE: WheyProfile = {
  uri: WHEY_PROTEIN_URI,
  label: 'Whey Protein CEBM',
  cebmType: 'Cycling',
  sector: 'Food',
  region: 'Germany',
  maturityLevel: 'Prototype',
  strategies: ['Repurpose', 'Recycle'],
  valuePropositions: [
    'WPC80 protein powder',
    'Lactose powder',
  ],
  customerSegments: [
    'Nutritional supplement companies',
    'Food manufacturers',
    'Sports and health brands',
    'Pharmaceutical companies',
  ],
  keyPartners: ['Cheese manufacturers', 'Energy Supplier', 'Logistics providers'],
};

export interface WheyActor {
  uri: string;
  name: string;
  role: 'partner' | 'customer' | 'workforce' | 'supplier' | 'other';
}

export const WHEY_ECOSYSTEM: { actors: WheyActor[]; totalCount: number } = {
  actors: [
    // Suppliers
    { uri: 'whey:cheese-manufacturers', name: 'Cheese manufacturers', role: 'supplier' },
    { uri: 'whey:ultrafiltration-mfr', name: 'Ultrafiltration Manufacturer', role: 'supplier' },
    { uri: 'whey:centrifuges-mfr', name: 'Centrifuges Manufacturer', role: 'supplier' },
    { uri: 'whey:spray-dryer-mfr', name: 'Spray Dryer Manufacturer', role: 'supplier' },
    { uri: 'whey:evaporators-mfr', name: 'Evaporators Manufacturer', role: 'supplier' },
    { uri: 'whey:pasteurizers-mfr', name: 'Pasteurizers Manufacturer', role: 'supplier' },
    { uri: 'whey:crystallizers-mfr', name: 'Crystallizers Manufacturer', role: 'supplier' },
    { uri: 'whey:mixers-blenders', name: 'Mixers and Blenders', role: 'supplier' },
    { uri: 'whey:packaging-machines', name: 'Packaging Machines', role: 'supplier' },
    { uri: 'whey:storage-silos', name: 'Storage Silos', role: 'supplier' },
    { uri: 'whey:logistics', name: 'Logistics providers', role: 'supplier' },
    { uri: 'whey:energy-supplier', name: 'Energy Supplier', role: 'supplier' },
    // Workforce
    { uri: 'whey:workforce', name: 'Workforce', role: 'workforce' },
    // Customers
    { uri: 'whey:nutritional-supplement', name: 'Nutritional supplement companies', role: 'customer' },
    { uri: 'whey:food-manufacturers', name: 'Food manufacturers', role: 'customer' },
    { uri: 'whey:sports-health-brands', name: 'Sports and health brands', role: 'customer' },
    { uri: 'whey:pharmaceutical', name: 'Pharmaceutical companies', role: 'customer' },
  ],
  totalCount: 17,
};

export interface WheyValueExchange {
  uri: string;
  label: string;
  amount: number;
}

// Top exchanges from the e3Value mockup table, sorted by 5-year total
export const WHEY_VALUE_EXCHANGES: WheyValueExchange[] = [
  { uri: 've:wpc80-supplements', label: 'WPC80 sales to nutritional supplement companies', amount: 80_000_000 },
  { uri: 've:wpc80-food', label: 'WPC80 sales to food manufacturers', amount: 40_000_000 },
  { uri: 've:raw-whey-supply', label: 'Raw liquid whey supply', amount: 27_600_000 },
  { uri: 've:operators', label: 'Operators (labour)', amount: 25_000_000 },
  { uri: 've:lactose-sales', label: 'Lactose sales to sports and health brands', amount: 20_000_000 },
  { uri: 've:spray-dryer-purchase', label: 'Spray dryer purchase', amount: 13_000_000 },
  { uri: 've:thermal-energy', label: 'Thermal energy supply', amount: 11_000_000 },
  { uri: 've:inbound-transport', label: 'Inbound whey transport', amount: 9_120_000 },
  { uri: 've:electrical-energy', label: 'Electrical energy supply', amount: 8_500_000 },
  { uri: 've:crystallizer-purchase', label: 'Crystallizer purchase', amount: 4_800_000 },
  { uri: 've:warehouse-staff', label: 'Warehouse staff', amount: 2_250_000 },
  { uri: 've:packaging-labour', label: 'Packaging labour / service', amount: 2_250_000 },
  { uri: 've:shift-manager', label: 'Shift manager', amount: 2_250_000 },
  { uri: 've:administration', label: 'Administration', amount: 2_250_000 },
  { uri: 've:outbound-transport', label: 'Outbound customer transport', amount: 2_000_000 },
  { uri: 've:spray-dryer-maintenance', label: 'Spray dryer maintenance', amount: 1_300_000 },
  { uri: 've:evaporator-purchase', label: 'Evaporator purchase', amount: 1_000_000 },
  { uri: 've:pasteurizer-purchase', label: 'Pasteurizer purchase', amount: 950_000 },
  { uri: 've:wpc-packaging', label: 'WPC packaging equipment', amount: 800_000 },
  { uri: 've:storage-silo-purchase', label: 'Storage silo purchase', amount: 750_000 },
  { uri: 've:ultrafiltration-purchase', label: 'Ultrafiltration unit purchase', amount: 600_000 },
  { uri: 've:nanofiltration-purchase', label: 'Nanofiltration / reverse osmosis purchase', amount: 600_000 },
  { uri: 've:mixer-purchase', label: 'Mixer and blender purchase', amount: 500_000 },
  { uri: 've:lactose-packaging', label: 'Lactose packaging equipment', amount: 400_000 },
  { uri: 've:centrifuge-purchase', label: 'Centrifuge purchase', amount: 300_000 },
  { uri: 've:evaporator-maintenance', label: 'Evaporator maintenance', amount: 100_000 },
  { uri: 've:pasteurizer-maintenance', label: 'Pasteurizer maintenance', amount: 95_000 },
  { uri: 've:crystallizer-maintenance', label: 'Crystallizer maintenance', amount: 80_000 },
  { uri: 've:storage-silo-maintenance', label: 'Storage silo maintenance', amount: 75_000 },
  { uri: 've:ultrafiltration-maintenance', label: 'Ultrafiltration maintenance', amount: 60_000 },
  { uri: 've:mixer-maintenance', label: 'Mixer and blender maintenance', amount: 50_000 },
  { uri: 've:nanofiltration-maintenance', label: 'Nanofiltration maintenance', amount: 30_000 },
];

export const WHEY_REVENUE_COST = {
  // 5-year totals from xlsx Actors_Source for Whey Enterprise
  revenue: 140_000_000,
  cost: 110_534_000,
  profit: 29_466_000,
  exchangeCount: WHEY_VALUE_EXCHANGES.length,
};

export const WHEY_CIRCULARITY = {
  percentage: 10,
  circularActivities: 3,
  totalActivities: 31,
};

export const WHEY_WASTE_HOTSPOTS = [
  { label: 'Permeate (ultrafiltration byproduct)', suggestion: 'Repurpose as feed-grade lactose' },
  { label: 'Permeate (reverse osmosis byproduct)', suggestion: 'Recover as process water' },
  { label: 'Thermal losses (drying stages)', suggestion: 'Reduce via heat recovery' },
  { label: 'Packaging waste', suggestion: 'Reuse in inbound logistics' },
];

// ---------------------------------------------------------------------------
// Section B - pilot-reported KPIs
// ---------------------------------------------------------------------------

export interface ExtensionKPIData {
  uri: string;
  title: string;
  dimension: 'ecological' | 'economic' | 'social';
  value: number;
  unit: string;
  visualizationHint: 'number' | 'percentage';
}

export const WHEY_EXTENSION_KPIS: ExtensionKPIData[] = [
  {
    uri: 'whey:co2_reduction',
    title: 'CO₂ Emission Reduction',
    dimension: 'ecological',
    value: 2400,
    unit: 'tons/year',
    visualizationHint: 'number',
  },
  {
    uri: 'whey:recycling_rate',
    title: 'Recycling Rate',
    dimension: 'ecological',
    value: 85,
    unit: '%',
    visualizationHint: 'percentage',
  },
  {
    uri: 'whey:material_reuse',
    title: 'Material Reuse Rate',
    dimension: 'ecological',
    value: 58,
    unit: '%',
    visualizationHint: 'percentage',
  },
  {
    uri: 'whey:circular_revenue',
    title: 'Circular Revenue Share',
    dimension: 'economic',
    value: 95,
    unit: '%',
    visualizationHint: 'percentage',
  },
  {
    uri: 'whey:jobs_created',
    title: 'Jobs Created',
    dimension: 'social',
    value: 195,
    unit: 'FTE',
    visualizationHint: 'number',
  },
];
