import { CreateKPIInput } from '@/types/kpi';

export const seedKPIs: CreateKPIInput[] = [
  // Ecological KPIs (6)
  {
    identifier: 'recycling_rate',
    category: 'ecological',
    title: 'Recycling Rate',
    value: 78.5,
    unit: '%',
    target: 85,
    trend: 'up',
    chartType: 'progress',
    dataSource: 'Waste Management Reports',
    kpiSource: 'ESRS E5',
    metadata: {
      scope: 'company-wide',
      frequency: 'monthly'
    }
  },
  {
    identifier: 'co2_emissions',
    category: 'ecological',
    title: 'CO₂ Emissions',
    value: 12450,
    unit: 'tons',
    target: 10000,
    trend: 'down',
    chartType: 'bar',
    dataSource: 'Emissions Monitoring Systems',
    kpiSource: 'ESRS E1',
    metadata: {
      scope: 'all-scopes',
      frequency: 'monthly'
    }
  },
  {
    identifier: 'renewable_energy_share',
    category: 'ecological',
    title: 'Renewable Energy Share',
    value: 65.2,
    unit: '%',
    target: 75,
    trend: 'up',
    chartType: 'gauge',
    dataSource: 'Energy Management Systems',
    kpiSource: 'ESRS E1',
    metadata: {
      scope: 'operations',
      frequency: 'monthly'
    }
  },
  {
    identifier: 'water_consumption',
    category: 'ecological',
    title: 'Water Consumption',
    value: 8750,
    unit: 'm³',
    target: 8000,
    trend: 'down',
    chartType: 'area',
    dataSource: 'Utilities Monitoring',
    kpiSource: 'ESRS E3',
    metadata: {
      scope: 'facilities',
      frequency: 'monthly'
    }
  },
  {
    identifier: 'material_reuse',
    category: 'ecological',
    title: 'Material Reuse',
    value: 42.8,
    unit: '%',
    target: 50,
    trend: 'up',
    chartType: 'progress',
    dataSource: 'Supply Chain Reports',
    kpiSource: 'ESRS E5',
    metadata: {
      scope: 'production',
      frequency: 'quarterly'
    }
  },
  {
    identifier: 'total_waste_generated',
    category: 'ecological',
    title: 'Total Waste Generated',
    value: 245,
    unit: 'tons',
    target: 200,
    trend: 'down',
    chartType: 'bar',
    dataSource: 'Waste Management Reports',
    kpiSource: 'ESRS E5',
    metadata: {
      scope: 'operations',
      frequency: 'monthly'
    }
  },

  // Economic KPIs (6)
  {
    identifier: 'circular_revenue',
    category: 'economic',
    title: 'Circular Revenue',
    value: 34.7,
    unit: '%',
    target: 40,
    trend: 'up',
    chartType: 'donut',
    dataSource: 'Financial Reports',
    kpiSource: 'ESRS E5-6',
    metadata: {
      scope: 'business-models',
      frequency: 'quarterly'
    }
  },
  {
    identifier: 'eu_taxonomy_revenue',
    category: 'economic',
    title: 'EU Taxonomy-aligned Revenue',
    value: 28.3,
    unit: '%',
    target: 35,
    trend: 'up',
    chartType: 'donut',
    dataSource: 'Taxonomy Assessment',
    kpiSource: 'EU Taxonomy',
    metadata: {
      scope: 'revenue-streams',
      frequency: 'annual'
    }
  },
  {
    identifier: 'resource_productivity',
    category: 'economic',
    title: 'Resource Productivity',
    value: 15420,
    unit: '€/ton',
    target: 18000,
    trend: 'up',
    chartType: 'line',
    dataSource: 'Production Analytics',
    kpiSource: 'ESRS E5-6',
    metadata: {
      scope: 'material-efficiency',
      frequency: 'quarterly'
    }
  },
  {
    identifier: 'material_cost_savings',
    category: 'economic',
    title: 'Material Cost Savings',
    value: 2.8,
    unit: 'M€',
    target: 3.5,
    trend: 'up',
    chartType: 'bar',
    dataSource: 'Procurement Reports',
    kpiSource: 'ESRS E5-6',
    metadata: {
      scope: 'secondary-materials',
      frequency: 'annual'
    }
  },
  {
    identifier: 'process_throughput_time',
    category: 'economic',
    title: 'Process Throughput Time',
    value: 14.2,
    unit: 'days',
    target: 12,
    trend: 'down',
    chartType: 'trend',
    dataSource: 'Operations Management',
    kpiSource: 'Internal Performance',
    metadata: {
      scope: 'manufacturing',
      frequency: 'weekly'
    }
  },
  {
    identifier: 'green_tech_investment',
    category: 'economic',
    title: 'Investment in Green Tech',
    value: 8.5,
    unit: 'M€',
    target: 12,
    trend: 'up',
    chartType: 'bar',
    dataSource: 'Capital Expenditure Reports',
    kpiSource: 'ESRS E5',
    metadata: {
      scope: 'r-and-d',
      frequency: 'annual'
    }
  },

  // Social KPIs (6)
  {
    identifier: 'new_jobs_created',
    category: 'social',
    title: 'New Jobs Created',
    value: 156,
    unit: 'FTE',
    target: 200,
    trend: 'up',
    chartType: 'bar',
    dataSource: 'HR Information Systems',
    kpiSource: 'ESRS S1',
    metadata: {
      scope: 'circular-activities',
      frequency: 'annual'
    }
  },
  {
    identifier: 'employee_turnover_rate',
    category: 'social',
    title: 'Employee Turnover Rate',
    value: 8.4,
    unit: '%',
    target: 6,
    trend: 'down',
    chartType: 'gauge',
    dataSource: 'HR Analytics',
    kpiSource: 'ESRS S1',
    metadata: {
      scope: 'workforce',
      frequency: 'annual'
    }
  },
  {
    identifier: 'training_hours_per_employee',
    category: 'social',
    title: 'Training Hours per Employee',
    value: 32.5,
    unit: 'hours',
    target: 40,
    trend: 'up',
    chartType: 'bar',
    dataSource: 'Learning Management System',
    kpiSource: 'ESRS S1',
    metadata: {
      scope: 'skills-development',
      frequency: 'annual'
    }
  },
  {
    identifier: 'women_in_leadership',
    category: 'social',
    title: 'Women in Leadership',
    value: 38.7,
    unit: '%',
    target: 45,
    trend: 'up',
    chartType: 'donut',
    dataSource: 'HR Diversity Reports',
    kpiSource: 'ESRS S1',
    metadata: {
      scope: 'management-positions',
      frequency: 'quarterly'
    }
  },
  {
    identifier: 'workplace_accidents',
    category: 'social',
    title: 'Workplace Accidents',
    value: 2.1,
    unit: 'per 1,000 employees',
    target: 1.5,
    trend: 'down',
    chartType: 'trend',
    dataSource: 'Safety Management System',
    kpiSource: 'ESRS S1',
    metadata: {
      scope: 'health-safety',
      frequency: 'monthly'
    }
  },
  {
    identifier: 'living_wage_ratio',
    category: 'social',
    title: 'Living Wage Ratio',
    value: 92.3,
    unit: '%',
    target: 100,
    trend: 'up',
    chartType: 'progress',
    dataSource: 'Payroll Systems',
    kpiSource: 'ESRS S1',
    metadata: {
      scope: 'compensation',
      frequency: 'annual'
    }
  }
];

// Helper function to seed the database (for API route)
export async function seedDatabase() {
  try {
    // This will be implemented once we have the KPI model working
    console.log('Seeding database with', seedKPIs.length, 'KPIs');
    
    // For now, return mock success
    return {
      success: true,
      message: `Successfully seeded ${seedKPIs.length} KPIs`,
      data: seedKPIs
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    return {
      success: false,
      error: 'Failed to seed database'
    };
  }
}
