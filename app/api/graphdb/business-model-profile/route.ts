import { NextRequest, NextResponse } from 'next/server';
import { fetchBusinessModelProfile } from '@/lib/sparql/queries';

export async function GET(request: NextRequest) {
  const uri = request.nextUrl.searchParams.get('businessModel');
  if (!uri) {
    return NextResponse.json(
      { success: false, error: 'Missing businessModel parameter' },
      { status: 400 },
    );
  }

  try {
    const profile = await fetchBusinessModelProfile(uri);
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching business model profile:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch profile',
      },
      { status: 500 },
    );
  }
}
