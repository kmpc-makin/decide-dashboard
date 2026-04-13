import { NextRequest, NextResponse } from 'next/server';
import { fetchActorEcosystem } from '@/lib/sparql/queries';

export async function GET(request: NextRequest) {
  const uri = request.nextUrl.searchParams.get('businessModel');
  if (!uri) {
    return NextResponse.json(
      { success: false, error: 'Missing businessModel parameter' },
      { status: 400 },
    );
  }

  try {
    const ecosystem = await fetchActorEcosystem(uri);
    return NextResponse.json({ success: true, data: ecosystem });
  } catch (error) {
    console.error('Error fetching actor ecosystem:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch actor ecosystem',
      },
      { status: 500 },
    );
  }
}
