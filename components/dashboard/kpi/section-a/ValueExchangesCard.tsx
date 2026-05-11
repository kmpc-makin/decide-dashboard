'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { ArrowRightLeft } from 'lucide-react';
import { useGraphDBValueExchanges } from '@/lib/hooks/useGraphDB';
import DistributionBar from '../../DistributionBar';
import SectionBadge from '../SectionBadge';
import {
  WHEY_VALUE_EXCHANGES,
  isWheyProteinModel,
} from '@/lib/mock/whey-kpis';

interface ValueExchangesCardProps {
  businessModelUri: string;
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `€${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `€${(value / 1_000).toFixed(0)}K`;
  return `€${value.toFixed(0)}`;
}

/** KPI 3 - Value Exchange Summary. Monetary flows from e3Value. */
export default function ValueExchangesCard({
  businessModelUri,
}: ValueExchangesCardProps) {
  const isWhey = isWheyProteinModel(businessModelUri);
  const { exchanges: liveExchanges, isLoading } = useGraphDBValueExchanges(
    isWhey ? null : businessModelUri,
  );
  const exchanges = isWhey ? WHEY_VALUE_EXCHANGES : liveExchanges;

  const maxAmount = Math.max(...exchanges.map((e) => e.amount), 1);
  const totalAmount = exchanges.reduce((sum, e) => sum + e.amount, 0);
  const hasData = exchanges.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Card
        isBlurred
        className="h-full hover:shadow-lg transition-all duration-200 bg-white/60 dark:bg-default-100/50 border-none overflow-hidden"
        shadow="sm"
      >
        <div className="px-4 py-1.5 flex items-center justify-between opacity-80 bg-blue-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Economic
          </span>
          <SectionBadge type={hasData ? 'A' : 'pending'} />
        </div>
        <CardBody className="gap-2">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Value Exchanges
            </h3>
            {hasData && (
              <Chip size="sm" variant="flat" color="primary">
                {exchanges.length}
              </Chip>
            )}
          </div>
          {hasData && (
            <p className="text-xs text-default-500">
              Total network value: <strong>{formatCurrency(totalAmount)}</strong>
            </p>
          )}

          {isLoading ? (
            <div className="flex items-center gap-2 py-4">
              <Spinner size="sm" />
              <span className="text-xs text-default-500">Loading…</span>
            </div>
          ) : hasData ? (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 mt-1">
              {exchanges.slice(0, 10).map((e, i) => (
                <DistributionBar
                  key={e.uri}
                  label={e.label}
                  value={e.amount}
                  maxValue={maxAmount}
                  color="#3B82F6"
                  index={i}
                  formatValue={formatCurrency}
                />
              ))}
              {exchanges.length > 10 && (
                <p className="text-xs text-default-400 text-center pt-1">
                  Top 10 of {exchanges.length} exchanges
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-default-400 py-2">
              No value exchanges reported for this case yet.
            </p>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
