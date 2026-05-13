import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (req.method === 'GET') {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: 'asc' },
    });
    return res.json(slides);
  }

  if (!session) return res.status(401).end('Unauthorized');

  if (req.method === 'POST') {
    const { image, title, subtitle, order } = req.body;
    const slide = await prisma.heroSlide.create({
      data: { image, title, subtitle, order: order || 0 },
    });
    return res.json(slide);
  }

  if (req.method === 'PUT') {
    const { id, image, title, subtitle, order, isActive } = req.body;
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: { image, title, subtitle, order, isActive },
    });
    return res.json(slide);
  }

  if (req.method === 'DELETE') {
    const id = req.query.id as string;
    if (!id) return res.status(400).end('ID required');
    await prisma.heroSlide.delete({
      where: { id },
    });
    return res.status(204).end();
  }

  return res.status(405).end();
}
