# DECIDE Monitoring Dashboard

Web-based monitoring dashboard for the DECIDE Circular Economy Toolbox.
Connects to the DECIDE data platform via SPARQL and displays Key Performance
Indicators of Circular Economy Business Models (CEBMs) grouped by the three
Triple Bottom Line dimensions: Ecological, Economic and Social.

## Documentation

| Document | Description |
|----------|-------------|
| [KPI Catalogue](docs/kpi-catalogue.md) | All 13 KPIs with dimension, unit, source and API route mapping |
| [SPARQL Reference](docs/sparql-reference.md) | Every query the dashboard runs against the data platform |
| [Extension Schema](schema/kpi-extension.ttl) | Turtle schema for pilot-reported KPIs (Section B) |
| [Extension Schema Docs](schema/kpi-extension.md) | Human-readable description of the extension mechanism |

## Architecture

```
DECIDE Toolbox (BMC, e3Value, BPMN, System Dynamics)
        |
        v
DECIDE Data Platform (GraphDB, hosted by PP ANTEJA)
  ├── default graph         toolbox-derived triples
  └── <kpi-extension>       pilot-reported KPIs
        |
        v  SPARQL
Next.js API Routes (/api/graphdb/*)
        |
        v  SWR
React Components (KPI cards, charts, filters)
```

The dashboard is a read-only consumer. It never writes to or caches data from
the platform.

## KPI structure

**Section A (8 KPIs)** - derived automatically from BMC, e3Value and BPMN models.
No pilot input needed; values appear as soon as a case is modelled in the toolbox.

**Section B (5 KPIs)** - reported by pilot owners and stored in the extension
named graph. Together these five indicators constitute the Triple Bottom Line
Scorecard (KPI 8), distributed across the three dashboard dimensions.

See [docs/kpi-catalogue.md](docs/kpi-catalogue.md) for the full list.

## Quick start

```bash
# Install dependencies
npm install

# Configure the data platform endpoint (optional, defaults to OMILab prototype)
cp .env.example .env.local
# edit GRAPHDB_ENDPOINT if needed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  api/graphdb/          SPARQL-backed API routes
  demo/generic-kpi/     Demo view for the extension mechanism
components/
  dashboard/
    header/             Business Model Profile, Actor Ecosystem, Consistency
    kpi/
      section-a/        Toolbox-derived KPI cards
      section-b/        Generic extension KPI renderer
    demo/               Reporting-standard demo view
lib/
  sparql/               SPARQL client and query definitions
  hooks/                SWR data hooks
  mock/                 Whey demo fallback (used only by mock CEBM entry)
  demo/                 Seed data for /demo/generic-kpi
schema/                 KPI extension Turtle schema and documentation
docs/                   KPI catalogue and SPARQL reference
```

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GRAPHDB_ENDPOINT` | `https://your-graphdb-instance/repositories/cebm_ontology` | SPARQL endpoint of the DECIDE data platform |

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [SWR](https://swr.vercel.app/)
- [Lucide Icons](https://lucide.dev/)

## Deliverable

This repository is part of DECIDE Deliverable D.1.2.5 (Monitoring Dashboard),
Activity 1.2, led by LP ZD.BB GmbH within the Interreg Danube Region Programme
(DRP0200299).
