'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Tooltip } from '@heroui/tooltip';
import { ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

interface ActorConsistencyBadgeProps {
  businessModelUri: string;
  isWhey?: boolean;
}

/** KPI 7 - Actor Consistency Check across BMC, BPMN and e3Value. */
export default function ActorConsistencyBadge({
  businessModelUri,
  isWhey = false,
}: ActorConsistencyBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card
        isBlurred
        className="h-full bg-white/60 dark:bg-default-100/50 border-none"
        shadow="sm"
      >
        <div className="px-4 py-1.5 flex items-center opacity-80 bg-emerald-600">
          <span className="text-xs font-semibold uppercase tracking-wide text-white flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Consistency Check
          </span>
        </div>

        <CardBody className="gap-3 justify-center items-center text-center">
          {isWhey ? (
            <Tooltip
              content="Actors are consistent across BMC, BPMN and e3Value models."
              placement="bottom"
            >
              <div className="flex flex-col items-center gap-2 py-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                <Chip
                  size="sm"
                  variant="flat"
                  color="success"
                >
                  Consistent
                </Chip>
                <p className="text-xs text-default-500 max-w-[180px]">
                  All actors aligned across BMC, BPMN and e3Value.
                </p>
              </div>
            </Tooltip>
          ) : (
            <Tooltip
              content="Cross-model consistency score across BMC, BPMN and e3Value. Awaiting federated SPARQL endpoint from the data platform."
              placement="bottom"
            >
              <div className="flex flex-col items-center gap-2 py-2">
                <Chip
                  size="sm"
                  variant="flat"
                  color="warning"
                  startContent={<Clock className="w-3 h-3 ml-1" />}
                >
                  Pending
                </Chip>
                <p className="text-xs text-default-500 max-w-[180px]">
                  Awaiting federated query across BMC, BPMN and e3Value.
                </p>
              </div>
            </Tooltip>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
