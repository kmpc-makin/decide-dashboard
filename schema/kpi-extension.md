# KPI Schema Extension for the CEBM Ontology

## What this is

The file [`kpi-extension.ttl`](./kpi-extension.ttl) defines additional OWL properties
for `cebm:PerformanceIndicator` that the DECIDE dashboard needs to display rich,
fully described KPIs - things like a human-readable title, a measurement unit,
a target value, and a trend direction.

These properties do not exist in the current CEBM ontology. The extension is
designed to be **additive and backward-compatible**: it introduces new optional
properties without modifying any existing classes, properties, or data.

## Why it is needed

The base ontology describes a performance indicator with three properties:

| Property | Example value |
|---|---|
| `cebm:hasDimension` | `cebm:Environmental` |
| `cebm:performanceValue` | `4` |
| `cebm:appliesStrategy` | `cebm:Repurpose` |

That is enough for a rating-style assessment, but not for concrete measurement
KPIs like "Recycling Rate: 78.5%, target 85%". The dashboard supports both
styles, so the ontology needs to accommodate both.

## Properties introduced

| Property | Type | Required? | Purpose |
|---|---|---|---|
| `cebm:hasTitle` | `xsd:string` | Recommended | Display name shown in the dashboard card header |
| `cebm:hasUnit` | `xsd:string` | Optional | Unit of the value - `%`, `FTE`, `tons`, `EUR/ton`, etc. |
| `cebm:hasTargetValue` | `xsd:decimal` | Optional | Target the KPI is measured against |
| `cebm:hasTrend` | `xsd:string` | Optional | `up`, `down`, or `stable` |
| `cebm:hasDataSource` | `xsd:string` | Optional | Where the data comes from |
| `cebm:hasKPISource` | `xsd:string` | Optional | Reference standard (ESRS E1, GRI 306, etc.) |
| `cebm:hasLastUpdated` | `xsd:dateTime` | Optional | Timestamp of the last value update |
| `cebm:hasScaleMin` | `xsd:integer` | Optional | Lower bound of a rating scale |
| `cebm:hasScaleMax` | `xsd:integer` | Optional | Upper bound of a rating scale |

None of these are mandatory. An indicator with only the original three properties
will continue to work. The dashboard renders whatever fields are available.

## Mapping to the dashboard TypeScript model

For reference, here is how the Turtle properties correspond to the existing
TypeScript interface in `types/kpi.ts`:

```
TypeScript (KPI)            →  Turtle (PerformanceIndicator)
─────────────────────────────────────────────────────────────
identifier                  →  IRI local name
title                       →  cebm:hasTitle
category                    →  cebm:hasDimension
value                       →  cebm:performanceValue
unit                        →  cebm:hasUnit
target                      →  cebm:hasTargetValue
trend                       →  cebm:hasTrend
dataSource                  →  cebm:hasDataSource
kpiSource                   →  cebm:hasKPISource
lastUpdated                 →  cebm:hasLastUpdated
(not mapped)                →  cebm:appliesStrategy
(not mapped)                →  cebm:hasScaleMin / hasScaleMax
chartType                   →  (dashboard-only, not in ontology)
historicalData              →  (dashboard-only, not in ontology)
metadata                    →  (dashboard-only, not in ontology)
```

`chartType`, `historicalData`, and `metadata` are presentation concerns. They
stay in the dashboard layer and do not belong in the ontology.

## How to use the extension

### Loading it into GraphDB

Open the GraphDB Workbench and use the **Import > RDF** feature to upload
`kpi-extension.ttl` into the `cebm_ontology` repository. Choose a dedicated
named graph to keep it separate from the base ontology and from ADOxx exports:

```
Named graph: http://example.org/cebm/dashboard-extension
```

Alternatively, load it via the REST API:

```bash
curl -X POST \
  '${GRAPHDB_ENDPOINT}/statements' \
  -H 'Content-Type: text/turtle' \
  -d @schema/kpi-extension.ttl
```

### Verifying the import

Run this SPARQL query to confirm the new properties are available:

```sparql
PREFIX cebm: <http://example.org/cebm#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?property ?label ?comment
WHERE {
  ?property rdfs:domain cebm:PerformanceIndicator .
  ?property rdfs:label ?label .
  ?property rdfs:comment ?comment .
}
ORDER BY ?label
```

### Writing a KPI with the new properties

```sparql
PREFIX cebm: <http://example.org/cebm#>
PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>

INSERT DATA {
  <http://example.org/cebm/dashboard/#recycling_rate> a cebm:PerformanceIndicator ;
    cebm:hasTitle        "Recycling Rate" ;
    cebm:hasDimension    cebm:Environmental ;
    cebm:performanceValue 78 ;
    cebm:hasUnit         "%" ;
    cebm:hasTargetValue  85.0 ;
    cebm:hasTrend        "up" ;
    cebm:appliesStrategy cebm:Recycle ;
    cebm:hasDataSource   "Waste Management Report 2025" ;
    cebm:hasKPISource    "ESRS E5" ;
    cebm:hasLastUpdated  "2025-11-30T00:00:00"^^xsd:dateTime .
}
```

### Linking a KPI to a business model

```sparql
PREFIX cebm: <http://example.org/cebm#>

INSERT DATA {
  <http://example.org/cebm/adoxx-rdf/model/#some_business_model>
    cebm:hasPerformanceIndicator
    <http://example.org/cebm/dashboard/#recycling_rate> .
}
```

## Open questions

See [`tbd.md`](../tbd.md) for the full list. The main points relevant to this
schema extension are:

- Final agreement on property names and whether any already exist under
  different URIs in the base ontology
- Whether `hasTrend` should use an enum class (`cebm:TrendUp`, `cebm:TrendDown`,
  `cebm:TrendStable`) instead of a plain string
- Whether scale properties belong on the indicator itself or on the dimension
- Named graph strategy for dashboard-created data vs. ADOxx-exported data
