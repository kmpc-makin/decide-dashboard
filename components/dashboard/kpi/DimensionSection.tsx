'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Leaf, DollarSign, Users, LucideIcon } from 'lucide-react';
import { KPICategory } from '@/types/kpi';

interface DimensionSectionProps {
  dimension: KPICategory;
  children: ReactNode;
}

const CONFIG: Record<
  KPICategory,
  { label: string; icon: LucideIcon; colour: string }
> = {
  ecological: { label: 'Ecological', icon: Leaf, colour: '#10B981' },
  economic: { label: 'Economic', icon: DollarSign, colour: '#3B82F6' },
  social: { label: 'Social', icon: Users, colour: '#8B5CF6' },
};

/**
 * Titled container for all KPI cards belonging to a single TBL
 * dimension. Provides consistent heading and spacing so the main
 * dashboard only needs to place the cards.
 */
export default function DimensionSection({
  dimension,
  children,
}: DimensionSectionProps) {
  const { label, icon: Icon, colour } = CONFIG[dimension];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-10"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5" style={{ color: colour }} />
        <h2 className="text-xl font-bold text-foreground">{label}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
    </motion.section>
  );
}
