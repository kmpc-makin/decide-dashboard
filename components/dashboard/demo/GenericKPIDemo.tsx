'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import { AlertTriangle, ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';
import { KPICategory } from '@/types/kpi';
import { useDemoKPIs } from '@/lib/hooks/useKPIs';
import { Navbar } from '@/components/navbar';
import KPICard from '@/components/dashboard/KPICard';
import DimensionFilter from '@/components/dashboard/DimensionFilter';

/** Demo page showing the generic KPI extension with sample data. */
export default function GenericKPIDemo() {
  const { kpis, isLoading, isError } = useDemoKPIs();
  const [dimensions, setDimensions] = useState<KPICategory[]>([
    'ecological',
    'economic',
    'social',
  ]);

  const toggle = (dim: KPICategory) =>
    setDimensions((prev) =>
      prev.includes(dim) ? prev.filter((d) => d !== dim) : [...prev, dim],
    );

  const filtered = kpis.filter((k) => dimensions.includes(k.category));

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
            <div className="mb-6">
              <Button
                as={Link}
                href="/"
                variant="flat"
                size="sm"
                startContent={<ArrowLeft className="w-4 h-4" />}
              >
                Back to dashboard
              </Button>
            </div>

            <Card
              isBlurred
              className="bg-amber-50/70 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 mb-6"
              shadow="sm"
            >
              <CardBody className="flex flex-row items-start gap-3 p-4">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900 dark:text-amber-200">
                  <strong>Demo mode.</strong> The KPIs below are sample
                  values illustrating how additional, pilot-reported metrics
                  can be rendered through the generic KPI extension. These
                  values are not sourced from the DECIDE data platform.
                </div>
              </CardBody>
            </Card>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Generic KPI Extension · Demo
              </h1>
              <p className="text-default-600 max-w-2xl mx-auto">
                Demonstrates the extensibility mechanism for reporting-standard
                metrics (ESRS, GRI, etc.) that are not directly derivable from
                BMC, e3Value or BPMN models.
              </p>
            </div>

            <DimensionFilter selected={dimensions} onToggle={toggle} />

            <AnimatePresence mode="wait">
              {isError ? (
                <div className="flex items-center justify-center py-12">
                  <AlertTriangle className="w-6 h-6 text-amber-500 mr-2" />
                  <span className="text-default-600">
                    Failed to load demo data.
                  </span>
                </div>
              ) : (
                <motion.div
                  key={dimensions.join('-')}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <Chip size="sm" variant="flat">
                      Showing {filtered.length} sample KPIs
                    </Chip>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((kpi, i) => (
                      <motion.div
                        key={kpi._id || kpi.identifier}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <KPICard kpi={kpi} isLoading={isLoading} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
