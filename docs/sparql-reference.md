# SPARQL Query Reference

The dashboard connects to the DECIDE data platform via a single SPARQL endpoint
configured through the `GRAPHDB_ENDPOINT` environment variable (defaults to the
OMILab prototype repository). All queries use the `cebm:` namespace prefix
(`http://example.org/cebm#`).

Each query is defined in [`lib/sparql/queries.ts`](../lib/sparql/queries.ts) and
exposed through a Next.js API route under `/api/graphdb/`.

## Endpoint configuration

```
GRAPHDB_ENDPOINT=https://your-graphdb-instance/repositories/cebm_ontology
```

## Queries

### Catalogue statistics

**Route:** `GET /api/graphdb/catalogue-stats`
**Function:** `fetchCatalogueStats()`
**Returns:** total CEBM count, circular strategy distribution, sector distribution, region distribution.

```sparql
# Total CEBMs
SELECT (COUNT(DISTINCT ?bm) AS ?total)
WHERE { ?bm a cebm:BusinessModel . }

# Strategy distribution (counts all entities using appliesStrategy)
SELECT ?strategy (COUNT(?s) AS ?count)
WHERE { ?s cebm:appliesStrategy ?strategy . }
GROUP BY ?strategy ORDER BY DESC(?count)

# Sector distribution
SELECT ?sector (COUNT(DISTINCT ?bm) AS ?count)
WHERE { ?bm a cebm:BusinessModel . ?bm cebm:hasSector ?sector . }
GROUP BY ?sector ORDER BY DESC(?count)

# Region distribution
SELECT ?region (COUNT(DISTINCT ?bm) AS ?count)
WHERE { ?bm a cebm:BusinessModel . ?bm cebm:hasGeographicContext ?region . }
GROUP BY ?region ORDER BY DESC(?count)
```

### Business models

**Route:** `GET /api/graphdb/business-models`
**Function:** `fetchBusinessModels()`
**Returns:** all CEBMs with core attributes (label, CEBM type, sector, region, maturity, strategy).

```sparql
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
```

### Business model profile (KPI 1)

**Route:** `GET /api/graphdb/business-model-profile?businessModel=<uri>`
**Function:** `fetchBusinessModelProfile(uri)`
**Returns:** full profile including strategies, value propositions, customer segments, key partners.

Runs five queries in parallel: base attributes, strategies (`appliesStrategy`),
value propositions (`hasValueProposition`), customer segments (`hasCustomerSegment`),
key partners (`hasKeyPartner`).

### Actor ecosystem (KPI 2)

**Route:** `GET /api/graphdb/actor-ecosystem?businessModel=<uri>`
**Function:** `fetchActorEcosystem(uri)`
**Returns:** all actors with role classification (partner, customer, supplier, workforce, other).

```sparql
SELECT DISTINCT ?actor ?actorName ?role WHERE {
  {
    <URI> cebm:hasKeyPartner ?actor .
    BIND("partner" AS ?role)
  } UNION {
    <URI> cebm:hasCustomerSegment ?actor .
    BIND("customer" AS ?role)
  } UNION {
    <URI> cebm:hasRevenueStream ?vi .
    ?vi cebm:hasValueExchange ?ve .
    { ?actor cebm:hasValueInterface ?vi } UNION { ?ve ?p ?actor }
    ?actor a cebm:Actor .
    BIND("other" AS ?role)
  }
  OPTIONAL { ?actor cebm:hasName ?actorName . }
}
```

### Value exchanges (KPI 3 + 4)

**Route:** `GET /api/graphdb/value-exchanges?businessModel=<uri>`
**Function:** `fetchValueExchanges(uri)`
**Returns:** value exchanges with monetary amounts, sorted by amount descending.

```sparql
SELECT ?ve ?veName ?amount
WHERE {
  <URI> cebm:hasRevenueStream ?vi .
  ?vi cebm:hasValueExchange ?ve .
  ?ve cebm:hasAmount ?amount .
  OPTIONAL { ?ve cebm:hasName ?veName }
}
ORDER BY DESC(xsd:float(?amount))
```

Path: `BusinessModel -> hasRevenueStream -> ValueInterface -> hasValueExchange -> VE (hasAmount)`.

### Extension KPIs (Section B, KPIs 9-13)

**Route:** `GET /api/graphdb/extension-kpis?businessModel=<uri>`
**Function:** `fetchExtensionKPIs(uri)`
**Returns:** pilot-reported KPIs from the `<kpi-extension>` named graph.

```sparql
SELECT ?kpi ?title ?dimension ?value ?unit ?hint
FROM <http://example.org/cebm/kpi-extension>
WHERE {
  ?kpi a cebm:ExtensionKPI ;
       cebm:forBusinessModel <URI> ;
       cebm:hasTitle ?title ;
       cebm:hasDimension ?dimension ;
       cebm:performanceValue ?value ;
       cebm:hasUnit ?unit .
  OPTIONAL { ?kpi cebm:hasVisualizationHint ?hint . }
}
ORDER BY ?dimension ?title
```

### Performance indicators

**Route:** `GET /api/graphdb/kpis?businessModel=<uri>`
**Function:** `fetchPerformanceIndicators(uri)`
**Returns:** performance indicators with dimension, value and strategy.

```sparql
SELECT ?bm ?bmLabel ?pi ?dimension ?value ?strategy
WHERE {
  VALUES ?bm { <URI> }
  ?bm cebm:hasPerformanceIndicator ?pi .
  ?pi cebm:hasDimension ?dimension .
  ?pi cebm:performanceValue ?value .
  OPTIONAL { ?pi cebm:appliesStrategy ?strategy . }
  OPTIONAL { ?bm rdfs:label ?bmLabel . }
}
ORDER BY ?dimension ?strategy
```

### BPMN activities

**Route:** `GET /api/graphdb/bpmn-activities`
**Function:** `fetchBPMNActivities()`
**Returns:** activity counts per actor (global, not per-CEBM).

```sparql
SELECT ?actorName (COUNT(DISTINCT ?activity) AS ?actCount)
WHERE {
  ?activity a cebm:BPMNActivity .
  ?activity cebm:activityPerformedByActor ?actor .
  ?actor cebm:hasName ?actorName .
}
GROUP BY ?actorName ORDER BY DESC(?actCount)
```

## Notes on data quality

- Value exchanges lack `cebm:hasName`. The dashboard falls back to the URI local
  name, which produces technical identifiers. The ADOxx attribute `a_Value_Object`
  contains more readable labels but is not yet used in the query.
- Performance indicators have no `rdfs:label` or `cebm:hasTitle`. The dashboard
  synthesises labels from the dimension and strategy fields.
- BMC building blocks (value propositions, customer segments, key partners) are
  sparsely populated and use placeholder codes in some models.
- BPMN activities are stored globally and are not linked to individual CEBMs.
