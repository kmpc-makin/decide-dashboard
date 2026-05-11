'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import {
  Network,
  Handshake,
  User,
  Factory,
  Users,
  Circle,
  LucideIcon,
} from 'lucide-react';
import { useGraphDBActorEcosystem } from '@/lib/hooks/useGraphDB';
import type { Actor } from '@/lib/sparql/queries';
import { WHEY_ECOSYSTEM } from '@/lib/mock/whey-kpis';

interface ActorEcosystemCardProps {
  businessModelUri: string;
  isWhey?: boolean;
}

const ROLE_META: Record<
  Actor['role'],
  { label: string; icon: LucideIcon; colour: string; tint: string }
> = {
  partner:   { label: 'Partners',  icon: Handshake, colour: '#3B82F6', tint: 'rgba(59,130,246,0.08)' },
  customer:  { label: 'Customers', icon: User,      colour: '#10B981', tint: 'rgba(16,185,129,0.08)' },
  supplier:  { label: 'Suppliers', icon: Factory,   colour: '#F59E0B', tint: 'rgba(245,158,11,0.08)' },
  workforce: { label: 'Workforce', icon: Users,     colour: '#8B5CF6', tint: 'rgba(139,92,246,0.08)' },
  other:     { label: 'Other',     icon: Circle,    colour: '#6B7280', tint: 'rgba(107,114,128,0.08)' },
};

const ROLE_ORDER: Actor['role'][] = [
  'partner',
  'supplier',
  'customer',
  'workforce',
  'other',
];

/** KPI 2 - Actor Ecosystem Map. Actors grouped by role. */
export default function ActorEcosystemCard({
  businessModelUri,
  isWhey = false,
}: ActorEcosystemCardProps) {
  const { ecosystem: liveEcosystem, isLoading } = useGraphDBActorEcosystem(
    isWhey ? null : businessModelUri,
  );
  const ecosystem = isWhey ? WHEY_ECOSYSTEM : liveEcosystem;

  const grouped = (ecosystem?.actors ?? []).reduce<
    Record<Actor['role'], Actor[]>
  >(
    (acc, a) => {
      (acc[a.role] ||= []).push(a);
      return acc;
    },
    {} as Record<Actor['role'], Actor[]>,
  );

  const visibleRoles = ROLE_ORDER.filter((r) => (grouped[r]?.length ?? 0) > 0);
  const hasData = visibleRoles.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card
        isBlurred
        className="h-full bg-white/60 dark:bg-default-100/50 border-none"
        shadow="sm"
      >
        <div className="px-4 py-1.5 flex items-center justify-between opacity-80 bg-indigo-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" />
            Actor Ecosystem
          </span>
          {ecosystem && (
            <span className="text-xs text-white/80">
              {ecosystem.totalCount} actors
            </span>
          )}
        </div>

        <CardBody className="gap-3">
          {isLoading || !ecosystem ? (
            <div className="flex items-center gap-2 py-6 justify-center">
              <Spinner size="sm" />
              <span className="text-xs text-default-500">
                Loading ecosystem…
              </span>
            </div>
          ) : !hasData ? (
            <p className="text-xs text-default-400 py-4 text-center">
              No actors found for this business model.
            </p>
          ) : (
            <div className="space-y-2.5">
              {visibleRoles.map((role, roleIndex) => {
                const meta = ROLE_META[role];
                const Icon = meta.icon;
                const actors = grouped[role];

                return (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: roleIndex * 0.08 }}
                    className="flex gap-2.5 rounded-lg p-2 pl-2.5"
                    style={{ backgroundColor: meta.tint }}
                  >
                    <div
                      className="w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: meta.colour }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{ color: meta.colour }}
                        />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: meta.colour }}
                        >
                          {meta.label}
                        </span>
                        <span className="text-[10px] text-default-500">
                          · {actors.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {actors.map((a, i) => (
                          <motion.div
                            key={a.uri}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.25,
                              delay: roleIndex * 0.08 + 0.15 + i * 0.03,
                            }}
                          >
                            <Chip
                              size="sm"
                              variant="flat"
                              className="h-6 text-[11px]"
                              style={{
                                backgroundColor: 'white',
                                color: meta.colour,
                                border: `1px solid ${meta.colour}33`,
                              }}
                            >
                              {a.name}
                            </Chip>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
