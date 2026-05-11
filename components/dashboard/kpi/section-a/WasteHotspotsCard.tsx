'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import SectionBadge from '../SectionBadge';
import {
  WHEY_WASTE_HOTSPOTS,
  isWheyProteinModel,
} from '@/lib/mock/whey-kpis';

interface WasteHotspotsCardProps {
  businessModelUri: string;
}

/** KPI 6 - Waste Hotspots. */
export default function WasteHotspotsCard({
  businessModelUri,
}: WasteHotspotsCardProps) {
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
            <AlertTriangle className="w-3.5 h-3.5" />
            Ecological
          </span>
          <SectionBadge type="pending" />
        </div>
        <CardBody className="gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            Waste Hotspots
          </h3>
          <p className="text-xs text-default-400 py-4">
            Awaiting BPMN endpoint classification from the platform.
          </p>
        </CardBody>
      </Card>
    );
  }

  const hotspots = WHEY_WASTE_HOTSPOTS;

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
        <div className="px-4 py-1.5 flex items-center justify-between opacity-80 bg-emerald-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Ecological
          </span>
          <SectionBadge type="A" />
        </div>
        <CardBody className="gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            Waste Hotspots
          </h3>
          <p className="text-xs text-default-500">
            Linear endpoints detected in the BPMN process model.
          </p>
          <div className="space-y-2 mt-1">
            {hotspots.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-2 text-xs"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">
                    {h.label}
                  </div>
                  <div className="flex items-center gap-1 text-default-500">
                    <ArrowRight className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{h.suggestion}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
