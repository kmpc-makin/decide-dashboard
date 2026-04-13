import { Chip } from '@heroui/chip';
import { Sector, SECTOR_COLORS, SECTOR_LABELS } from '@/types/businessModel';

interface SectorChipProps {
  sector: Sector;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'dot';
  className?: string;
}

export default function SectorChip({ 
  sector, 
  size = 'sm', 
  variant = 'flat',
  className = ''
}: SectorChipProps) {
  const colors = SECTOR_COLORS[sector];
  
  return (
    <Chip
      size={size}
      variant={variant}
      className={className}
      style={{
        backgroundColor: variant === 'flat' || variant === 'solid' ? colors.light : 'transparent',
        color: colors.dark,
        borderColor: variant === 'bordered' ? colors.primary : 'transparent',
      }}
    >
      {SECTOR_LABELS[sector]}
    </Chip>
  );
}
