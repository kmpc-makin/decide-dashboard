import { executeSparqlQuery, parseValue, iriLabel } from './client';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GraphDBBusinessModel {
  uri: string;
  label: string;
  cebmType: string | null;
  sector: string | null;
  region: string | null;
  maturityLevel: string | null;
  strategy: string | null;
}

export interface GraphDBPerformanceIndicator {
  uri: string;
  businessModelUri: string;
  businessModelLabel: string;
  dimension: string;
  value: number;
  strategy: string;
}

export interface StrategyCount {
  strategy: string;
  count: number;
}

export interface SectorCount {
  sector: string;
  count: number;
}

export interface RegionCount {
  region: string;
  count: number;
}

export interface CatalogueStats {
  totalModels: number;
  strategies: StrategyCount[];
  sectors: SectorCount[];
  regions: RegionCount[];
}

/** Canonical DECIDE sector names for normalisation. */
export const CANONICAL_SECTORS = [
  'Food',
  'Textile',
  'Battery',
  'Smart City',
  'Packaging',
] as const;

export function normaliseSector(raw: string): string {
  const trimmed = raw.trim();
  const match = CANONICAL_SECTORS.find(
    (s) => s.toLowerCase() === trimmed.toLowerCase(),
  );
  return match ?? trimmed;
}

export interface ValueExchange {
  uri: string;
  label: string;
  amount: number;
}

export interface BPMNActorActivity {
  actor: string;
  activityCount: number;
}

export interface BusinessModelProfile {
  uri: string;
  label: string;
  cebmType: string | null;
  sector: string | null;
  region: string | null;
  maturityLevel: string | null;
  strategies: string[];
  valuePropositions: string[];
  customerSegments: string[];
  keyPartners: string[];
}

export interface Actor {
  uri: string;
  name: string;
  role: 'partner' | 'customer' | 'workforce' | 'supplier' | 'other';
}

export interface ActorEcosystem {
  actors: Actor[];
  totalCount: number;
}

export type TBLDimension = 'ecological' | 'economic' | 'social';
export type VisualizationHint = 'number' | 'percentage';

export interface ExtensionKPI {
  uri: string;
  title: string;
  dimension: TBLDimension;
  value: number;
  unit: string;
  visualizationHint: VisualizationHint;
}

const EXTENSION_GRAPH_URI = 'http://example.org/cebm/kpi-extension';

