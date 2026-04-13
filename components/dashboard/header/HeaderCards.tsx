'use client';

import BusinessModelProfileCard from './BusinessModelProfileCard';
import ActorEcosystemCard from './ActorEcosystemCard';
import ActorConsistencyBadge from './ActorConsistencyBadge';
import { isMockModel } from '@/lib/mock/whey-kpis';

interface HeaderCardsProps {
  businessModelUri: string;
}

/**
 * Cross-dimensional header row shown whenever a CEBM is selected.
 * For the synthetic demo CEBM the profile and ecosystem cards use
 * mock data; for real models they fetch from the data platform.
 */
export default function HeaderCards({ businessModelUri }: HeaderCardsProps) {
  const isMock = isMockModel(businessModelUri);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <BusinessModelProfileCard
        businessModelUri={businessModelUri}
        isMock={isMock}
      />
      <ActorEcosystemCard
        businessModelUri={businessModelUri}
        isMock={isMock}
      />
      <ActorConsistencyBadge businessModelUri={businessModelUri} />
    </div>
  );
}
