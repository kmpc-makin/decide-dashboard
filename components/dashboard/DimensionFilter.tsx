'use client';

import { Chip } from '@heroui/chip';
import { motion } from 'framer-motion';
import { Leaf, DollarSign, Users } from 'lucide-react';
import { KPICategory, CATEGORY_COLORS } from '@/types/kpi';

interface DimensionFilterProps {
  selected: KPICategory[];
  onToggle: (dimension: KPICategory) => void;
}

const DIMENSIONS = [
  { key: 'ecological' as const, label: 'Ecological', icon: Leaf },
  { key: 'economic' as const, label: 'Economic', icon: DollarSign },
  { key: 'social' as const, label: 'Social', icon: Users },
];

/**
 * Multi-select chip row for filtering KPIs by TBL dimension.
 * Colours come from the shared palette so the filter state stays
 * consistent with the dimension sections below.
 */
export default function DimensionFilter({
  selected,
  onToggle,
}: DimensionFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap justify-center gap-3 mb-8"
    >
      {DIMENSIONS.map(({ key, label, icon: Icon }) => {
        const isActive = selected.includes(key);
        const colour = CATEGORY_COLORS[key].primary;

        return (
          <motion.div
            key={key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Chip
              size="lg"
              variant={isActive ? 'solid' : 'bordered'}
              style={{
                backgroundColor: isActive ? colour : 'transparent',
                borderColor: colour,
                color: isActive ? 'white' : colour,
                cursor: 'pointer',
              }}
              className="px-4 py-2 font-medium transition-all duration-200 hover:shadow-md"
              onClick={() => onToggle(key)}
              startContent={
                <Icon
                  className="w-4 h-4"
                  style={{ color: isActive ? 'white' : colour }}
                />
              }
            >
              {label}
            </Chip>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
