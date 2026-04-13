'use client';

import { motion } from 'framer-motion';

interface DistributionBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  index?: number;
  showCount?: boolean;
  formatValue?: (value: number) => string;
}

export default function DistributionBar({
  label,
  value,
  maxValue,
  color,
  index = 0,
  showCount = true,
  formatValue,
}: DistributionBarProps) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const displayValue = formatValue ? formatValue(value) : value.toString();

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline text-sm">
        <span className="text-foreground font-medium truncate mr-2">
          {label}
        </span>
        {showCount && (
          <span className="text-default-500 flex-shrink-0 text-xs">
            {displayValue}
          </span>
        )}
      </div>
      <div className="w-full bg-default-200 rounded-full h-2.5">
        <motion.div
          className="h-2.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
        />
      </div>
    </div>
  );
}
