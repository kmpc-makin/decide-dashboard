'use client';

import BusinessModelProfileCard from './BusinessModelProfileCard';
import ActorEcosystemCard from './ActorEcosystemCard';
import ActorConsistencyBadge from './ActorConsistencyBadge';
import { isWheyProteinModel } from '@/lib/mock/whey-kpis';

interface HeaderCardsProps {
  businessModelUri: string;
}

/** Cross-dimensional header row shown when a CEBM is selected. */
export default function HeaderCards({ businessModelUri }: HeaderCardsProps) {
  const isWhey = isWheyProteinModel(businessModelUri);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <BusinessModelProfileCard
        businessModelUri={businessModelUri}
        isWhey={isWhey}
      />
      <ActorEcosystemCard
        businessModelUri={businessModelUri}
        isWhey={isWhey}
      />
      <ActorConsistencyBadge
        businessModelUri={businessModelUri}
        isWhey={isWhey}
      />
    </div>
  );
}
