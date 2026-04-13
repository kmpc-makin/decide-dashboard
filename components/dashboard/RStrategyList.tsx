'use client';

import { motion } from 'framer-motion';
import { Tooltip } from '@heroui/tooltip';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { StrategyCount } from '@/lib/sparql/queries';

interface RStrategyListProps {
  strategies: StrategyCount[];
  totalModels: number;
}

/** R0-R9 framework, ordered from most to least circular. */
const R_STRATEGIES = [
  { id: 'R0', name: 'Refuse',        colour: '#065F46', description: 'Eliminate harmful materials or offer efficient alternatives.' },
  { id: 'R1', name: 'Rethink',       colour: '#047857', description: 'Share products and design for multi-functional use.' },
  { id: 'R2', name: 'Reduce',        colour: '#059669', description: 'Minimise natural resource consumption throughout the lifecycle.' },
  { id: 'R3', name: 'Reuse',         colour: '#10B981', description: 'Reuse products in good condition for their original function.' },
  { id: 'R4', name: 'Repair',        colour: '#34D399', description: 'Restore defective products to working condition.' },
  { id: 'R5', name: 'Refurbish',     colour: '#84CC16', description: 'Update and modernise older products.' },
  { id: 'R6', name: 'Remanufacture', colour: '#EAB308', description: 'Integrate intact components into new products.' },
  { id: 'R7', name: 'Repurpose',     colour: '#F59E0B', description: 'Use discarded components in different products.' },
  { id: 'R8', name: 'Recycle',       colour: '#F97316', description: 'Process waste materials into new materials.' },
  { id: 'R9', name: 'Recover',       colour: '#EF4444', description: 'Extract energy or heat from organic waste.' },
] as const;

function countFor(name: string, strategies: StrategyCount[]): number {
  const hit = strategies.find(
    (s) => s.strategy.toLowerCase() === name.toLowerCase(),
  );
  return hit?.count ?? 0;
}

/** Full R-strategy list with counts and CE/LE hierarchy axis. */
export default function RStrategyList({
  strategies,
  totalModels,
}: RStrategyListProps) {
  const maxCount = Math.max(totalModels, 1);

  return (
    <div className="flex gap-2">
      {/* Hierarchy axis: Circular Economy (top) → Linear Economy (bottom) */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1 pb-1 w-10">
        <Tooltip
          content="Closer to Circular Economy - keep products and materials in loops"
          placement="right"
          delay={300}
        >
          <div className="flex flex-col items-center text-emerald-700 dark:text-emerald-400 cursor-help">
            <ArrowUp className="w-3 h-3" strokeWidth={2.5} />
            <span className="text-[8px] font-bold uppercase tracking-tight leading-tight">
              CE
            </span>
          </div>
        </Tooltip>
        <div
          className="flex-1 w-1 rounded-full my-1 min-h-[140px]"
          style={{
            background:
              'linear-gradient(to bottom, #065F46 0%, #10B981 25%, #84CC16 45%, #EAB308 60%, #F97316 80%, #EF4444 100%)',
          }}
        />
        <Tooltip
          content="Closer to Linear Economy - take, make, dispose"
          placement="right"
          delay={300}
        >
          <div className="flex flex-col items-center text-red-600 dark:text-red-400 cursor-help">
            <span className="text-[8px] font-bold uppercase tracking-tight leading-tight">
              LE
            </span>
            <ArrowDown className="w-3 h-3" strokeWidth={2.5} />
          </div>
        </Tooltip>
      </div>

      {/* Strategy rows */}
      <div className="flex-1 space-y-1.5">
      {R_STRATEGIES.map((r, i) => {
        const count = countFor(r.name, strategies);
        const percentage = (count / maxCount) * 100;
        const isZero = count === 0;

        return (
          <Tooltip
            key={r.id}
            content={
              <div className="max-w-xs text-xs">
                <div className="font-semibold mb-0.5">
                  {r.id} · {r.name}
                </div>
                <div className="text-default-500">{r.description}</div>
              </div>
            }
            placement="left"
            delay={300}
          >
            <div className="group">
              <div className="flex items-center gap-2 text-xs">
                <span
                  className="inline-flex items-center justify-center w-7 h-5 rounded text-[10px] font-bold flex-shrink-0"
                  style={{
                    backgroundColor: isZero ? '#E5E7EB' : r.colour,
                    color: isZero ? '#9CA3AF' : 'white',
                  }}
                >
                  {r.id}
                </span>
                <span
                  className={`font-medium flex-1 truncate ${
                    isZero
                      ? 'text-default-400'
                      : 'text-foreground'
                  }`}
                >
                  {r.name}
                </span>
                <span
                  className={`text-[11px] font-semibold flex-shrink-0 ${
                    isZero ? 'text-default-300' : 'text-default-600'
                  }`}
                >
                  {count}
                </span>
              </div>
              <div className="ml-9 mt-0.5 h-1 bg-default-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-1 rounded-full"
                  style={{
                    backgroundColor: isZero ? '#E5E7EB' : r.colour,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(percentage, isZero ? 0 : 4)}%` }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.04 }}
                />
              </div>
            </div>
          </Tooltip>
        );
      })}
      </div>
    </div>
  );
}
