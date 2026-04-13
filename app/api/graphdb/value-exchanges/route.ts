import { NextRequest, NextResponse } from 'next/server';
import { fetchValueExchanges } from '@/lib/sparql/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessModelUri = searchParams.get('businessModel');

    if (!businessModelUri) {
      return NextResponse.json(
        { success: false, error: 'businessModel parameter is required' },
        { status: 400 },
      );
    }

    const exchanges = await fetchValueExchanges(businessModelUri);
    return NextResponse.json({ success: true, data: exchanges });
  } catch (error) {
    console.error('Error fetching value exchanges from GraphDB:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch value exchanges',
      },
      { status: 500 },
    );
  }
}
