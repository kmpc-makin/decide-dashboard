# KPI Catalogue

The DECIDE Monitoring Dashboard displays 12 KPIs organised in two sections.
Section A indicators are derived automatically from the DECIDE toolbox models
(BMC, e3Value, BPMN). Section B indicators are reported by pilot owners and
stored in a dedicated `<kpi-extension>` named graph.

KPI X (Triple Bottom Line Scorecard) is realised through the five Section B
indicators distributed across the three dimension sections, so there is no
separate TBL panel in the UI.

## Section A - Toolbox-derived (7)

| #  | KPI                              | Dimension        | Source model           | API route                          |
|----|----------------------------------|------------------|------------------------|------------------------------------|
| 1  | Business Model Profile Card      | Cross            | BMC                    | `/api/graphdb/business-model-profile` |
| 2  | Actor Ecosystem Map              | Cross            | BMC + e3Value          | `/api/graphdb/actor-ecosystem`     |
| 3  | Value Exchange Summary           | Economic         | e3Value                | `/api/graphdb/value-exchanges`     |
| 4  | Revenue vs Cost Snapshot         | Economic         | e3Value                | `/api/graphdb/value-exchanges`     |
| 5  | Circularity Penetration Score    | Ecological       | BPMN                   | pending (needs activity tagging)   |
| 6  | Waste Hotspots & Opportunities   | Ecological       | BPMN                   | pending (needs activity tagging)   |
| 7  | Actor Consistency Check          | Cross (meta)     | Federated BMC+BPMN+e3V | pending (needs federated query)    |
| X  | Triple Bottom Line Scorecard     | All three        | System Dynamics / agg. | implemented via Section B KPIs     |

## Section B - Pilot-reported (5)

| #  | KPI                       | Dimension  | Unit           | Viz hint     | API route                         |
|----|---------------------------|------------|----------------|--------------|-----------------------------------|
| 9  | CO₂ Emission Reduction    | Ecological | tons/year      | `number`     | `/api/graphdb/extension-kpis`     |
| 10 | Recycling Rate            | Ecological | %              | `percentage` | `/api/graphdb/extension-kpis`     |
| 11 | Material Reuse Rate       | Ecological | %              | `percentage` | `/api/graphdb/extension-kpis`     |
| 12 | Circular Revenue Share    | Economic   | % of revenue   | `percentage` | `/api/graphdb/extension-kpis`     |
| 13 | Jobs Created              | Social     | FTE            | `number`     | `/api/graphdb/extension-kpis`     |

## Extension schema

Section B KPIs are defined in [`schema/kpi-extension.ttl`](../schema/kpi-extension.ttl).
Each instance requires four properties (`hasTitle`, `hasDimension`, `performanceValue`,
`hasUnit`) and one optional property (`hasVisualizationHint`). Adding a new KPI
is a data-only change: write a new instance to the `<kpi-extension>` named graph
and the dashboard picks it up automatically.

## Dimension mapping

The 13 KPIs distribute across the Triple Bottom Line as follows:

- **Ecological** (5): Circularity Penetration, Waste Hotspots, CO₂ Emission Reduction, Recycling Rate, Material Reuse Rate
- **Economic** (4): Value Exchange Summary, Revenue vs Cost, Circular Revenue Share, (plus R-Strategy view in catalogue)
- **Social** (1): Jobs Created
- **Cross-dimensional** (3): Business Model Profile, Actor Ecosystem, Actor Consistency Check
