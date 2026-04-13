import { NextResponse } from 'next/server';
import { fetchBusinessModels } from '@/lib/sparql/queries';

export async function GET() {
  try {
    const models = await fetchBusinessModels();
    return NextResponse.json({ success: true, data: models });
  } catch (error) {
    console.error('Error fetching business models from GraphDB:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch business models',
      },
      { status: 500 },
    );
  }
}
