import useSWR from 'swr';
import { KPI, APIResponse, KPICategory } from '@/types/kpi';
import { seedKPIs } from '@/lib/demo/seed';

// Fetcher used for the mock / demo route only.
const demoFetcher = async (url: string): Promise<APIResponse<KPI[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const urlObj = new URL(url, 'http://localhost');
  const category = urlObj.searchParams.get('category');

  let filtered = [...seedKPIs];
  if (category && ['ecological', 'economic', 'social'].includes(category)) {
    filtered = filtered.filter((k) => k.category === category);
  }

  const kpisWithIds = filtered.map((kpi) => ({
    ...kpi,
    _id: `mock_${kpi.identifier}`,
    lastUpdated: new Date(),
  }));

  return {
    success: true,
    data: kpisWithIds,
    message: `Found ${kpisWithIds.length} KPIs`,
  };
};

/**
 * Retrieve the full set of demo KPIs (used by /demo/generic-kpi only).
 */
export function useDemoKPIs() {
  const { data, error, isLoading } = useSWR(
    '/api/kpis',
    demoFetcher,
    { revalidateOnFocus: false },
  );
  return {
    kpis: data?.data || [],
    isLoading,
    isError: error,
  };
}

/**
 * Retrieve demo KPIs filtered by TBL category.
 */
export function useDemoKPIsByCategory(category: KPICategory | null) {
  const url = category ? `/api/kpis?category=${category}` : '/api/kpis';
  const { data, error, isLoading } = useSWR(
    url,
    demoFetcher,
    { revalidateOnFocus: false },
  );
  return {
    kpis: data?.data || [],
    isLoading,
    isError: error,
  };
}
