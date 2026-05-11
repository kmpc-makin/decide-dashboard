'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

import { KPICategory } from '@/types/kpi';
import { Navbar } from '@/components/navbar';

import BusinessModelSelector from './BusinessModelSelector';
import CatalogueOverview from './CatalogueOverview';
import DimensionFilter from './DimensionFilter';
import HeaderCards from './header/HeaderCards';
import DimensionSection from './kpi/DimensionSection';

import CircularityPenetrationCard from './kpi/section-a/CircularityPenetrationCard';
import WasteHotspotsCard from './kpi/section-a/WasteHotspotsCard';
import ValueExchangesCard from './kpi/section-a/ValueExchangesCard';
import RevenueCostCard from './kpi/section-a/RevenueCostCard';
import ExtensionKPICard from './kpi/section-b/ExtensionKPICard';

import type { GraphDBBusinessModel } from '@/lib/sparql/queries';
import { useGraphDBExtensionKPIs } from '@/lib/hooks/useGraphDB';
import {
  WHEY_PROTEIN_ENTRY,
  WHEY_EXTENSION_KPIS,
  isWheyProteinModel,
} from '@/lib/mock/whey-kpis';

export default function KPIDashboard() {
  const [selected, setSelected] = useState<GraphDBBusinessModel | null>(
    WHEY_PROTEIN_ENTRY as GraphDBBusinessModel,
  );
  const [dimensions, setDimensions] = useState<KPICategory[]>([
    'ecological',
    'economic',
    'social',
  ]);

  const isWhey = isWheyProteinModel(selected?.uri ?? null);

  const { kpis: extensionKpis, isError: extensionError } =
    useGraphDBExtensionKPIs(isWhey ? null : (selected?.uri ?? null));

  const effectiveExtensionKpis = isWhey ? WHEY_EXTENSION_KPIS : extensionKpis;
  const extensionPending = !isWhey && extensionKpis.length === 0;

  const toggle = (dim: KPICategory) =>
    setDimensions((prev) =>
      prev.includes(dim) ? prev.filter((d) => d !== dim) : [...prev, dim],
    );

  if (extensionError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to Load Dashboard
          </h2>
          <p className="text-gray-600">
            Failed to reach the DECIDE data platform. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const showEcological = dimensions.includes('ecological');
  const showEconomic = dimensions.includes('economic');
  const showSocial = dimensions.includes('social');

  const ecoExt = effectiveExtensionKpis.filter((k) => k.dimension === 'ecological');
  const econExt = effectiveExtensionKpis.filter((k) => k.dimension === 'economic');
  const socExt = effectiveExtensionKpis.filter((k) => k.dimension === 'social');

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-blue-950 dark:via-indigo-950 dark:to-slate-950">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-65 dark:opacity-0"
          style={{ backgroundImage: 'url(/waves-bright.jpg)' }}
        />
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-0 dark:opacity-15"
          style={{ backgroundImage: 'url(/waves-dark.jpg)' }}
        />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BusinessModelSelector
              selected={selected}
              onSelect={setSelected}
            />

            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div
                  key="catalogue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CatalogueOverview />
                </motion.div>
              ) : (
                <motion.div
                  key={`cebm-${selected.uri}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <HeaderCards businessModelUri={selected.uri} />

                  <DimensionFilter
                    selected={dimensions}
                    onToggle={toggle}
                  />

                  {showEcological && (
                    <DimensionSection dimension="ecological">
                      <CircularityPenetrationCard
                        businessModelUri={selected.uri}
                      />
                      <WasteHotspotsCard businessModelUri={selected.uri} />
                      {ecoExt.map((k, i) => (
                        <ExtensionKPICard
                          key={k.uri}
                          kpi={k}
                          index={i}
                          pending={extensionPending}
                        />
                      ))}
                    </DimensionSection>
                  )}

                  {showEconomic && (
                    <DimensionSection dimension="economic">
                      <ValueExchangesCard businessModelUri={selected.uri} />
                      <RevenueCostCard businessModelUri={selected.uri} />
                      {econExt.map((k, i) => (
                        <ExtensionKPICard
                          key={k.uri}
                          kpi={k}
                          index={i}
                          pending={extensionPending}
                        />
                      ))}
                    </DimensionSection>
                  )}

                  {showSocial && (
                    <DimensionSection dimension="social">
                      {socExt.map((k, i) => (
                        <ExtensionKPICard
                          key={k.uri}
                          kpi={k}
                          index={i}
                          pending={extensionPending}
                        />
                      ))}
                    </DimensionSection>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center text-sm text-gray-500"
            >
              <p>
                This dashboard is a result designed and developed in the
                DECIDE project.
              </p>
              <p className="mt-1">
                Last updated:{' '}
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
