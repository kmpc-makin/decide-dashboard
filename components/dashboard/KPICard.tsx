'use client';

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";
import { KPI, CATEGORY_COLORS } from "@/types/kpi";
import { Info, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  kpi: KPI;
  isLoading?: boolean;
}

export default function KPICard({ kpi, isLoading = false }: KPICardProps) {
  const categoryColor = CATEGORY_COLORS[kpi.category];
  
  // Format the value for display
  const formatValue = (value: number, unit: string) => {
    if (unit === '%') {
      return `${value.toFixed(1)}%`;
    }
    if (unit === 'M€' || unit === '€/ton') {
      return value.toLocaleString('en-US', { 
        minimumFractionDigits: unit === 'M€' ? 1 : 0,
        maximumFractionDigits: unit === 'M€' ? 1 : 0 
      });
    }
    if (unit === 'tons' || unit === 'm³' || unit === 'FTE') {
      return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
    return value.toLocaleString('en-US', { maximumFractionDigits: 1 });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      default:
        return 'default';
    }
  };

  const calculateProgress = () => {
    if (kpi.target <= 0) return 0;
    return Math.min((kpi.value / kpi.target) * 100, 100);
  };

  const tooltipContent = (
    <div className="p-2 max-w-xs">
      <div className="font-semibold text-sm mb-2">KPI Information</div>
      <div className="space-y-1 text-xs">
        <div>
          <span className="font-medium">Data Source:</span>
          <br />
          <span className="text-default-600">{kpi.dataSource}</span>
        </div>
        <div>
          <span className="font-medium">Standard:</span>
          <br />
          <span className="text-default-600">{kpi.kpiSource}</span>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="w-full space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card 
        isBlurred
        className="h-full hover:shadow-lg transition-all duration-200 bg-white/60 dark:bg-default-100/50 border-none overflow-hidden"
        shadow="sm"
      >
        {/* Colored Top Bar */}
        <div 
          className="px-4 py-1.5 flex items-center opacity-80"
          style={{ backgroundColor: categoryColor.barBg }}
        >
          <span 
            className="text-xs font-semibold uppercase tracking-wide text-white"
          >
            {kpi.category}
          </span>
        </div>

        <CardHeader className="pb-2 pt-3">
          <div className="flex justify-between items-start w-full">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground leading-tight line-clamp-2 min-h-[3.5rem]">
                {kpi.title}
              </h3>
            </div>
            
            <Tooltip content={tooltipContent} placement="left" showArrow>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-default-500 hover:text-default-700"
              >
                <Info className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </CardHeader>

        <CardBody className="pt-0">
          <div className="space-y-3">
            {/* Main Value */}
            <div className="flex items-baseline space-x-2">
              <span 
                className="text-3xl font-bold"
                style={{ color: categoryColor.primary }}
              >
                {formatValue(kpi.value, kpi.unit)}
              </span>
              <span className="text-sm text-default-500">{kpi.unit}</span>
            </div>

            {/* Target and Trend */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-default-600">
                Target: <span className="font-medium">{formatValue(kpi.target, kpi.unit)}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                {getTrendIcon(kpi.trend)}
                <Chip
                  size="sm"
                  variant="flat"
                  color={getTrendColor(kpi.trend) as any}
                  className="capitalize"
                >
                  {kpi.trend}
                </Chip>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-default-500 mb-1">
                <span>Progress</span>
                <span>{calculateProgress().toFixed(0)}%</span>
              </div>
              <div className="w-full bg-default-200 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: categoryColor.primary }}
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