function dimensionFromIri(iri: string): TBLDimension {
  const label = iriLabel(iri).toLowerCase();
  if (label.startsWith('eco') && label !== 'economic') return 'ecological';
  if (label === 'economic') return 'economic';
  if (label === 'social') return 'social';
  return 'economic';
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Fetch all business models with their core attributes.
 */
export async function fetchBusinessModels(): Promise<GraphDBBusinessModel[]> {
  const result = await executeSparqlQuery(`
    SELECT DISTINCT ?bm ?label ?cebmType ?sector ?region ?maturity ?strategy
    WHERE {
      ?bm a cebm:BusinessModel .
      OPTIONAL { ?bm rdfs:label ?label . }
      OPTIONAL { ?bm cebm:hasCEBMType ?cebmType . }
      OPTIONAL { ?bm cebm:hasSector ?sector . }
      OPTIONAL { ?bm cebm:hasGeographicContext ?region . }
      OPTIONAL { ?bm cebm:hasMaturityLevel ?maturity . }
      OPTIONAL { ?bm cebm:appliesStrategy ?strategy . }
    }
    ORDER BY ?label
  `);

  const modelMap = new Map<string, GraphDBBusinessModel>();

  for (const b of result.results.bindings) {
    const uri = b.bm.value;
    if (!modelMap.has(uri)) {
      modelMap.set(uri, {
        uri,
        label:
          b.label?.value || iriLabel(uri),
        cebmType: parseValue(b.cebmType) as string | null,
        sector: parseValue(b.sector) as string | null,
        region: parseValue(b.region) as string | null,
        maturityLevel: parseValue(b.maturity) as string | null,
        strategy: parseValue(b.strategy) as string | null,
      });
    }
  }

  return Array.from(modelMap.values());
}

/**
 * Fetch performance indicators for a specific business model.
 */
export async function fetchPerformanceIndicators(
  businessModelUri: string,
): Promise<GraphDBPerformanceIndicator[]> {
  const result = await executeSparqlQuery(`
    SELECT ?bm ?bmLabel ?pi ?dimension ?value ?strategy
    WHERE {
      VALUES ?bm { <${businessModelUri}> }
      ?bm cebm:hasPerformanceIndicator ?pi .
      ?pi cebm:hasDimension ?dimension .
      ?pi cebm:performanceValue ?value .
      OPTIONAL { ?pi cebm:appliesStrategy ?strategy . }
      OPTIONAL { ?bm rdfs:label ?bmLabel . }
    }
    ORDER BY ?dimension ?strategy
  `);

  return result.results.bindings.map((b) => ({
    uri: b.pi.value,
    businessModelUri: b.bm.value,
    businessModelLabel: b.bmLabel?.value || iriLabel(b.bm.value),
    dimension: iriLabel(b.dimension.value),
    value: parseInt(b.value.value, 10),
    strategy: b.strategy ? iriLabel(b.strategy.value) : 'Unknown',
  }));
}

/**
 * Fetch all performance indicators across all business models.
 */
export async function fetchAllPerformanceIndicators(): Promise<
  GraphDBPerformanceIndicator[]
> {
  const result = await executeSparqlQuery(`
    SELECT ?bm ?bmLabel ?pi ?dimension ?value ?strategy
    WHERE {
      ?bm a cebm:BusinessModel .
      ?bm cebm:hasPerformanceIndicator ?pi .
      ?pi cebm:hasDimension ?dimension .
      ?pi cebm:performanceValue ?value .
      OPTIONAL { ?pi cebm:appliesStrategy ?strategy . }
      OPTIONAL { ?bm rdfs:label ?bmLabel . }
    }
    ORDER BY ?bm ?dimension ?strategy
  `);

  return result.results.bindings.map((b) => ({
    uri: b.pi.value,
    businessModelUri: b.bm.value,
    businessModelLabel: b.bmLabel?.value || iriLabel(b.bm.value),
    dimension: iriLabel(b.dimension.value),
    value: parseInt(b.value.value, 10),
    strategy: b.strategy ? iriLabel(b.strategy.value) : 'Unknown',
  }));
}

// ─── Catalogue / Aggregate Queries ──────────────────────────────────────────

/**
 * Fetch aggregate statistics across all business models:
 * total model count, circular strategy / sector / region distributions.
 */
export async function fetchCatalogueStats(): Promise<CatalogueStats> {
  const [strategyResult, sectorResult, regionResult, totalResult] =
    await Promise.all([
      executeSparqlQuery(`
        SELECT ?strategy (COUNT(?s) AS ?count)
        WHERE {
          ?s cebm:appliesStrategy ?strategy .
        }
        GROUP BY ?strategy
        ORDER BY DESC(?count)
      `),
      executeSparqlQuery(`
        SELECT ?sector (COUNT(DISTINCT ?bm) AS ?count)
        WHERE {
          ?bm a cebm:BusinessModel .
          ?bm cebm:hasSector ?sector .
        }
        GROUP BY ?sector
        ORDER BY DESC(?count)
      `),
      executeSparqlQuery(`
        SELECT ?region (COUNT(DISTINCT ?bm) AS ?count)
        WHERE {
          ?bm a cebm:BusinessModel .
          ?bm cebm:hasGeographicContext ?region .
        }
        GROUP BY ?region
        ORDER BY DESC(?count)
      `),
      executeSparqlQuery(`
        SELECT (COUNT(DISTINCT ?bm) AS ?total)
        WHERE { ?bm a cebm:BusinessModel . }
      `),
    ]);

  const strategies: StrategyCount[] = strategyResult.results.bindings.map(
    (b) => ({
      strategy: iriLabel(b.strategy.value),
      count: parseInt(b.count.value, 10),
    }),
  );

  // Aggregate sector counts after canonical normalisation so that
  // minor spelling variations collapse into a single bar.
  const sectorMap = new Map<string, number>();
  for (const b of sectorResult.results.bindings) {
    const raw = iriLabel(b.sector.value);
    const normalised = normaliseSector(raw);
    sectorMap.set(
      normalised,
      (sectorMap.get(normalised) ?? 0) + parseInt(b.count.value, 10),
    );
  }
  const sectors: SectorCount[] = Array.from(sectorMap.entries())
    .map(([sector, count]) => ({ sector, count }))
    .sort((a, b) => b.count - a.count);

  const regions: RegionCount[] = regionResult.results.bindings.map((b) => ({
    region: iriLabel(b.region.value),
    count: parseInt(b.count.value, 10),
  }));

  const totalModels = parseInt(
    totalResult.results.bindings[0]?.total?.value || '0',
    10,
  );

  return { totalModels, strategies, sectors, regions };
}

// ─── Value Exchange Queries ─────────────────────────────────────────────────

/**
 * Fetch value exchanges with monetary amounts for a specific business model.
 * Path: BusinessModel → hasRevenueStream → ValueInterface → hasValueExchange → VE
 */
export async function fetchValueExchanges(
  businessModelUri: string,
): Promise<ValueExchange[]> {
  const result = await executeSparqlQuery(`
    SELECT ?ve ?veName ?amount
    WHERE {
      <${businessModelUri}> cebm:hasRevenueStream ?vi .
      ?vi cebm:hasValueExchange ?ve .
      ?ve cebm:hasAmount ?amount .
      OPTIONAL { ?ve cebm:hasName ?veName }
    }
    ORDER BY DESC(xsd:float(?amount))
  `);

  return result.results.bindings.map((b) => ({
    uri: b.ve.value,
    label: b.veName?.value || iriLabel(b.ve.value),
    amount: parseFloat(b.amount.value),
  }));
}

// ─── BPMN Activity Queries ──────────────────────────────────────────────────

/**
 * Fetch the full profile of a single business model, including
 * value propositions, customer segments and key partners from the BMC.
 */
export async function fetchBusinessModelProfile(
  businessModelUri: string,
): Promise<BusinessModelProfile | null> {
  const base = await executeSparqlQuery(`
    SELECT ?label ?cebmType ?sector ?region ?maturity
    WHERE {
      VALUES ?bm { <${businessModelUri}> }
      OPTIONAL { ?bm rdfs:label ?label . }
      OPTIONAL { ?bm cebm:hasCEBMType ?cebmType . }
      OPTIONAL { ?bm cebm:hasSector ?sector . }
      OPTIONAL { ?bm cebm:hasGeographicContext ?region . }
      OPTIONAL { ?bm cebm:hasMaturityLevel ?maturity . }
    }
    LIMIT 1
  `);

  if (base.results.bindings.length === 0) return null;
  const b = base.results.bindings[0];

  const [strategies, valueProps, customers, partners] = await Promise.all([
    executeSparqlQuery(`
      SELECT DISTINCT ?strategy WHERE {
        <${businessModelUri}> cebm:appliesStrategy ?strategy .
      }
    `),
    executeSparqlQuery(`
      SELECT DISTINCT ?vp ?name WHERE {
        <${businessModelUri}> cebm:hasValueProposition ?vp .
        OPTIONAL { ?vp cebm:hasName ?name . }
      }
    `),
    executeSparqlQuery(`
      SELECT DISTINCT ?cs ?name WHERE {
        <${businessModelUri}> cebm:hasCustomerSegment ?cs .
        OPTIONAL { ?cs cebm:hasName ?name . }
      }
    `),
    executeSparqlQuery(`
      SELECT DISTINCT ?kp ?name WHERE {
        <${businessModelUri}> cebm:hasKeyPartner ?kp .
        OPTIONAL { ?kp cebm:hasName ?name . }
      }
    `),
  ]);

  return {
    uri: businessModelUri,
    label: b.label?.value || iriLabel(businessModelUri),
    cebmType: parseValue(b.cebmType) as string | null,
    sector: parseValue(b.sector) as string | null,
    region: parseValue(b.region) as string | null,
    maturityLevel: parseValue(b.maturity) as string | null,
    strategies: strategies.results.bindings.map((x) => iriLabel(x.strategy.value)),
    valuePropositions: valueProps.results.bindings.map((x) =>
      x.name?.value || iriLabel(x.vp.value),
    ),
    customerSegments: customers.results.bindings.map((x) =>
      x.name?.value || iriLabel(x.cs.value),
    ),
    keyPartners: partners.results.bindings.map((x) =>
      x.name?.value || iriLabel(x.kp.value),
    ),
  };
}

/**
 * Fetch all actors participating in a business model, either directly
 * as key partners / customer segments or as e3Value actors linked via
 * revenue streams or value interfaces.
 */
export async function fetchActorEcosystem(
  businessModelUri: string,
): Promise<ActorEcosystem> {
  const result = await executeSparqlQuery(`
    SELECT DISTINCT ?actor ?actorName ?role WHERE {
      {
        <${businessModelUri}> cebm:hasKeyPartner ?actor .
        BIND("partner" AS ?role)
      } UNION {
        <${businessModelUri}> cebm:hasCustomerSegment ?actor .
        BIND("customer" AS ?role)
      } UNION {
        <${businessModelUri}> cebm:hasRevenueStream ?vi .
        ?vi cebm:hasValueExchange ?ve .
        { ?actor cebm:hasValueInterface ?vi } UNION { ?ve ?p ?actor }
        ?actor a cebm:Actor .
        BIND("other" AS ?role)
      }
      OPTIONAL { ?actor cebm:hasName ?actorName . }
    }
  `);

  const actorMap = new Map<string, Actor>();
  for (const b of result.results.bindings) {
    const uri = b.actor.value;
    const name = b.actorName?.value || iriLabel(uri);
    const role = (b.role?.value || 'other') as Actor['role'];
    if (!actorMap.has(uri)) {
      actorMap.set(uri, { uri, name, role });
    }
  }

  const actors = Array.from(actorMap.values());
  return { actors, totalCount: actors.length };
}

/**
 * Fetch all pilot-reported extension KPIs for a business model from
 * the dedicated `<kpi-extension>` named graph.
 */
export async function fetchExtensionKPIs(
  businessModelUri: string,
): Promise<ExtensionKPI[]> {
  const result = await executeSparqlQuery(`
    SELECT ?kpi ?title ?dimension ?value ?unit ?hint
    FROM <${EXTENSION_GRAPH_URI}>
    WHERE {
      ?kpi a cebm:ExtensionKPI ;
           cebm:forBusinessModel <${businessModelUri}> ;
           cebm:hasTitle ?title ;
           cebm:hasDimension ?dimension ;
           cebm:performanceValue ?value ;
           cebm:hasUnit ?unit .
      OPTIONAL { ?kpi cebm:hasVisualizationHint ?hint . }
    }
    ORDER BY ?dimension ?title
  `);

  return result.results.bindings.map((b) => ({
    uri: b.kpi.value,
    title: b.title.value,
    dimension: dimensionFromIri(b.dimension.value),
    value: parseFloat(b.value.value),
    unit: b.unit.value,
    visualizationHint:
      (b.hint?.value as VisualizationHint | undefined) ?? 'number',
  }));
}

/**
 * Fetch BPMN activity counts per actor (global - activities are not linked
 * per business model in the current ontology).
 */
export async function fetchBPMNActivities(): Promise<BPMNActorActivity[]> {
  const result = await executeSparqlQuery(`
    SELECT ?actorName (COUNT(DISTINCT ?activity) AS ?actCount)
    WHERE {
      ?activity a cebm:BPMNActivity .
      ?activity cebm:activityPerformedByActor ?actor .
      ?actor cebm:hasName ?actorName .
    }
    GROUP BY ?actorName
    ORDER BY DESC(?actCount)
  `);

  return result.results.bindings.map((b) => ({
    actor: b.actorName.value,
    activityCount: parseInt(b.actCount.value, 10),
  }));
}
