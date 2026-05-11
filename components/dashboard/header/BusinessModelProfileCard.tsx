'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { IdCard, MapPin, Layers, Shield, Recycle } from 'lucide-react';
import { useGraphDBProfile } from '@/lib/hooks/useGraphDB';
import { WHEY_PROFILE } from '@/lib/mock/whey-kpis';

interface BusinessModelProfileCardProps {
  businessModelUri: string;
  isWhey?: boolean;
}

/** KPI 1 - Business Model Profile Card. */
export default function BusinessModelProfileCard({
  businessModelUri,
  isWhey = false,
}: BusinessModelProfileCardProps) {
  const { profile: liveProfile, isLoading } = useGraphDBProfile(
    isWhey ? null : businessModelUri,
  );
  const profile = isWhey ? WHEY_PROFILE : liveProfile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        isBlurred
        className="h-full bg-white/60 dark:bg-default-100/50 border-none"
        shadow="sm"
      >
        <div className="px-4 py-1.5 flex items-center opacity-80 bg-cyan-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <IdCard className="w-3.5 h-3.5" />
            Business Model Profile
          </span>
        </div>

        <CardBody className="gap-3">
          {isLoading || !profile ? (
            <div className="flex items-center gap-2 py-4">
              <Spinner size="sm" />
              <span className="text-xs text-default-500">Loading profile…</span>
            </div>
          ) : (
            <>
              <h3 className="text-base font-semibold text-foreground truncate">
                {profile.label}
              </h3>

              <div className="flex flex-wrap gap-2">
                {profile.cebmType && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="primary"
                    startContent={<Layers className="w-3 h-3 ml-1" />}
                  >
                    {profile.cebmType}
                  </Chip>
                )}
                {profile.sector && (
                  <Chip size="sm" variant="flat" color="secondary">
                    {profile.sector}
                  </Chip>
                )}
                {profile.region && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="default"
                    startContent={<MapPin className="w-3 h-3 ml-1" />}
                  >
                    {profile.region}
                  </Chip>
                )}
                {profile.maturityLevel && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="default"
                    startContent={<Shield className="w-3 h-3 ml-1" />}
                  >
                    {profile.maturityLevel}
                  </Chip>
                )}
              </div>

              {profile.strategies.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-default-500 mb-1.5">
                    <Recycle className="w-3 h-3" />
                    <span>R-Strategies</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.strategies.map((s) => (
                      <Chip
                        key={s}
                        size="sm"
                        variant="flat"
                        color="success"
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {profile.valuePropositions.length > 0 && (
                <div>
                  <div className="text-xs text-default-500 mb-1">
                    Value Propositions
                  </div>
                  <p className="text-xs text-default-700 dark:text-default-300 line-clamp-2">
                    {profile.valuePropositions.join(' · ')}
                  </p>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
