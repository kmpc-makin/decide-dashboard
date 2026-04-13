const GRAPHDB_ENDPOINT = process.env.GRAPHDB_ENDPOINT || '';

if (!GRAPHDB_ENDPOINT && typeof window === 'undefined') {
  console.warn('GRAPHDB_ENDPOINT is not set. SPARQL queries will fail.');
}

const SPARQL_PREFIXES = `
PREFIX cebm:     <http://example.org/cebm#>
PREFIX cebmauth: <http://example.org/cebm/auth/#>
PREFIX mm:       <http://example.org/cebm/adoxx-rdf/#>
PREFIX owl:      <http://www.w3.org/2002/07/owl#>
PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#>
`;

export interface SparqlBinding {
  [key: string]: { type: string; value: string; datatype?: string };
}

export interface SparqlResults {
  head: { vars: string[] };
  results: { bindings: SparqlBinding[] };
}

export async function executeSparqlQuery(
  query: string,
): Promise<SparqlResults> {
  const fullQuery = SPARQL_PREFIXES + query;

  const response = await fetch(GRAPHDB_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
    },
    body: new URLSearchParams({ query: fullQuery }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SPARQL query failed (${response.status}): ${text}`);
  }

  return response.json();
}

/**
 * Extract the local name from an IRI (everything after the last # or /).
 */
export function iriLabel(iri: string): string {
  const hash = iri.lastIndexOf('#');
  const slash = iri.lastIndexOf('/');
  const pos = Math.max(hash, slash);
  const label = pos >= 0 ? iri.substring(pos + 1) : iri;
  return label.replace(/_/g, ' ');
}

/**
 * Parse a SPARQL binding value into a JS primitive.
 */
export function parseValue(
  binding: { type: string; value: string; datatype?: string } | undefined,
): string | number | null {
  if (!binding) return null;
  if (
    binding.datatype === 'http://www.w3.org/2001/XMLSchema#integer' ||
    binding.datatype === 'http://www.w3.org/2001/XMLSchema#int'
  ) {
    return parseInt(binding.value, 10);
  }
  if (
    binding.datatype === 'http://www.w3.org/2001/XMLSchema#decimal' ||
    binding.datatype === 'http://www.w3.org/2001/XMLSchema#float' ||
    binding.datatype === 'http://www.w3.org/2001/XMLSchema#double'
  ) {
    return parseFloat(binding.value);
  }
  if (binding.type === 'uri') {
    return iriLabel(binding.value);
  }
  return binding.value;
}
