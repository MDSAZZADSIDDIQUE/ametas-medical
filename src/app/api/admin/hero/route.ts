import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(slides);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();
  const { image, title, subtitle, order } = body;

  const slide = await prisma.heroSlide.create({
    data: { image, title, subtitle, order: order || 0 },
  });

  return NextResponse.json(slide);
}

export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const body = await req.json();
  const { id, image, title, subtitle, order, isActive } = body;

  const slide = await prisma.heroSlide.update({
    where: { id },
    data: { image, title, subtitle, order, isActive },
  });

  return NextResponse.json(slide);
}

export async function DELETE(req: Request) {
  const session = await getServerSession();
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return new NextResponse('ID required', { status: 400 });

  await prisma.heroSlide.delete({
    where: { id },
  });

  return new NextResponse(null, { status: 204 });
}
