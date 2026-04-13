import { NextResponse } from 'next/server';
import { fetchCatalogueStats } from '@/lib/sparql/queries';

export async function GET() {
  try {
    const stats = await fetchCatalogueStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching catalogue stats from GraphDB:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch catalogue stats',
      },
      { status: 500 },
    );
  }
}
