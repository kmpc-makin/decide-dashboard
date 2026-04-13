import { NextRequest, NextResponse } from 'next/server';
import { fetchExtensionKPIs } from '@/lib/sparql/queries';

export async function GET(request: NextRequest) {
  const uri = request.nextUrl.searchParams.get('businessModel');
  if (!uri) {
    return NextResponse.json(
      { success: false, error: 'Missing businessModel parameter' },
      { status: 400 },
    );
  }

  try {
    const kpis = await fetchExtensionKPIs(uri);
    return NextResponse.json({ success: true, data: kpis });
  } catch (error) {
    console.error('Error fetching extension KPIs:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch extension KPIs',
      },
      { status: 500 },
    );
  }
}
