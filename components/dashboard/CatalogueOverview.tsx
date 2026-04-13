'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { LayoutGrid, Recycle, Factory, MapPin } from 'lucide-react';
import { useGraphDBCatalogueStats } from '@/lib/hooks/useGraphDB';
import DistributionBar from './DistributionBar';
import RStrategyList from './RStrategyList';

const SECTOR_COLOURS = ['#EC4899', '#6366F1', '#14B8A6', '#F97316', '#84CC16'];
const REGION_COLOURS = ['#06B6D4', '#8B5CF6', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

interface HeaderConfig {
  icon: typeof LayoutGrid;
  label: string;
  colour: string;
}

function CardHeader({ icon: Icon, label, colour }: HeaderConfig) {
  return (
    <div
      className="px-4 py-1.5 flex items-center opacity-80"
      style={{ backgroundColor: colour }}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    </div>
  );
}

/** Aggregated catalogue view shown when no CEBM is selected. */
export default function CatalogueOverview() {
  const { stats, isLoading, isError } = useGraphDBCatalogueStats();

  if (isError) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <LayoutGrid className="w-5 h-5 text-cyan-500" />
        <h2 className="text-xl font-bold text-foreground">
          Circular Economy Catalogue
        </h2>
        <Chip size="sm" variant="flat" color="primary">
          Aggregated
        </Chip>
      </div>

      <p className="text-sm text-default-500 mb-4">
        Cross-cutting statistics across all pilot cases in the DECIDE data
        platform. Select a business model above to view detailed KPIs.
      </p>

      {isLoading || !stats ? (
        <div className="flex items-center gap-3 py-8 justify-center">
          <Spinner size="sm" />
          <span className="text-sm text-default-500">
            Loading catalogue statistics...
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total CEBMs */}
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
              <CardHeader
                icon={LayoutGrid}
                label="Total CEBMs"
                colour="#06B6D4"
              />
              <CardBody>
                <p className="text-sm text-default-500 mb-1">
                  Circular Economy Business Models
                </p>
                <span className="text-5xl font-bold text-cyan-500">
                  {stats.totalModels}
                </span>
              </CardBody>
            </Card>
          </motion.div>

          {/* Circular Strategies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card
              isBlurred
              className="h-full hover:shadow-lg transition-all duration-200 bg-white/60 dark:bg-default-100/50 border-none overflow-hidden"
              shadow="sm"
            >
              <CardHeader
                icon={Recycle}
                label="Circular Strategies"
                colour="#10B981"
              />
              <CardBody>
                <RStrategyList
                  strategies={stats.strategies}
                  totalModels={stats.totalModels}
                />
              </CardBody>
            </Card>
          </motion.div>

          {/* Sectors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <Card
              isBlurred
              className="h-full hover:shadow-lg transition-all duration-200 bg-white/60 dark:bg-default-100/50 border-none overflow-hidden"
              shadow="sm"
            >
              <CardHeader
                icon={Factory}
                label="Sectors"
                colour="#EC4899"
              />
              <CardBody>
                <div className="space-y-3">
                  {stats.sectors.length > 0 ? (
                    stats.sectors.map((s, i) => (
                      <DistributionBar
                        key={s.sector}
                        label={s.sector}
                        value={s.count}
                        maxValue={stats.totalModels}
                        color={SECTOR_COLOURS[i % SECTOR_COLOURS.length]}
                        index={i}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-default-400">
                      No sectors found
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Regions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -4 }}
          >
            <Card
              isBlurred
              className="h-full hover:shadow-lg transition-all duration-200 bg-white/60 dark:bg-default-100/50 border-none overflow-hidden"
              shadow="sm"
            >
              <CardHeader
                icon={MapPin}
                label="Regions"
                colour="#8B5CF6"
              />
              <CardBody>
                <div className="space-y-3">
                  {stats.regions.length > 0 ? (
                    stats.regions.map((r, i) => (
                      <DistributionBar
                        key={r.region}
                        label={r.region}
                        value={r.count}
                        maxValue={stats.totalModels}
                        color={REGION_COLOURS[i % REGION_COLOURS.length]}
                        index={i}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-default-400">
                      No regions found
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
