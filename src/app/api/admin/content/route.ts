import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'uk';

  const blocks = await prisma.contentBlock.findMany({
    where: { language: lang },
    orderBy: { key: 'asc' },
  });
  return NextResponse.json(blocks);
}

export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  try {
    const { id, key, value, lang = 'uk' } = await req.json();
    
    const updated = await prisma.contentBlock.upsert({
      where: id ? { id } : { key_language: { key, language: lang } },
      update: { value },
      create: { 
        key, 
        value, 
        language: lang,
        section: key.includes('dp_') || key.includes('imprint_') ? 'legal' : 'general'
      },
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update error:', error);
    return new NextResponse('Error updating content', { status: 500 });
  }
}
