import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end('Unauthorized');

  if (req.method === 'GET') {
    const lang = (req.query.lang as string) || 'uk';
    const blocks = await prisma.contentBlock.findMany({
      where: { language: lang },
      orderBy: { key: 'asc' },
    });
    return res.json(blocks);
  }

  if (req.method === 'PUT') {
    try {
      const { id, key, value, lang = 'uk' } = req.body;
      
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
      
      return res.json(updated);
    } catch (error) {
      console.error('Update error:', error);
      return res.status(500).json({ error: 'Error updating content' });
    }
  }

  return res.status(405).end();
}
