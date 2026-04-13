/**
 * URI used by the synthetic "CEBM Mock Data" entry in the business
 * model selector. Any component can check `isMockModel(uri)` to
 * decide whether to render mock or live data.
 */
export const MOCK_MODEL_URI = 'mock:decide-demo-cebm';

export function isMockModel(uri: string | null): boolean {
  return uri === MOCK_MODEL_URI;
}

export const MOCK_MODEL_ENTRY = {
  uri: MOCK_MODEL_URI,
  label: 'CEBM Mock Data (Demo)',
  cebmType: 'Cycling',
  sector: 'Food',
  region: 'Danube Region',
  maturityLevel: 'Prototype',
  strategy: 'Repurpose',
} as const;

/** Mock values for the demo CEBM entry. Used until real data is pushed to the platform. */

export interface MockWheyKPIs {
  // Section A - Toolbox KPIs (placeholders until live)
  circularityPenetration: {
    percentage: number;
    circularActivities: number;
    totalActivities: number;
  };
  wasteHotspots: Array<{
    label: string;
    suggestion: string;
  }>;

  // Section B - Pilot-reported KPIs (simulated until Miha collects them).
  // These five indicators together constitute the Triple Bottom Line
  // Scorecard (KPI 8), distributed across the three TBL dimensions.
  extensionKpis: Array<{
    uri: string;
    title: string;
    dimension: 'ecological' | 'economic' | 'social';
    value: number;
    unit: string;
    visualizationHint: 'number' | 'percentage';
  }>;
}

/**
 * Whey pilot case mock values, aligned with the source data in
 * `whey_case_e3value_mockup_table.xlsx`.
 */
export const WHEY_MOCK: MockWheyKPIs = {
  circularityPenetration: {
    percentage: 36,
    circularActivities: 5,
    totalActivities: 14,
  },

  wasteHotspots: [
    { label: 'Spent whey residue', suggestion: 'Repurpose as animal feed' },
    { label: 'Packaging offcuts', suggestion: 'Reuse in pallet wrapping' },
    { label: 'Thermal losses', suggestion: 'Recover via heat exchanger' },
  ],

  extensionKpis: [
    {
      uri: 'mock:whey_co2_reduction',
      title: 'CO₂ Emission Reduction',
      dimension: 'ecological',
      value: 2400,
      unit: 'tons/year',
      visualizationHint: 'number',
    },
    {
      uri: 'mock:whey_recycling_rate',
      title: 'Recycling Rate',
      dimension: 'ecological',
      value: 72,
      unit: '%',
      visualizationHint: 'percentage',
    },
    {
      uri: 'mock:whey_material_reuse',
      title: 'Material Reuse Rate',
      dimension: 'ecological',
      value: 58,
      unit: '%',
      visualizationHint: 'percentage',
    },
    {
      uri: 'mock:whey_circular_revenue',
      title: 'Circular Revenue Share',
      dimension: 'economic',
      value: 42,
      unit: '%',
      visualizationHint: 'percentage',
    },
    {
      uri: 'mock:whey_jobs_created',
      title: 'Jobs Created',
      dimension: 'social',
      value: 12,
      unit: 'FTE',
      visualizationHint: 'number',
    },
  ],
};
