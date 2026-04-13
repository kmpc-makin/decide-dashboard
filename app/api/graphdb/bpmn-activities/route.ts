import { NextResponse } from 'next/server';
import { fetchBPMNActivities } from '@/lib/sparql/queries';

export async function GET() {
  try {
    const activities = await fetchBPMNActivities();
    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    console.error('Error fetching BPMN activities from GraphDB:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch BPMN activities',
      },
      { status: 500 },
    );
  }
}
