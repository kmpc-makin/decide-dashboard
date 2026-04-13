'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Leaf, DollarSign, Users } from 'lucide-react';
import type { ExtensionKPI } from '@/lib/sparql/queries';
import SectionBadge from '../SectionBadge';

interface ExtensionKPICardProps {
  kpi: ExtensionKPI;
  index?: number;
  pending?: boolean;
}

const DIMENSION_META = {
  ecological: { icon: Leaf, colour: '#10B981', label: 'Ecological' },
  economic: { icon: DollarSign, colour: '#3B82F6', label: 'Economic' },
  social: { icon: Users, colour: '#8B5CF6', label: 'Social' },
} as const;

function formatNumber(value: number, unit: string): string {
  if (unit === '%') return `${value.toFixed(1)}%`;
  if (value >= 1_000_000) return value.toLocaleString('en-US');
  if (value >= 1_000) return value.toLocaleString('en-US');
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
}

/** Generic renderer for Section B KPIs. Driven by data only - no code changes needed for new KPIs. */
export default function ExtensionKPICard({
  kpi,
  index = 0,
  pending = false,
}: ExtensionKPICardProps) {
  const meta = DIMENSION_META[kpi.dimension];
  const Icon = meta.icon;
  const isPercentage = kpi.visualizationHint === 'percentage';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card
        isBlurred
        className="h-full hover:shadow-lg transition-all duration-200 bg-white/60 dark:bg-default-100/50 border-none overflow-hidden"
        shadow="sm"
      >
        <div
          className="px-4 py-1.5 flex items-center justify-between opacity-80"
          style={{ backgroundColor: meta.colour }}
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" />
            {meta.label}
          </span>
          <SectionBadge type={pending ? 'pending' : 'B'} />
        </div>
        <CardBody className="gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            {kpi.title}
          </h3>

          {isPercentage ? (
            <>
              <div className="flex items-baseline gap-1">
                <span
                  className="text-4xl font-bold"
                  style={{ color: meta.colour }}
                >
                  {formatNumber(kpi.value, '%')}
                </span>
              </div>
              <div className="mt-1 w-full bg-default-200 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: meta.colour }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(kpi.value, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                />
              </div>
            </>
          ) : (
            <div className="flex items-baseline gap-2">
              <span
                className="text-4xl font-bold"
                style={{ color: meta.colour }}
              >
                {formatNumber(kpi.value, kpi.unit)}
              </span>
              <span className="text-sm text-default-500">{kpi.unit}</span>
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
