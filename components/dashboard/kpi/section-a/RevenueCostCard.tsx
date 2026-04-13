'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Spinner } from '@heroui/spinner';
import { TrendingUp } from 'lucide-react';
import { useGraphDBValueExchanges } from '@/lib/hooks/useGraphDB';
import SectionBadge from '../SectionBadge';

interface RevenueCostCardProps {
  businessModelUri: string;
}

function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000_000)
    return `€${(value / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(value) >= 1_000_000)
    return `€${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `€${(value / 1_000).toFixed(0)}K`;
  return `€${value.toFixed(0)}`;
}

/** KPI 4 - Revenue vs Cost Snapshot. Aggregated from value exchange data. */
export default function RevenueCostCard({
  businessModelUri,
}: RevenueCostCardProps) {
  const { exchanges, isLoading } = useGraphDBValueExchanges(businessModelUri);

  const total = exchanges.reduce((s, e) => s + e.amount, 0);
  const exchangeCount = exchanges.length;
  const average = exchangeCount > 0 ? total / exchangeCount : 0;
  const hasData = exchangeCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card
        isBlurred
        className="h-full hover:shadow-lg transition-all duration-200 bg-white/60 dark:bg-default-100/50 border-none overflow-hidden"
        shadow="sm"
      >
        <div className="px-4 py-1.5 flex items-center justify-between opacity-80 bg-blue-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Economic
          </span>
          <SectionBadge type={hasData ? 'A' : 'pending'} />
        </div>
        <CardBody className="gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            Revenue vs Cost Snapshot
          </h3>

          {isLoading ? (
            <div className="flex items-center gap-2 py-4">
              <Spinner size="sm" />
              <span className="text-xs text-default-500">Loading…</span>
            </div>
          ) : hasData ? (
            <>
              <div className="space-y-2 mt-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-default-500">
                    Total flows
                  </span>
                  <span className="text-2xl font-bold text-blue-500">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-default-500">
                    Average per exchange
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(average)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-default-500">
                    Number of exchanges
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {exchangeCount}
                  </span>
                </div>
              </div>
              <p className="text-xs text-default-400 mt-2">
                Per-actor net value will be added once directional flow data
                is available.
              </p>
            </>
          ) : (
            <p className="text-xs text-default-400 py-2">
              No financial data available for this case yet.
            </p>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
