import useSWR from 'swr';
import type {
  GraphDBBusinessModel,
  GraphDBPerformanceIndicator,
  CatalogueStats,
  ValueExchange,
  BPMNActorActivity,
  BusinessModelProfile,
  ActorEcosystem,
  ExtensionKPI,
} from '@/lib/sparql/queries';

interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const fetcher = async <T>(url: string): Promise<APIResponse<T>> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

/**
 * Fetch all business models from GraphDB.
 */
export function useGraphDBBusinessModels() {
  const { data, error, isLoading } = useSWR<APIResponse<GraphDBBusinessModel[]>>(
    '/api/graphdb/business-models',
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    models: data?.data || [],
    isLoading,
    isError: error,
  };
}

/**
 * Fetch performance indicators for a specific business model from GraphDB.
 */
export function useGraphDBKPIs(businessModelUri: string | null) {
  const url = businessModelUri
    ? `/api/graphdb/kpis?businessModel=${encodeURIComponent(businessModelUri)}`
    : null;

  const { data, error, isLoading } = useSWR<
    APIResponse<GraphDBPerformanceIndicator[]>
  >(url, fetcher, { revalidateOnFocus: false });

  return {
    indicators: data?.data || [],
    isLoading,
    isError: error,
  };
}

/**
 * Fetch aggregate catalogue statistics (strategy + sector distributions).
 */
export function useGraphDBCatalogueStats() {
  const { data, error, isLoading } = useSWR<APIResponse<CatalogueStats>>(
    '/api/graphdb/catalogue-stats',
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    stats: data?.data || null,
    isLoading,
    isError: error,
  };
}

/**
 * Fetch value exchanges for a specific business model.
 */
export function useGraphDBValueExchanges(businessModelUri: string | null) {
  const url = businessModelUri
    ? `/api/graphdb/value-exchanges?businessModel=${encodeURIComponent(businessModelUri)}`
    : null;

  const { data, error, isLoading } = useSWR<APIResponse<ValueExchange[]>>(
    url,
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    exchanges: data?.data || [],
    isLoading,
    isError: error,
  };
}

/**
 * Fetch the full profile (CEBM type, strategies, BMC items) for a
 * specific business model. Returns null when no model is selected.
 */
export function useGraphDBProfile(businessModelUri: string | null) {
  const url = businessModelUri
    ? `/api/graphdb/business-model-profile?businessModel=${encodeURIComponent(businessModelUri)}`
    : null;

  const { data, error, isLoading } = useSWR<APIResponse<BusinessModelProfile>>(
    url,
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    profile: data?.data || null,
    isLoading,
    isError: error,
  };
}

/**
 * Fetch actors and their roles for a specific business model.
 */
export function useGraphDBActorEcosystem(businessModelUri: string | null) {
  const url = businessModelUri
    ? `/api/graphdb/actor-ecosystem?businessModel=${encodeURIComponent(businessModelUri)}`
    : null;

  const { data, error, isLoading } = useSWR<APIResponse<ActorEcosystem>>(
    url,
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    ecosystem: data?.data || null,
    isLoading,
    isError: error,
  };
}

/**
 * Fetch pilot-reported extension KPIs from the generic KPI graph.
 */
export function useGraphDBExtensionKPIs(businessModelUri: string | null) {
  const url = businessModelUri
    ? `/api/graphdb/extension-kpis?businessModel=${encodeURIComponent(businessModelUri)}`
    : null;

  const { data, error, isLoading } = useSWR<APIResponse<ExtensionKPI[]>>(
    url,
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    kpis: data?.data || [],
    isLoading,
    isError: error,
  };
}

/**
 * Fetch BPMN activity counts per actor (global).
 */
export function useGraphDBBPMNActivities() {
  const { data, error, isLoading } = useSWR<APIResponse<BPMNActorActivity[]>>(
    '/api/graphdb/bpmn-activities',
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    activities: data?.data || [],
    isLoading,
    isError: error,
  };
}
