import { NextRequest, NextResponse } from 'next/server';
import {
  fetchPerformanceIndicators,
  fetchAllPerformanceIndicators,
} from '@/lib/sparql/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessModelUri = searchParams.get('businessModel');

    const indicators = businessModelUri
      ? await fetchPerformanceIndicators(businessModelUri)
      : await fetchAllPerformanceIndicators();

    return NextResponse.json({ success: true, data: indicators });
  } catch (error) {
    console.error('Error fetching KPIs from GraphDB:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch performance indicators',
      },
      { status: 500 },
    );
  }
}
