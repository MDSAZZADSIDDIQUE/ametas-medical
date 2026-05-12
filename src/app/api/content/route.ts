import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'uk';

  try {
    const [blocks, slides] = await Promise.all([
      prisma.contentBlock.findMany({
        where: { language: lang }
      }),
      prisma.heroSlide.findMany({
        where: { language: lang, isActive: true },
        orderBy: { order: 'asc' }
      })
    ]);

    // If no blocks found for this language, try falling back to 'uk'
    if (blocks.length === 0 && lang !== 'uk') {
      const fallbackBlocks = await prisma.contentBlock.findMany({
        where: { language: 'uk' }
      });
      return NextResponse.json({ blocks: fallbackBlocks, slides });
    }

    return NextResponse.json({ blocks, slides });
  } catch (error) {
    console.error('Content API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
