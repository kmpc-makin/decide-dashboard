'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Recycle } from 'lucide-react';
import SectionBadge from '../SectionBadge';
import { WHEY_CIRCULARITY, isWheyProteinModel } from '@/lib/mock/whey-kpis';

interface CircularityPenetrationCardProps {
  businessModelUri: string;
}

/** KPI 5 - Circularity Penetration Score. */
export default function CircularityPenetrationCard({
  businessModelUri,
}: CircularityPenetrationCardProps) {
  const isWhey = isWheyProteinModel(businessModelUri);

  if (!isWhey) {
    return (
      <Card
        isBlurred
        className="h-full bg-white/60 dark:bg-default-100/50 border-none overflow-hidden"
        shadow="sm"
      >
        <div className="px-4 py-1.5 flex items-center justify-between opacity-80 bg-emerald-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <Recycle className="w-3.5 h-3.5" />
            Ecological
          </span>
          <SectionBadge type="pending" />
        </div>
        <CardBody className="gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            Circularity Penetration Score
          </h3>
          <p className="text-xs text-default-400 py-4">
            Awaiting BPMN activity classification data from the platform.
          </p>
        </CardBody>
      </Card>
    );
  }

  const { percentage, circularActivities, totalActivities } = WHEY_CIRCULARITY;

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
        <div className="px-4 py-1.5 flex items-center justify-between opacity-80 bg-emerald-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <Recycle className="w-3.5 h-3.5" />
            Ecological
          </span>
          <SectionBadge type="A" />
        </div>
        <CardBody className="gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            Circularity Penetration Score
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-emerald-500">
              {percentage}%
            </span>
          </div>
          <p className="text-xs text-default-500">
            {circularActivities} of {totalActivities} process tasks classified
            as circular.
          </p>
          <div className="mt-1 w-full bg-default-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
