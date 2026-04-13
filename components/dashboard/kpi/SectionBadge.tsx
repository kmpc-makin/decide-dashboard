'use client';

import { Tooltip } from '@heroui/tooltip';
import { Database, ClipboardList, Clock } from 'lucide-react';

type SectionType = 'A' | 'B' | 'pending';

interface SectionBadgeProps {
  type: SectionType;
}

const CONFIG = {
  A: {
    label: 'Toolbox',
    background: '#FFFFFF',
    colour: '#1E3A8A',
    icon: Database,
    tooltip:
      'Derived automatically from the DECIDE toolbox models (BMC, e3Value, BPMN) via the data platform.',
  },
  B: {
    label: 'Reported',
    background: '#FFFFFF',
    colour: '#6D28D9',
    icon: ClipboardList,
    tooltip:
      'Pilot-reported value, stored in the generic KPI extension graph.',
  },
  pending: {
    label: 'Pending',
    background: '#FFFFFF',
    colour: '#9A3412',
    icon: Clock,
    tooltip:
      'Value not yet available. Awaiting data from the pilot case or the data platform.',
  },
};

/**
 * Small source-type indicator used on every KPI card to make the
 * provenance of a value explicit. Uses a white background so that it
 * reads cleanly on top of the coloured card headers.
 */
export default function SectionBadge({ type }: SectionBadgeProps) {
  const { label, background, colour, icon: Icon, tooltip } = CONFIG[type];
  return (
    <Tooltip content={tooltip} placement="top" delay={300}>
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide shadow-sm"
        style={{ backgroundColor: background, color: colour }}
      >
        <Icon className="w-3 h-3" />
        {label}
      </span>
    </Tooltip>
  );
}
